import { z } from 'zod';

export const jobCreateSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  // Thêm các trường khác nếu cần, ví dụ:
  // location: z.string().optional(),
  // salary: z.string().optional(),
});

export const jobUpdateSchema = jobCreateSchema.partial();
