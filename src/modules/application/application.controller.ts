import { Request, Response } from 'express';
import * as applicationService from './application.service';

export async function handleCreateApplication(req: Request, res: Response) {
  try {
    const application = await applicationService.createApplication(req.body);
    res.status(201).json(application);
  } catch {
    res.status(400).json({ error: 'Failed to create application' });
  }
}

export async function handleGetApplicationsByUser(req: Request, res: Response) {
  const userId = req.params.userId;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const applications = await applicationService.getApplicationsByUser(
    userId,
    page,
    limit
  );
  res.json(applications);
}

export async function handleGetApplicationsByJob(req: Request, res: Response) {
  const jobId = req.params.jobId;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const applications = await applicationService.getApplicationsByJob(
    jobId,
    page,
    limit
  );
  res.json(applications);
}

export async function handleUpdateApplicationStatus(
  req: Request,
  res: Response
) {
  try {
    const application = await applicationService.updateApplicationStatus(
      req.params.id,
      req.body
    );
    res.json(application);
  } catch {
    res.status(404).json({ error: 'Application not found or update failed' });
  }
}

export async function handleDeleteApplication(req: Request, res: Response) {
  try {
    await applicationService.deleteApplication(req.params.id);
    res.json({ message: 'Application deleted' });
  } catch {
    res.status(404).json({ error: 'Application not found or delete failed' });
  }
}
