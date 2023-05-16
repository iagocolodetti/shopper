const db = require('../database');
const { Op } = require('sequelize');
const JsonError = require('../errors/JsonError');
const Product = require('../models/Product');
const Pack = require('../models/Pack');
const { fixTwoDecimals } = require('../utils');

module.exports = {
    async update(request, response) {
        const { products } = request.body;
        const _response = [];
        const errors = [];
        let transaction;
        try {
            for (let i = 0; i < products.length; i++) {
                const { product_code, new_price } = products[i];
                if (product_code == undefined || new_price == undefined) {
                    const error = {
                        error: 'Você precisa enviar o arquivo com os cabeçalhos \'product_code\' e \'new_price\''
                    }
                    errors.push(error);
                    break;
                } else if (isNaN(new_price) || new_price <= 0) {
                    const error = {
                        product_code,
                        product_name: '-',
                        error: `'${new_price}' não é um valor válido`
                    }
                    errors.push(error);
                }
            }
            if (errors.length > 0) {
                response.status(500);
                response.json(JsonError(request, response, errors));
                return;
            }
            transaction = await db.getTransaction();
            for (let i = 0; i < products.length; i++) {
                products[i].new_price = Number(products[i].new_price);
                const { product_code, new_price } = products[i];
                const product = await Product.findOne({ where: { code: product_code } });
                if (product) {
                    product.cost_price = Number(product.cost_price);
                    product.sales_price = Number(product.sales_price);
                    const { name, cost_price, sales_price: old_price } = product;
                    const pack = await Pack.findOne({ where: { [Op.or]: [{ pack_id: product_code }, { product_id: product_code }] }});
                    if (pack) { // Caso o item esteja incluso em pacote
                        const _errors = [];
                        const { pack_id, product_id } = pack;
                        if (new_price != old_price) {
                            const difference = fixTwoDecimals(Math.abs(new_price - old_price));
                            const max_difference_value = fixTwoDecimals((old_price * 0.1));
                            if (new_price < cost_price) {
                                const error = {
                                    product_code: product_code,
                                    product_name: name,
                                    error: `O valor de venda (${new_price}) não pode ser menor que o valor de custo (${cost_price})`
                                }
                                _errors.push(error);
                            } else if (product_id == product_code && (difference > max_difference_value+0.03 || difference < max_difference_value-0.03)) {
                                const error = {
                                    product_code: product_code,
                                    product_name: name,
                                    error: 'O reajuste não pode ser menor e nem maior que 10% do valor atual'
                                }
                                _errors.push(error);
                            }
                        }
                        const _packs = await Pack.findAll({ where: { pack_id } });
                        const pack_products = [];
                        for (let j = 0; j < _packs.length; j++) {
                            const { product_id } = _packs[j];
                            const _product = products.find(p => p.product_code == product_id);
                            if (_product != undefined) {
                                pack_products.push(_product);
                            } else {
                                const error = {
                                    product_code: product_code,
                                    product_name: name,
                                    error: `${product_code == pack_id ? 'Esse item é um pacote' : 'Esse item faz parte de um pacote'}, você deve incluir todos os itens do pacote e o pacote para atualizar`
                                }
                                _errors.push(error);
                                break;
                            }
                        }
                        let pack_total_value = 0;
                        for (let j = 0; j < pack_products.length; j++) {
                            const { qty } = _packs.find(p => p.product_id == pack_products[j].product_code);
                            pack_total_value += pack_products[j].new_price * qty;
                        }
                        pack_total_value = fixTwoDecimals(pack_total_value);
                        const _pack = products.find(p => p.product_code == pack_id);
                        if (_pack == undefined) {
                            const error = {
                                product_code: product_code,
                                product_name: name,
                                error: 'Esse item faz parte de um pacote, você deve incluir todos os itens do pacote e o pacote para atualizar'
                            }
                            _errors.push(error);
                        } else {
                            const { new_price: new_price_pack } = _pack;
                            if (pack_total_value != new_price_pack) {
                                const error = {
                                    product_code: product_code,
                                    product_name: name,
                                    error: 'Os valores dos produtos não correspondem ao novo valor total do pacote'
                                }
                                _errors.push(error);
                            }
                        }
                        if (_errors.length == 0) {
                            await product.update({ sales_price: new_price }, { transaction });
                            _response.push({ code: product_code, name, old_price, new_price });
                        } else {
                            for (let j = 0; j < _errors.length; j++) {
                                errors.push(_errors[j]);
                            }
                        }
                    } else { // Caso o item não esteja incluso em pacote
                        let error = null;
                        if (new_price != old_price) {
                            const difference = fixTwoDecimals(Math.abs(new_price - old_price));
                            const max_difference_value = fixTwoDecimals((old_price * 0.1));
                            if (new_price < cost_price) {
                                error = {
                                    product_code: product_code,
                                    product_name: name,
                                    error: `O valor de venda (${new_price}) não pode ser menor que o valor de custo (${cost_price})`
                                }
                            } else if (difference > max_difference_value+0.03 || difference < max_difference_value-0.03) {
                                error = {
                                    product_code: product_code,
                                    product_name: name,
                                    error: 'O reajuste não pode ser menor e nem maior que 10% do valor atual'
                                }
                            }
                        }
                        if (error == null) {
                            await product.update({ sales_price: new_price }, { transaction });
                            _response.push({ code: product_code, name, old_price, new_price });
                        } else {
                            errors.push(error);
                        }
                    }
                } else {
                    const error = {
                        product_code: product_code,
                        product_name: '-',
                        error: 'Produto não encontrado'
                    };
                    errors.push(error);
                }
            }
            if (errors.length == 0) {
                transaction.commit();
                response.status(200);
                response.json(_response);
            } else {
                if (transaction) {
                    transaction.rollback();
                }
                response.status(500);
                response.json(JsonError(request, response, errors));
            }
        } catch (error) {
            if (transaction) {
                transaction.rollback();
            }
            response.status(500);
            errors.push({ error: 'Não foi possível atualizar o(s) produto(s)' });
            response.json(JsonError(request, response, errors));
        }
    }
};
