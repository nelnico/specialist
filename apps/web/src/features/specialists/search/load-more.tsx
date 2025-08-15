// apps/web/src/features/specialists/LoadMore.tsx
"use client";

import { useEffect, useRef } from "react";
import { useSpecialistSearch } from "./specialist-search-provider";

export default function LoadMore() {
  const { hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSpecialistSearch();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (!hasNextPage || isFetchingNextPage) return;

    const el = ref.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) fetchNextPage();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return <div ref={ref} style={{ height: 1 }} />;
}
