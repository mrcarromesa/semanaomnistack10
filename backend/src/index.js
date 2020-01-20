import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import cors from 'cors';

import http from 'http';

import { setupWebsocket } from './websocket';

const app = express();

const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://admin:admin123456@cluster0-i2nnb.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.use(cors());

// Para o req.body no formato json funcionar necessário a linha abaixo
app.use(express.json());

// Query params => req.query (paginacao, filtros)
// Routes params => req.parms (url do tipo http://url/param, alteração, remoção)
// Body => req.body (dados para criacao/alteracao)

app.use(routes);

server.listen(3333);