import { Request, Response } from 'express';
import * as applicationService from './application.service';

export async function handleCreateApplication(req: Request, res: Response) {
  const userId = (req as any).user?.id;
  // Kiểm tra đã ứng tuyển chưa
  const existed = await applicationService.findByUserAndJob(
    userId,
    req.body.jobId
  );
  if (existed) {
    res.status(409).json({ error: 'Already applied' });
    return;
  }
  const application = await applicationService.createApplication({
    ...req.body, // phải có resumeId
    userId,
  });
  res.status(201).json(application);
}

export async function handleGetApplicationsByUser(req: Request, res: Response) {
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
