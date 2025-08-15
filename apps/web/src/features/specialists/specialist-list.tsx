"use client";

import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpecialistSearch } from "./specialist-search-provider";
import SpecialistCard from "./specialist-card";
import { DEFAULT_PAGE_SIZE } from "@/lib/config";

export default function SpecialistList() {
  const {
    specialists = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useSpecialistSearch();

  const { ref, inView } = useInView({ threshold: 0.5 });
  const fetchingRef = useRef(false);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !fetchingRef.current) {
      fetchingRef.current = true;
      (async () => {
        try {
          await fetchNextPage?.();
        } finally {
          setTimeout(() => {
            fetchingRef.current = false;
          }, 500);
        }
      })();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoading && specialists.length === 0) {
    return <GridSkeleton count={DEFAULT_PAGE_SIZE} />;
  }

  if (error) {
    return (
      <div className="mt-4">
        <Alert variant="destructive">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            We could not load specialists. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!isLoading && specialists.length === 0) {
    return <EmptyState />;
  }

  const triggerIndex = Math.floor(specialists.length * 0.75);

  return (
    <div className="mt-2">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-5">
        {specialists.map((specialist, index) => (
          <div
            key={specialist.id}
            ref={hasNextPage && index === triggerIndex ? ref : undefined}
          >
            <SpecialistCard specialist={specialist} />
          </div>
        ))}
      </div>

      {isFetchingNextPage && hasNextPage && (
        <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading more…
        </div>
      )}

      {/* Accessible fallback button in case IntersectionObserver fails */}
      {hasNextPage && !isFetchingNextPage && (
        <div className="flex justify-center py-6">
          <Button onClick={() => fetchNextPage?.()}>
            Load more {hasNextPage ? "Yes" : "No"}
          </Button>
        </div>
      )}
    </div>
  );
}

function GridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <CardContent className="space-y-2 p-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-lg font-medium">No specialists found</div>
      <div className="mt-1 max-w-md text-sm text-muted-foreground">
        Try adjusting your filters or search terms.
      </div>
    </div>
  );
}
