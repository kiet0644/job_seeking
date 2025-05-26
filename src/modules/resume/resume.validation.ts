import { z } from 'zod';

export const resumeCreateSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  url: z.string().url('Invalid file URL'),
});

export const resumeUpdateSchema = resumeCreateSchema.partial();
