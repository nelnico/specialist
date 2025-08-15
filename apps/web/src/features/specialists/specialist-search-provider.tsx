// apps/web/src/features/specialists/SpecialistSearchProvider.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SpecialistListItem, SpecialistSearchResponse } from "@repo/types";
import {
  DefaultSpecialistSearchParams,
  SpecialistSearchForm,
} from "./specialist-search-schema";
import { omitEmptySearchValues } from "@/lib/helpers/empty-helpers";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "./specialist-query-keys";

interface SpecialistSearchProviderProps {
  children: React.ReactNode;
}

interface SpecialistSearchContextType {
  specialists: SpecialistListItem[];
  searchParams: SpecialistSearchForm;
  setSearchParams: (
    params:
      | SpecialistSearchForm
      | ((prev: SpecialistSearchForm) => SpecialistSearchForm)
  ) => void;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  refetch: () => void;
}

const LOCAL_STORAGE_KEY = "last-search";
const PAGE_SIZE = 60;
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const SpecialistSearchContext = createContext<
  SpecialistSearchContextType | undefined
>(undefined);

export const SpecialistSearchProvider: React.FC<
  SpecialistSearchProviderProps
> = ({ children }) => {
  const [searchParams, setSearchParams] = useState<SpecialistSearchForm>(
    DefaultSpecialistSearchParams
  );

  // Load initial params (client only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) setSearchParams(JSON.parse(stored));
    } catch {
      setSearchParams(DefaultSpecialistSearchParams);
    }
  }, []);

  // Persist params
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(searchParams));
    } catch {}
  }, [searchParams]);

  // API fetcher:
  const fetchSpecialists = async ({
    pageParam,
    signal,
  }: {
    pageParam: number; // we treat this as "skip"
    signal?: AbortSignal;
  }): Promise<SpecialistSearchResponse> => {
    const form = {
      ...searchParams,
      pageSize: searchParams.pageSize || PAGE_SIZE,
    };

    // Only send fields your API understands:
    const clean = omitEmptySearchValues(
      {
        orderBy: form.sortOption ?? "newest",
        skip: pageParam, // ← the offset (not page number)
        take: form.pageSize,
        query: form.query?.trim() || undefined,
        provinceId: form.provinceId,
      },
      {}
    );

    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(clean).map(([k, v]) => [k, String(v)]))
    );

    const res = await fetch(`${API_BASE}/specialists?${qs.toString()}`, {
      signal,
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Failed to fetch specialists (${res.status}): ${text}`);
    }

    return (await res.json()) as SpecialistSearchResponse;
  };

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: queryKeys.specialistSearch(searchParams),
    queryFn: fetchSpecialists,
    initialPageParam: 0, // ← start offset
    getNextPageParam: (lastPage) => {
      if (!lastPage?.pagination?.hasMore) return undefined;
      return lastPage.pagination.skip + lastPage.pagination.take; // next offset
    },
    // If you care about UX smoothness:
    staleTime: 5_000,
  });

  // Flatten pages → list
  const specialists = useMemo(
    () => (data?.pages ?? []).flatMap((p) => p.data),
    [data?.pages]
  );

  return (
    <SpecialistSearchContext.Provider
      value={{
        specialists,
        searchParams,
        setSearchParams,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        isFetching,
        error: (error as Error) ?? null,
        refetch,
      }}
    >
      {children}
    </SpecialistSearchContext.Provider>
  );
};

export const useSpecialistSearch = () => {
  const ctx = useContext(SpecialistSearchContext);
  if (!ctx)
    throw new Error(
      "useSpecialistSearch must be used within a SpecialistSearchProvider"
    );
  return ctx;
};
