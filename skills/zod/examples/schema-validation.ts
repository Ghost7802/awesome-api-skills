import { z } from 'zod';

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().nullable().default(null),
});

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

export function validateQuery(rawQuery: Record<string, unknown>) {
  const parsed = PaginationQuerySchema.safeParse(rawQuery);
  if (!parsed.success) {
    return { valid: false as const, errors: parsed.error.flatten().fieldErrors };
  }
  return { valid: true as const, data: parsed.data };
}
