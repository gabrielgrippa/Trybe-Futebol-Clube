import { Router, Request, Response } from 'express';
import UserController from './controllers/UserController';
import TeamController from './controllers/TeamController';

const routers: Router = Router();

const userController = new UserController();
const teamController = new TeamController();
routers.post('/login', (req: Request, res: Response) => userController.login(req, res));
routers.get('/login/validate', (req: Request, res: Response) => userController.validate(req, res));
routers.get('/teams', (req: Request, res: Response) => teamController.getAllTeams(req, res));

export default routers;
