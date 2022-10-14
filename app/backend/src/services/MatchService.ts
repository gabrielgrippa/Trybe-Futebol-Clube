import Match from '../database/models/match';
import Team from '../database/models/team';
import INewMatch from '../entities/INewMatch';

class MatchService {
  private _Matches: Match[] ;
  private _NewMatch: Match;
  private _done: boolean;

  public async getAllMatches() {
    const ast = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    if (ast) {
      this._Matches = ast;
    }
    return this._Matches;
  }

  public async getFilteredMatches(inProgress: boolean) {
    await this.getAllMatches();
    const result = this._Matches.filter((match) => match.inProgress === inProgress);
    return result;
  }

  public async addNewMatch(newMatch: INewMatch) {
    const result = await Match.create({
      homeTeam: newMatch.homeTeam,
      homeTeamGoals: newMatch.homeTeamGoals,
      awayTeam: newMatch.awayTeam,
      awayTeamGoals: newMatch.awayTeamGoals,
      inProgress: newMatch.inProgress,
    });
    this._NewMatch = result;
    return this._NewMatch;
  }

  public async endMatch(id: number) {
    const asd = await Match.update({ inProgress: false }, { where: { id } });
    this._done = true;
    console.log(asd);
  }
}

export default MatchService;
