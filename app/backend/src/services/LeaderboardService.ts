import Team from '../database/models/team';
import MatchService from './MatchService';
import TeamService from './TeamService';
import ITeamInfo from '../entities/ITeamInfo';
import Match from '../database/models/match';

class LeaderboardService {
  private matchService: MatchService;
  private teamService: TeamService;
  private _done: boolean;

  constructor() {
    this.matchService = new MatchService();
    this.teamService = new TeamService();
  }

  public calculatePoints(info:ITeamInfo) {
    const { team, wins, losses, ties, goalsFavor, goalsOwn } = info;
    const teamResult = {
      name: team,
      totalPoints: wins * 3 + ties,
      totalGames: wins + ties + losses,
      totalVictories: wins,
      totalDraws: ties,
      totalLosses: losses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: (((wins * 3 + ties) / ((wins + ties + losses) * 3)) * 100).toFixed(2),
    };
    this._done = true;
    return teamResult;
  }

  public async getHomeLeaderboardUnsorted() {
    const matches = await this.matchService.getFilteredMatches(false);
    const teams = await this.teamService.getAllTeams();
    const result = [];
    for (let index = 1; index < 17; index += 1) {
      const desiredTeam = matches.filter((match) => match.homeTeam === index);
      let wins = 0; let losses = 0; let ties = 0; let goalsFavor = 0; let goalsOwn = 0;
      desiredTeam.forEach((match) => {
        if (match.homeTeamGoals - match.awayTeamGoals > 0) wins += 1;
        if (match.homeTeamGoals - match.awayTeamGoals < 0) losses += 1;
        if (match.homeTeamGoals - match.awayTeamGoals === 0) ties += 1;
        goalsFavor += match.homeTeamGoals;
        goalsOwn += match.awayTeamGoals;
      });
      const team = teams.find((thisTeam:Team) => thisTeam.id === index)?.teamName;
      const fu = this.calculatePoints({ team, wins, losses, ties, goalsFavor, goalsOwn });
      result.push(fu);
    }
    return result;
  }

  public async getAwayLeaderboardUnsorted() {
    const matches = await this.matchService.getFilteredMatches(false);
    const teams = await this.teamService.getAllTeams();
    const result = [];
    for (let index = 1; index < 17; index += 1) {
      const desiredTeam = matches.filter((match) => match.awayTeam === index);
      let wins = 0; let losses = 0; let ties = 0; let goalsFavor = 0; let goalsOwn = 0;
      desiredTeam.forEach((match) => {
        if (match.awayTeamGoals - match.homeTeamGoals > 0) wins += 1;
        if (match.awayTeamGoals - match.homeTeamGoals < 0) losses += 1;
        if (match.awayTeamGoals - match.homeTeamGoals === 0) ties += 1;
        goalsFavor += match.awayTeamGoals;
        goalsOwn += match.homeTeamGoals;
      });
      const team = teams.find((thisTeam:Team) => thisTeam.id === index)?.teamName;
      const fu = this.calculatePoints({ team, wins, losses, ties, goalsFavor, goalsOwn });
      result.push(fu);
    }
    return result;
  }

  public getHomeTeamStats(matches:Match[]) {
    let wins = 0; let losses = 0; let ties = 0; let goalsFavor = 0; let goalsOwn = 0;
    matches.forEach((match:Match) => {
      if (match.homeTeamGoals - match.awayTeamGoals > 0) wins += 1;
      if (match.homeTeamGoals - match.awayTeamGoals === 0) ties += 1;
      if (match.homeTeamGoals - match.awayTeamGoals < 0) losses += 1;
      goalsFavor += match.homeTeamGoals;
      goalsOwn += match.awayTeamGoals;
    });
    return { wins, losses, ties, goalsFavor, goalsOwn };
    this._done = true;
  }

  public getAwayTeamStats(matches:Match[]) {
    let wins = 0; let losses = 0; let ties = 0; let goalsFavor = 0; let goalsOwn = 0;
    matches.forEach((match:Match) => {
      if (match.awayTeamGoals - match.homeTeamGoals > 0) wins += 1;
      if (match.awayTeamGoals - match.homeTeamGoals === 0) ties += 1;
      if (match.awayTeamGoals - match.homeTeamGoals < 0) losses += 1;
      goalsFavor += match.awayTeamGoals;
      goalsOwn += match.homeTeamGoals;
    });
    return { wins, losses, ties, goalsFavor, goalsOwn };
    this._done = true;
  }

  public async getAllLeaderboardUnsorted() {
    const matches = await this.matchService.getFilteredMatches(false);
    const teams = await this.teamService.getAllTeams();
    const result = [];
    for (let index = 1; index < 17; index += 1) {
      const desiredTeamHome = matches.filter((match) => match.homeTeam === index);
      const desiredTeamAway = matches.filter((match) => match.awayTeam === index);
      const tHS = this.getHomeTeamStats(desiredTeamHome);
      const tAS = this.getAwayTeamStats(desiredTeamAway);
      const wins = tHS.wins + tAS.wins; const losses = tHS.losses + tAS.losses;
      const ties = tHS.ties + tAS.ties; const goalsFavor = tHS.goalsFavor + tAS.goalsFavor;
      const goalsOwn = tHS.goalsOwn + tAS.goalsOwn;
      const team = teams.find((thisTeam:Team) => thisTeam.id === index)?.teamName;
      const fu = this.calculatePoints({ team, wins, losses, ties, goalsFavor, goalsOwn });
      result.push(fu);
    }
    return result;
  }

  public async getSortedLeaderboard(params: string) {
    let unsortedLeaderboard = [];
    if (params === 'home') {
      unsortedLeaderboard = await this.getHomeLeaderboardUnsorted();
    } else if (params === 'away') {
      unsortedLeaderboard = await this.getAwayLeaderboardUnsorted();
    } else {
      unsortedLeaderboard = await this.getAllLeaderboardUnsorted();
    }
    return unsortedLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);
  }
}

export default LeaderboardService;
