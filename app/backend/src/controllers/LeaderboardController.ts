import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  public async getLeaderboard(req: Request, res: Response, type: string) {
    const Leaderboard = await this.service.getSortedLeaderboard(type);
    return res.status(200).json(Leaderboard);
  }
}
