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
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    if (homeTeam > 16 || awayTeam > 16) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    if (token) {
      const role = await this.userService.validate(token);
      if (role) {
        const Match = await this.service.addNewMatch(req.body);
        return res.status(201).json(Match);
      }
    }
    return res.status(400).json({ message: 'Sem token' });
  }

  public async endMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.service.endMatch(id);
    return res.status(200).json({ message: 'Finished' });
  }
}
