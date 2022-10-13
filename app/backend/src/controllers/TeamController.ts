import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  private service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  public async getAllTeams(req: Request, res: Response) {
    const teams = await this.service.getAllTeams();
    return res.status(200).json(teams);
  }

  public async getTeam(req: Request, res: Response) {
    const team = await this.service.getTeam(req.params.id);
    return res.status(200).json(team);
  }
}
