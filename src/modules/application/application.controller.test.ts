import {
  handleCreateApplication,
  handleGetApplicationsByUser,
  handleGetApplicationsByJob,
  handleUpdateApplicationStatus,
  handleDeleteApplication,
} from './application.controller';
import * as applicationService from './application.service';

jest.mock('./application.service');

describe('Application Controller', () => {
  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => jest.clearAllMocks());

  it('handleCreateApplication - success', async () => {
    (applicationService.createApplication as jest.Mock).mockResolvedValue({
      id: '1',
    });
    const req = { body: { userId: 'u', jobId: 'j' } } as any;
    const res = mockResponse();
    await handleCreateApplication(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: '1' });
  });

  // ...Thêm các test khác tương tự...
});
