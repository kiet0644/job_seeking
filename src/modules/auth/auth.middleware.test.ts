import { authenticateToken } from './auth.middleware';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('authenticateToken', () => {
  it('should return 401 if no token', () => {
    const req: any = { headers: {} };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    authenticateToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should call next if token valid', () => {
    (jwt.verify as jest.Mock).mockImplementation((token, secret, cb) =>
      cb(null, { id: '1' })
    );
    const req: any = { headers: { authorization: 'Bearer token' } };
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    authenticateToken(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
