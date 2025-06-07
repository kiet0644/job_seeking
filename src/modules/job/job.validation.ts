import { z } from 'zod';

export const jobCreateSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  experience: z.string().optional(),
  level: z.string().optional(),
  status: z.enum(['OPEN', 'CLOSED', 'DRAFT']).optional(), // Thêm dòng này
});

export const jobUpdateSchema = jobCreateSchema.partial();
