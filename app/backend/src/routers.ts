import { Router, Request, Response } from 'express';
import UserController from './controllers/UserController';
import TeamController from './controllers/TeamController';
import MatchController from './controllers/MatchController';

const routers: Router = Router();

const userController = new UserController();
const teamController = new TeamController();
const matchController = new MatchController();
routers.post('/login', (req: Request, res: Response) => userController.login(req, res));
routers.get('/login/validate', (req: Request, res: Response) => userController.validate(req, res));
routers.get('/teams', (req: Request, res: Response) => teamController.getAllTeams(req, res));
routers.get('/teams/:id', (req: Request, res: Response) => teamController.getTeam(req, res));
routers.get('/matches', (req: Request, res: Response) => matchController.getAllMatches(req, res));
routers.post('/matches', (req: Request, res: Response) => matchController.addNewMatch(req, res));
routers.patch('/matches/:id', (req: Request, res: Response) => matchController.editMatch(req, res));
routers.patch('/matches/:id/finish', (req: Request, res: Response) => matchController
  .endMatch(req, res));

export default routers;
