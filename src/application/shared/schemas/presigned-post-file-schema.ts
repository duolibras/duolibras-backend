import { z } from 'zod';

export const presignedPostFileSchema = z.object({
  filename: z.string(),
  fileType: z.string(),
  fileSize: z.number(),
});
