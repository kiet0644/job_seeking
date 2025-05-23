import {
  handleGetUserProfile,
  handleUpdateUserProfile,
  handleCreateUserProfile,
} from './user.controller';
import * as userService from './user.service';

describe('User Controller', () => {
  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleGetUserProfile', () => {
    it('should return 401 if not authorized', async () => {
      const req = { user: null } as any;
      const res = mockResponse();
      await handleGetUserProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should return profile if authorized', async () => {
      const req = { user: { id: '1' } } as any;
      const res = mockResponse();
      const fakeProfile = { id: '1', fullName: 'Test' };
      jest.spyOn(userService, 'getUserProfile').mockResolvedValue(fakeProfile);
      await handleGetUserProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeProfile);
    });
  });

  describe('handleUpdateUserProfile', () => {
    it('should return 401 if not authorized', async () => {
      const req = { user: null } as any;
      const res = mockResponse();
      await handleUpdateUserProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should update and return profile if authorized', async () => {
      const req = { user: { id: '1' }, body: { fullName: 'Updated' } } as any;
      const res = mockResponse();
      const updatedProfile = { id: '1', fullName: 'Updated' };
      jest
        .spyOn(userService, 'updateUserProfile')
        .mockResolvedValue(updatedProfile);
      await handleUpdateUserProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedProfile);
    });
  });

  describe('handleCreateUserProfile', () => {
    it('should return 401 if not authorized', async () => {
      const req = { user: null } as any;
      const res = mockResponse();
      await handleCreateUserProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should create and return profile if authorized', async () => {
      const req = { user: { id: '1' }, body: { education: ['A'] } } as any;
      const res = mockResponse();
      const createdProfile = { id: 'p1', userId: '1', education: ['A'] };
      jest
        .spyOn(userService, 'createUserProfile')
        .mockResolvedValue(createdProfile);
      await handleCreateUserProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdProfile);
    });

    it('should return 500 if service throws error', async () => {
      const req = { user: { id: '1' }, body: {} } as any;
      const res = mockResponse();
      jest
        .spyOn(userService, 'createUserProfile')
        .mockRejectedValue(new Error('Failed'));
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      await handleCreateUserProfile(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to create user profile',
      });
      consoleSpy.mockRestore();
    });
  });
});
