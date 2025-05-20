import { Request } from 'express';

export interface IUser {
  id: string;
  email: string;
  passwordHash: string;
  emailVerified?: boolean; // Thêm trạng thái xác thực email
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

export interface IAuthPasswordResetBody {
  email: string;
}

export interface IAuthChangePasswordBody {
  userId: string;
  newPassword: string;
}

export interface AuthRequest extends Request {
  user?: IUserPayload; // Thông tin người dùng được gắn vào request sau khi xác thực
}
