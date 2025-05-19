import { Request } from 'express';

export interface IUser {
  id: string;
  email: string;
  passwordHash: string;
}

export interface IUserPayload {
  id: string;
  email: string;
}

export interface IAuthRegisterBody {
  email: string;
  password: string;
}

export interface IAuthLoginBody {
  email: string;
  password: string;
}

export interface AuthRequest extends Request {
  user?: IUserPayload;
}
