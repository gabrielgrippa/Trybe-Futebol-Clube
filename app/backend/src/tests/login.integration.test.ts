import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
// import UserService from '../services/UserService';

chai.use(chaiHttp);

const { expect } = chai;

const dumpUser = {
  id: 1,
  username: "user",
  role: "user",
  email: "user@user.com",
  password: "userpassword"
}

const loginCredentials = {
  email: "user@user.com",
  password: "secret_user"
}

describe('/login', () => {
  afterEach(() => {
    Sinon.restore()
  })

  describe('POST', () => {
    beforeEach(() => {
      Sinon.stub(User, 'findOne').resolves(dumpUser as User)
    })

    it('Deve fazer login com sucesso', async () => {
      const response = await chai.request(app).post('/login').send(loginCredentials);
      expect(response.status).to.be.equal(200);
    });
  })
});
