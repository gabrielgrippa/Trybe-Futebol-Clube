import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public async login(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const user = await this.service.login(req.body);
    if (!user) return res.status(401).json({ message: 'Incorrect email or password' });
    return res.status(user.code).json({ token: user.result });
  }
}
