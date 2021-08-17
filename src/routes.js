import {Router} from 'express';
import DeveloperController from '../src/controllers/DeveloperController';

const routes = new Router();

routes.get('/developers', DeveloperController.index)
routes.get('/developers/:id', DeveloperController.show)
routes.post('/developers', DeveloperController.store)
routes.put('/developers/:id', DeveloperController.update)
routes.delete('/developers/:id', DeveloperController.delete)

export default routes;