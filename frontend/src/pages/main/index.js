import './styles.css';
import React, { useState } from 'react';
import Papa from 'papaparse';

import validateCSV from '../../services/validateCSV';

import DivAlert from '../../components/DivAlert';

function Main() {
    const [products, setProducts] = useState();
    const [data, setData] = useState([]);
    const [error, setError] = useState([]);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [mensagem, setMensagem] = useState(null);

    function divAlert(message, alert) {
        return (<DivAlert message={message} alert={alert} />);
    }

    function loadCSVFile(e) {
        const file = e.target.files[0];
        if (file) {
            Papa.parse(file, {   
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    setProducts(result.data);
                }
            });
        }
    }

    async function validate() {
        setMensagem(null);
        setData([]);
        setError([]);
        setSubmitDisabled(true);
        try {
            if (products.length > 0) {
                if (products[0].product_code === undefined || products[0].new_price === undefined) {
                    setMensagem(divAlert('Erro: Você precisa enviar o arquivo com os cabeçalhos \'product_code\' e \'new_price\'.', 'alert-danger'));
                } else {
                    const response = await validateCSV.validate(products);
                    if (response.data.length > 0) {
                        setMensagem(divAlert('Atualização concluída.', 'alert-success'));
                        setData(response.data);
                    }
                }
            } else {
                setMensagem(divAlert('Erro: Não há produtos no arquivo.', 'alert-danger'));
            }
        } catch (error) {
            if (error.response) {
                const { errors } = error.response.data;
                if (errors.length === 1 && errors[0].product_code === undefined) {
                    setMensagem(divAlert(`Erro: ${errors[0].error}.`, 'alert-danger'));
                } else {
                    setMensagem(divAlert('Erro: Não foi possível atualizar o(s) produto(s).', 'alert-danger'));
                    setError(errors);
                }
            } else {
                setMensagem(divAlert('Erro: Não foi possível atualizar o(s) produto(s).', 'alert-danger'));
            }
        } finally {
            setSubmitDisabled(false);
        }
    }

    function DataTable() {
        if (data.length > 0) {
            return (
                <div className="table-responsive">
                    <table id="tableData" className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Old Price</th>
                                <th>New Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.code}</td>
                                    <td>{d.name}</td>
                                    <td>{d.old_price}</td>
                                    <td>{d.new_price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else return null;
    }

    function ErrorTable() {
        if (error.length > 0) {
            return (
                <div className="table-responsive">
                    <table id="tableData" className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Error</th>
                            </tr>
                        </thead>
                        <tbody>
                            {error.map((e, i) => (
                                <tr key={i}>
                                    <td>{e.product_code}</td>
                                    <td>{e.product_name}</td>
                                    <td>{e.error}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else return null;
    }

    return (
        <>
            <div className="d-flex justify-content-center text-center">
                <div className="form-group col-xs-12 col-sm-10 col-md-8 col-lg-5">
                    <h4 className="mb-3 text-muted">Shopper</h4>
                    <div className="card mb-4 justify-content-center">
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="openCSV" className="form-label">Open CSV</label>
                                <input type="file" accept=".csv" className="form-control" id="openCSV" onChange={loadCSVFile} />
                            </div>
                            <button className="btn btn-primary btn-fix" value="Validate" onClick={validate} disabled={submitDisabled}>Validate</button>
                        </div>
                        {mensagem}
                        <DataTable />
                        <ErrorTable />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;
