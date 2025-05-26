// src/modules/admin/admin.controller.ts
import { Request, Response } from 'express';
import * as adminService from './admin.service';

export async function handleGetUsers(req: Request, res: Response) {
  try {
    const users = await adminService.getUsers();
    res.json(users);
  } catch {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

export async function handleDeleteUser(req: Request, res: Response) {
  try {
    await adminService.deleteUser(req.params.id);
    res.json({ message: 'User deleted' });
  } catch {
    res.status(404).json({ error: 'User not found or delete failed' });
  }
}

export async function handleUpdateUserRole(req: Request, res: Response) {
  const { role } = req.body;
  if (!role) {
    res.status(400).json({ error: 'Role is required' });
    return;
  }
  try {
    await adminService.updateUserRole(req.params.id, role);
    res.json({ message: 'Role updated' });
  } catch {
    res.status(404).json({ error: 'User not found or update failed' });
  }
}

export async function handleGetJobs(req: Request, res: Response) {
  try {
    const jobs = await adminService.getJobs();
    res.json(jobs);
  } catch {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
}

export async function handleDeleteJob(req: Request, res: Response) {
  try {
    await adminService.deleteJob(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch {
    res.status(404).json({ error: 'Job not found or delete failed' });
  }
}

export async function handleGetStats(req: Request, res: Response) {
  try {
    const stats = await adminService.getStats();
    res.json(stats);
  } catch {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
}
