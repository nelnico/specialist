"use client";

import { Button } from "@/components/ui/button";
import LoadMore from "@/features/specialists/search/load-more";
import {
  SpecialistSearchProvider,
  useSpecialistSearch,
} from "@/features/specialists/search/specialist-search-provider";

function SpecialistList() {
  const { specialists, isLoading, isFetchingNextPage } = useSpecialistSearch();
  if (isLoading && specialists.length === 0) return <div>Loading…</div>;

  return (
    <>
      <ul>
        {specialists.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
      <LoadMore />
      {isFetchingNextPage && <div>Loading more…</div>}
    </>
  );
}

export default function Home() {
  return (
    <SpecialistSearchProvider>
      <Button>ShadCN Button Test</Button>
      <SpecialistList />
    </SpecialistSearchProvider>
  );
}
