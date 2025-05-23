import {
  register,
  login,
  handleVerifyEmail,
  handlePasswordReset,
  handleChangePassword,
  handleLogout,
} from './auth.controller';
import * as authService from './auth.service';

jest.mock('./auth.service', () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
  sendPasswordReset: jest.fn(),
  changePassword: jest.fn(),
  verifyEmail: jest.fn(),
  logout: jest.fn(),
}));

describe('Auth Controller', () => {
  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => jest.clearAllMocks());

  describe('register', () => {
    it('should return 400 if service returns error', async () => {
      (authService.registerUser as jest.Mock).mockResolvedValue({
        error: 'Email exists',
      });
      const req = { body: {} } as any;
      const res = mockResponse();
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Email exists' });
    });

    it('should return 201 if service returns success', async () => {
      (authService.registerUser as jest.Mock).mockResolvedValue({
        message: 'OK',
      });
      const req = { body: {} } as any;
      const res = mockResponse();
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'OK' });
    });
  });

  describe('login', () => {
    it('should return 400 if service returns error', async () => {
      (authService.loginUser as jest.Mock).mockResolvedValue({
        error: 'Wrong',
      });
      const req = { body: {} } as any;
      const res = mockResponse();
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Wrong' });
    });

    it('should return token if service returns token', async () => {
      (authService.loginUser as jest.Mock).mockResolvedValue({ token: 'abc' });
      const req = { body: {} } as any;
      const res = mockResponse();
      await login(req, res);
      expect(res.json).toHaveBeenCalledWith({ token: 'abc' });
    });
  });

  describe('handleVerifyEmail', () => {
    it('should return 400 if no token', async () => {
      const req = { query: {} } as any;
      const res = mockResponse();
      await handleVerifyEmail(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    });

    it('should return 400 if service returns error', async () => {
      (authService.verifyEmail as jest.Mock).mockResolvedValue({
        error: 'Invalid or expired token',
      });
      const req = { query: { token: 'badtoken' } } as any;
      const res = mockResponse();
      await handleVerifyEmail(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid or expired token',
      });
    });

    it('should return 200 if service returns success', async () => {
      (authService.verifyEmail as jest.Mock).mockResolvedValue({
        message: 'Email verified successfully',
      });
      const req = { query: { token: 'goodtoken' } } as any;
      const res = mockResponse();
      await handleVerifyEmail(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Email verified successfully',
      });
    });
  });

  describe('handlePasswordReset', () => {
    it('should return 400 if service returns error', async () => {
      (authService.sendPasswordReset as jest.Mock).mockResolvedValue({
        error: 'Email does not exist',
      });
      const req = { body: { email: 'a@b.com' } } as any;
      const res = mockResponse();
      await handlePasswordReset(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Email does not exist' });
    });

    it('should return 200 if service returns success', async () => {
      (authService.sendPasswordReset as jest.Mock).mockResolvedValue({
        message: 'Password reset email sent',
      });
      const req = { body: { email: 'a@b.com' } } as any;
      const res = mockResponse();
      await handlePasswordReset(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Password reset email sent',
      });
    });
  });

  describe('handleChangePassword', () => {
    it('should return 401 if not authorized', async () => {
      const req = { user: null, body: { newPassword: '123456' } } as any;
      const res = mockResponse();
      await handleChangePassword(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should return 200 if password changed', async () => {
      (authService.changePassword as jest.Mock).mockResolvedValue({
        message: 'Password updated successfully',
      });
      const req = { user: { id: '1' }, body: { newPassword: '123456' } } as any;
      const res = mockResponse();
      await handleChangePassword(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Password updated successfully',
      });
    });
  });

  describe('handleLogout', () => {
    it('should return 400 if no token', async () => {
      const req = { headers: {} } as any;
      const res = mockResponse();
      await handleLogout(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Token is required' });
    });

    it('should return 200 if logout success', async () => {
      (authService.logout as jest.Mock).mockResolvedValue({
        message: 'Logged out successfully',
      });
      const req = { headers: { authorization: 'Bearer token' } } as any;
      const res = mockResponse();
      await handleLogout(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Logged out successfully',
      });
    });
  });
});
