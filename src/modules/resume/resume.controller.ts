import { Request, Response } from 'express';
import { File, Multer } from 'multer';
import * as resumeService from './resume.service';
import { resumeCreateSchema, resumeUpdateSchema } from './resume.validation';

export async function handleCreateResume(req: Request, res: Response) {
  try {
    resumeCreateSchema.parse(req.body);
  } catch (err: any) {
    res
      .status(400)
      .json({ error: err.errors?.[0]?.message || 'Invalid input' });
    return;
  }
  const userId = (req as any).user?.id;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  // Ép kiểu req để lấy file từ multer
  const file = (req as any).file as Multer.File | undefined;
  const url = file ? `/uploads/resumes/${file.filename}` : req.body.url;

  const count = await resumeService.countResumesByUser(userId);
  if (count >= 5) {
    res.status(400).json({ error: 'Max 5 resumes allowed' });
    return;
  }

  const resume = await resumeService.createResume(userId, { ...req.body, url });
  res.status(201).json(resume);
}

export async function handleGetResumes(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const resumes = await resumeService.getResumesByUser(userId);
  res.json(resumes);
}

export async function handleUpdateResume(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const resume = await resumeService.updateResume(
    req.params.id,
    userId,
    req.body
  );
  res.json(resume);
}

export async function handleDeleteResume(req: Request, res: Response) {
  const userId = (req as any).user?.id;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const result = await resumeService.deleteResume(req.params.id, userId);
  if (result.count === 0) {
    res.status(404).json({ error: 'Resume not found' });
    return;
  }
  res.status(204).end();
}

export async function handleGetResumeById(req: Request, res: Response) {
  const userId = (req as any).user?.id;
  const resume = await resumeService.getResumeById(req.params.id, userId);
  if (!resume) return res.status(404).json({ error: 'Resume not found' });
  res.json(resume);
}
