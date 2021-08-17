import express from 'express';
import routes from './routes';
import cors from 'cors';
import '../src/config/database';

class App {
    constructor(){
        this.server = express();
        
        this.cors();
        this.middlewares();
        this.routes();
        
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes)
    }

    cors() {
        this.server.use(cors())
    }
}

export default new App().server;