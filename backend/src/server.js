const express = require('express');
const { config } = require('dotenv');
const { join } = require('path');
const { ok } = require('assert');
const cors = require('cors');
const db = require('./database');
const routes = require('./routes');

config({ path: join(__dirname, '../config/', `.${process.env.NODE_ENV}`) });
ok(process.env.NODE_ENV === 'env', 'env inválido.');

db.connect();

const app = express();

app.use(cors());
app.use(express.json());

app.use(process.env.BASE_PATH, routes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Servidor rodando, porta: ${process.env.SERVER_PORT}, caminho: ${process.env.BASE_PATH}`);
});
