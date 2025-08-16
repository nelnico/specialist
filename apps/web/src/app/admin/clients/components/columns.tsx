"use client";

import { ClientListItem } from "@repo/types";
import { type ColumnDef } from "@tanstack/react-table";
function formatDate(date: Date | null) {
  if (!date) return "—";
  try {
    return new Date(date).toLocaleDateString();
  } catch {
    return "—";
  }
}

export const clientColumns: ColumnDef<ClientListItem>[] = [
  {
    header: "Username",
    accessorKey: "username",
    cell: ({ getValue }) => getValue<string | null>() ?? "—",
  },
  {
    header: "Membership",
    accessorKey: "membershipType",
    cell: ({ getValue }) => getValue<string | null>() ?? "—",
  },
  {
    header: "Membership Ends",
    accessorKey: "membershipEndDate",
    cell: ({ row }) => formatDate(row.original.membershipEndDate),
  },
  {
    header: "Favorites",
    accessorKey: "numberOfFavorites",
  },
  {
    header: "Reviews",
    accessorKey: "numberOfReviews",
  },
];
