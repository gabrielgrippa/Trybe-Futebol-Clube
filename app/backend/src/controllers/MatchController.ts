import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  public async getAllMatches(req: Request, res: Response) {
    const Matches = await this.service.getAllMatches();
    return res.status(200).json(Matches);
  }
}
