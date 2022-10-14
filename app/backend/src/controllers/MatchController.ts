import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
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
}
