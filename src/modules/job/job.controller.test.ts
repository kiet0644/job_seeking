import {
  handleCreateJob,
  handleGetJobs,
  handleGetJobById,
  handleUpdateJob,
  handleDeleteJob,
} from './job.controller';
import * as jobService from './job.service';

jest.mock('./job.service');

describe('Job Controller', () => {
  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  afterEach(() => jest.clearAllMocks());

  it('handleCreateJob - success', async () => {
    (jobService.createJob as jest.Mock).mockResolvedValue({ id: '1', title: 'A' });
    const req = { body: { title: 'A', description: 'B' } } as any;
    const res = mockResponse();
    await handleCreateJob(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: '1', title: 'A' });
  });

  it('handleGetJobs - success', async () => {
    (jobService.getJobs as jest.Mock).mockResolvedValue([{ id: '1' }]);
    const req = { query: {} } as any;
    const res = mockResponse();
    await handleGetJobs(req, res);
    expect(res.json).toHaveBeenCalledWith([{ id: '1' }]);
  });

  it('handleGetJobById - found', async () => {
    (jobService.getJobById as jest.Mock).mockResolvedValue({ id: '1' });
    const req = { params: { id: '1' } } as any;
    const res = mockResponse();
    await handleGetJobById(req, res);
    expect(res.json).toHaveBeenCalledWith({ id: '1' });
  });

  it('handleGetJobById - not found', async () => {
    (jobService.getJobById as jest.Mock).mockRejectedValue(new Error());
    const req = { params: { id: '2' } } as any;
    const res = mockResponse();
    await handleGetJobById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Job not found' });
  });

  it('handleUpdateJob - success', async () => {
    (jobService.updateJob as jest.Mock).mockResolvedValue({ id: '1', title: 'C' });
    const req = { params: { id: '1' }, body: { title: 'C' } } as any;
    const res = mockResponse();
    await handleUpdateJob(req, res);
    expect(res.json).toHaveBeenCalledWith({ id: '1', title: 'C' });
  });

  it('handleDeleteJob - success', async () => {
    (jobService.deleteJob as jest.Mock).mockResolvedValue({});
    const req = { params: { id: '1' } } as any;
    const res = mockResponse();
    await handleDeleteJob(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'Job deleted' });
  });
});