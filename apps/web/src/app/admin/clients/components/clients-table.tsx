"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type PaginationState,
} from "@tanstack/react-table";

import { clientColumns } from "./columns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ClientListItem, PaginatedResult } from "@repo/types";
import { API_BASE } from "@/lib/config/config";

// The API sends membershipEndDate as ISO string; map to Date for your shared type.
type ClientListItemDTO = Omit<ClientListItem, "membershipEndDate"> & {
  membershipEndDate: string | null;
};
type ClientsResponseDTO = PaginatedResult<ClientListItemDTO>;

async function fetchClients(
  skip: number,
  take: number
): Promise<PaginatedResult<ClientListItem>> {
  const url = `${API_BASE}/admin/client?skip=${skip}&take=${take}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed with ${res.status}`);
  }
  const json: ClientsResponseDTO = await res.json();

  // Map ISO to Date to satisfy your shared types
  const data: ClientListItem[] = json.data.map((c) => ({
    ...c,
    membershipEndDate: c.membershipEndDate
      ? new Date(c.membershipEndDate)
      : null,
  }));

  return { data, pagination: json.pagination };
}

export default function ClientsTable() {
  // Pagination state for TanStack Table
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0, // 0-based
    pageSize: 25,
  });

  const skip = pagination.pageIndex * pagination.pageSize;
  const take = pagination.pageSize;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["admin-clients", skip, take],
    queryFn: () => fetchClients(skip, take),
  });

  const total = data?.pagination.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / take));

  const table = useReactTable({
    data: data?.data ?? [],
    columns: clientColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <div className="w-full space-y-3 ">
      {/* Controls */}
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm text-muted-foreground">
          {isFetching ? "Refreshing…" : `Total: ${total.toLocaleString()}`}
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={String(pagination.pageSize)}
            onValueChange={(v) =>
              setPagination((p) => ({
                ...p,
                pageSize: parseInt(v, 10),
                pageIndex: 0,
              }))
            }
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Page size" />
            </SelectTrigger>
            <SelectContent align="end">
              {[10, 25, 50, 100].map((s) => (
                <SelectItem key={s} value={String(s)}>
                  {s} / page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination((p) => ({ ...p, pageIndex: 0 }))}
              disabled={pagination.pageIndex === 0 || isFetching}
            >
              ⏮
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPagination((p) => ({ ...p, pageIndex: p.pageIndex - 1 }))
              }
              disabled={pagination.pageIndex === 0 || isFetching}
            >
              Prev
            </Button>
            <span className="px-2 text-sm">
              Page {pagination.pageIndex + 1} / {pageCount}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPagination((p) => ({ ...p, pageIndex: p.pageIndex + 1 }))
              }
              disabled={pagination.pageIndex + 1 >= pageCount || isFetching}
            >
              Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPagination((p) => ({ ...p, pageIndex: pageCount - 1 }))
              }
              disabled={pagination.pageIndex + 1 >= pageCount || isFetching}
            >
              ⏭
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>
                    {h.isPlaceholder
                      ? null
                      : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              // quick loading skeleton
              <>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(clientColumns.length)].map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={clientColumns.length}
                  className="text-red-600"
                >
                  {(error as Error).message || "Failed to load clients."}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={clientColumns.length}
                  className="text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
