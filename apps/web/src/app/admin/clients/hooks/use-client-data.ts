"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import type { PaginatedResult, ClientListItem } from "@repo/types";
import { clientsKeys, deleteClient, fetchClients } from "@/lib/api/client";

type UseClientsArgs = { pageIndex: number; pageSize: number };

export function useClientsData({ pageIndex, pageSize }: UseClientsArgs) {
  const skip = pageIndex * pageSize;
  const take = pageSize;

  const query = useQuery({
    queryKey: clientsKeys.list(skip, take),
    queryFn: () => fetchClients(skip, take),
    // keep previous data for smoother paging (optional)
    placeholderData: (prev) => prev,
  });

  return { ...query, skip, take };
}

export function useDeleteClient() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteClient(id),
    // simplest: invalidate all client lists so the current page refetches
    onSuccess: () => qc.invalidateQueries({ queryKey: clientsKeys.all }),
  });
}

/* Optional advanced: optimistic update for current page only
export function useDeleteClientOptimistic(skip: number, take: number) {
  const qc = useQueryClient();
  const key = clientsKeys.list(skip, take);

  return useMutation({
    mutationFn: (id: number) => deleteClient(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: key });
      const previous = qc.getQueryData<PaginatedResult<ClientListItem>>(key);
      if (previous) {
        const next = {
          ...previous,
          data: previous.data.filter((row) => row.id !== id),
          pagination: {
            ...previous.pagination,
            total: Math.max(0, previous.pagination.total - 1),
          },
        };
        qc.setQueryData(key, next);
      }
      return { previous };
    },
    onError: (_e, _id, context) => {
      if (context?.previous) qc.setQueryData(key, context.previous);
    },
    onSettled: () => {
      // final refetch to ensure server truth (handles last-row-on-page edge cases)
      qc.invalidateQueries({ queryKey: key });
    },
  });
}
*/
