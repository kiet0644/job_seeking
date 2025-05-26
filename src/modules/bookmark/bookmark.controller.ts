import { Request, Response } from 'express';
import * as bookmarkService from './bookmark.service';

export async function handleCreateBookmark(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    const { jobId } = req.body;
    if (!userId || !jobId) {
      res.status(400).json({ error: 'Missing userId or jobId' });
      return;
    }
    const bookmark = await bookmarkService.createBookmark({ userId, jobId });
    res.status(201).json(bookmark);
  } catch (err: any) {
    if (err.message === 'Bookmark already exists') {
      res.status(409).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Failed to create bookmark' });
    }
  }
}

export async function handleGetBookmarksByUser(req: Request, res: Response) {
  const userId = req.user?.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const bookmarks = await bookmarkService.getBookmarksByUser(
    userId,
    page,
    limit
  );
  res.json(bookmarks);
}

export async function handleDeleteBookmark(req: Request, res: Response) {
  const userId = req.user?.id;
  const bookmarkId = req.params.id;
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  try {
    await bookmarkService.deleteBookmark(bookmarkId, userId);
    res.json({ message: 'Bookmark deleted' });
  } catch {
    res.status(404).json({ error: 'Bookmark not found or access denied' });
  }
}

export async function handleGetBookmarksByJob(req: Request, res: Response) {
  const jobId = req.params.jobId;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const bookmarks = await bookmarkService.getBookmarksByJob(jobId, page, limit);
  res.json(bookmarks);
}
