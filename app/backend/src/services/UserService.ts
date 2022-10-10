import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/user';
import IUser from '../entities/IUser';

class UserService {
  private _user:User;
  private _token:string;
  private _secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret;
  private _validEmail: boolean;

  public async generateToken() {
    this._token = jwt.sign({ data: this._user.email }, this._secret);
  }

  public validation(credentials: IUser) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    this._validEmail = regex.test(credentials.email);
  }

  public async login(credentials: IUser) {
    this.validation(credentials);
    if (!this._validEmail) return null;
    const userData = await User.findOne({ where: {
      email: credentials.email,
    } });
    if (userData) {
      this._user = userData;
      const passwordCheck = bcrypt.compareSync(credentials.password, this._user.password);
      if (passwordCheck) {
        await this.generateToken();
        return { code: 200, result: this._token };
      }
      return null;
    }
  }
}

export default UserService;
