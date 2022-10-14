import Match from '../database/models/match';
import Team from '../database/models/team';

class MatchService {
  private _Matches: Match[] ;
  private _Match: Match;

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
}

export default MatchService;
