import { Request, Response } from 'express';
import * as applicationService from './application.service';
import { AuthRequest } from '@/modules/auth/auth.types';

export async function handleCreateApplication(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    // Kiểm tra đã ứng tuyển chưa
    const existed = await applicationService.findByUserAndJob(
      userId,
      req.body.jobId
    );
    if (existed) return res.status(409).json({ error: 'Already applied' });
    const application = await applicationService.createApplication({
      ...req.body,
      userId,
    });
    res.status(201).json(application);
  } catch {
    res.status(400).json({ error: 'Failed to create application' });
  }
}

export async function handleGetApplicationsByUser(
  req: AuthRequest,
  res: Response
) {
  const userId = req.user?.id;
  // Nếu là admin thì cho phép truyền userId qua params, còn lại chỉ cho xem của chính mình
  // ...
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
