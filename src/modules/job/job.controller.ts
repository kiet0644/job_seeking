import { Request, Response } from 'express';
import * as jobService from './job.service';
import { jobCreateSchema, jobUpdateSchema } from './job.validation';

export async function handleCreateJob(req: Request, res: Response) {
  try {
    jobCreateSchema.parse(req.body);
    const employerId = req.user?.id;
    if (!employerId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    const job = await jobService.createJob({ ...req.body, employerId });
    res.status(201).json(job);
  } catch (error: any) {
    console.error('Job creation error:', error);
    res
      .status(400)
      .json({ error: error.errors?.[0]?.message || 'Failed to create job' });
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
    const job = await jobService.getJobById(req.params.id);
    if (job.employerId !== req.user?.id) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    jobUpdateSchema.parse(req.body);
    const updatedJob = await jobService.updateJob(req.params.id, req.body);
    res.json(updatedJob);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to update job' });
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

export async function handleSearchJobs(req: Request, res: Response) {
  const {
    keyword,
    location,
    jobType,
    salaryMin,
    salaryMax,
    page = 1,
    limit = 20,
  } = req.query;
  const jobs = await jobService.searchJobs({
    keyword: keyword as string,
    location: location as string,
    jobType: jobType as string,
    salaryMin: salaryMin ? Number(salaryMin) : undefined,
    salaryMax: salaryMax ? Number(salaryMax) : undefined,
    page: Number(page),
    limit: Number(limit),
  });
  res.json(jobs);
}
