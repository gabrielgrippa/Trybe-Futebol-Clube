import Team from '../database/models/team';

class TeamService {
  private _teams: Team[] ;

  public async getAllTeams() {
    const teams = await Team.findAll();
    if (teams) this._teams = teams;
    return this._teams;
  }
}

export default TeamService;
