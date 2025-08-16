// lib/api/clients.ts
import { API_BASE } from "@/lib/config/config";
import { ClientListItem, PaginatedResult } from "@repo/types";

export const clientsKeys = {
  all: ["admin-clients"] as const,
  list: (skip: number, take: number) =>
    [...clientsKeys.all, skip, take] as const,
};

type ClientListItemDTO = Omit<ClientListItem, "membershipEndDate"> & {
  membershipEndDate: string | null;
};
type ClientsResponseDTO = PaginatedResult<ClientListItemDTO>;

export async function fetchClients(
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
  return {
    data: json.data.map((c) => ({
      ...c,
      membershipEndDate: c.membershipEndDate
        ? new Date(c.membershipEndDate)
        : null,
    })),
    pagination: json.pagination,
  };
}

export async function deleteClient(id: number): Promise<void> {
  const url = `${API_BASE}/admin/client/${id}`;
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Delete failed with ${res.status}`);
  }
}
