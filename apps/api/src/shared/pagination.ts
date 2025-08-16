import { PaginatedResult } from '@repo/types';

// Small helper to build consistent payloads
export function buildPaginatedResult<T>(
  data: T[],
  total: number,
  skip: number,
  take: number,
): PaginatedResult<T> {
  const hasMore = skip + data.length < total; // works even for last short page
  return { data, pagination: { skip, take, total, hasMore } };
}
