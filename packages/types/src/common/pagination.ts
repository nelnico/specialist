export type PaginatedResult<T> = {
  data: T[];
  pagination: {
    skip: number;
    take: number;
    total: number;
    hasMore: boolean;
  };
};

// Small helper to build consistent payloads
// export function buildPaginatedResult<T>(
//   data: T[],
//   total: number,
//   skip: number,
//   take: number
// ): PaginatedResult<T> {
//   const hasMore = skip + data.length < total; // works even for last short page
//   return { data, pagination: { skip, take, total, hasMore } };
// }
