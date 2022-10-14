import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';
// import TeamService from '../services/TeamService';

chai.use(chaiHttp);

const { expect } = chai;

const dumpTeam = [
  {
    id: 1,
    teamName: "Team1",
  },
  {
    id: 2,
    teamName: "Team2",
  },
]

describe('/teams', () => {
  afterEach(() => {
    Sinon.restore()
  })

  describe('retorna todos os times', () => {
    beforeEach(() => {
      Sinon.stub(Team, 'findAll').resolves(dumpTeam as Team[])
    })

    it('Deve retornar todos os times', async () => {
      const response = await chai.request(app).get('/teams');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.an('array');
    });
  })
});
