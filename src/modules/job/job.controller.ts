import { Request, Response } from 'express';
import * as jobService from './job.service';

export async function handleCreateJob(req: Request, res: Response) {
  try {
    const job = await jobService.createJob(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create job' });
  }
}

export async function handleGetJobs(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const jobs = await jobService.getJobs(page, limit);
  res.json(jobs);
}

export async function handleGetJobById(req: Request, res: Response) {
  try {
    const job = await jobService.getJobById(req.params.id);
    res.json(job);
  } catch {
    res.status(404).json({ error: 'Job not found' });
  }
}

export async function handleUpdateJob(req: Request, res: Response) {
  try {
    const job = await jobService.updateJob(req.params.id, req.body);
    res.json(job);
  } catch {
    res.status(404).json({ error: 'Job not found or update failed' });
  }
}

export async function handleDeleteJob(req: Request, res: Response) {
  try {
    await jobService.deleteJob(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch {
    res.status(404).json({ error: 'Job not found or delete failed' });
  }
}
