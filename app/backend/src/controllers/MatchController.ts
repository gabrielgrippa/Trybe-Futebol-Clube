import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import UserService from '../services/UserService';

export default class MatchController {
  private service: MatchService;
  private userService: UserService;

  constructor() {
    this.service = new MatchService();
    this.userService = new UserService();
  }

  public async getAllMatches(req: Request, res: Response) {
    if (req.query.inProgress) await this.getFilteredMatches(req, res);
    else {
      const Matches = await this.service.getAllMatches();
      return res.status(200).json(Matches);
    }
  }

  public async getFilteredMatches(req: Request, res: Response) {
    const Matches = await this.service
      .getFilteredMatches(req.query.inProgress === 'true');
    return res.status(200).json(Matches);
  }

  public async addNewMatch(req: Request, res: Response) {
    const token = req.headers.authorization;
    if (token) {
      const role = await this.userService.validate(token);
      console.log(role);
      if (role) {
        const Match = await this.service.addNewMatch(req.body);
        return res.status(201).json(Match);
      }
    }
    return res.status(400).json({ message: 'Deu ruim' });
  }
}
