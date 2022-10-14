import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

chai.use(chaiHttp);

const { expect } = chai;

const dumpUser = {
  id: 2,
  username: "User",
  role: "user",
  email: "user@user.com",
  password: "$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO"
}

const loginCredentials = {
  email: "user@user.com",
  password: "secret_user"
}

const badCredentials = {
  email: "useruser.com",
  password: "secret_user"
}

const dumpToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidXNlckB1c2VyLmNvbSIsImlhdCI6MTY2NTUwOTYzMX0.MApYoWUkrJ1z9U6LLnmSvQ2_iE2RssvlK7RTlNxgYWA'

describe('/login', () => {
  afterEach(() => {
    Sinon.restore()
  })

  describe('POST', () => {

    describe('Usuário válido', () => {
      beforeEach(() => {
      Sinon.stub(User, 'findOne').resolves(dumpUser as User)
    })

      it('Deve fazer login com sucesso', async () => {
        const response = await chai.request(app).post('/login').send(loginCredentials);
        expect(response.status).to.be.equal(200);
      });
    })
    
    describe('Usuário inválido', () => {
      beforeEach(() => {
      Sinon.stub(User, 'findOne').resolves(null)
    })

      it('Deve retornar um erro', async () => {
        const response = await chai.request(app).post('/login').send(badCredentials);
        expect(response.status).to.be.equal(401);
      });
    })
  })

  describe('GET', () => {
    afterEach(() => {
      Sinon.restore()
    })

    describe('Token válido', () => {
      beforeEach(() => {
      Sinon.stub(User, 'findOne').resolves(dumpUser as User)
    })

      it('Deve fazer login com sucesso', async () => {
        const response = await chai.request(app).get('/login/validate').set('authorization', dumpToken);
        expect(response.status).to.be.equal(200);
      });
    })
  })
});
