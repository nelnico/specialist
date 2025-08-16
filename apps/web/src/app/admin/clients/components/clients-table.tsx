// ClientsTable.tsx
"use client";

import * as React from "react";
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
import { useClientsData } from "../hooks/use-client-data";

export default function ClientsTable() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const { data, isLoading, isFetching, error, skip, take } = useClientsData({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
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
    <div className="w-full space-y-3">
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
              <>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(table.getAllColumns().length)].map((__, j) => (
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
                  colSpan={table.getAllColumns().length}
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
                  colSpan={table.getAllColumns().length}
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
