const { Router } = require('express');
const ProductController = require('../controllers/ProductController');

const routes = Router();

routes.put('/product/', ProductController.update);

module.exports = routes;
