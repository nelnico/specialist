// columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import type { ClientListItem } from "@repo/types";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { useDeleteClient } from "../hooks/use-client-data";

export const clientColumns: ColumnDef<ClientListItem>[] = [
  // ... your existing columns
  { accessorKey: "username", header: "Username" },
  { accessorKey: "membershipType", header: "Membership" },
  { accessorKey: "numberOfFavorites", header: "Favorites" },
  { accessorKey: "numberOfReviews", header: "Reviews" },
  {
    id: "actions",
    header: "",
    cell: function Cell({ row }) {
      const { mutate, isPending } = useDeleteClient();

      const onDelete = () => {
        // (optional) confirm dialog
        if (
          !confirm(`Delete client ${row.original.username ?? row.original.id}?`)
        )
          return;
        mutate(row.original.id);
      };

      return (
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          disabled={isPending}
        >
          {isPending ? "Deleting…" : "Delete"}
        </Button>
      );
    },
  },
];
