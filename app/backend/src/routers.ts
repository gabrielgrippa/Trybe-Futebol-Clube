import { Router, Request, Response } from 'express';
import UserController from './controllers/UserController';

const routers: Router = Router();

const userController = new UserController();
routers.post('/login', (req: Request, res: Response) => userController.login(req, res));
routers.get('/login/validate', (req: Request, res: Response) => userController.validate(req, res));

export default routers;
