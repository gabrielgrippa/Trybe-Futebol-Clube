import Team from '../database/models/team';

class TeamService {
  private _teams: Team[] ;
  private _team: Team;

  public async getAllTeams() {
    const teams = await Team.findAll();
    if (teams) this._teams = teams;
    return this._teams;
  }

  public async getTeam(id: string) {
    const team = await Team.findOne({
      where: { id },
    });
    if (team) this._team = team;
    return this._team;
  }
}

export default TeamService;
