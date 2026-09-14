export function BookSkeleton() {
  return (
    <div className="card-frame overflow-hidden" aria-hidden="true">
      <div className="skeleton aspect-cover" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-7 w-3/4" />
        <div className="skeleton h-16 w-full" />
      </div>
    </div>
  );
}

export function BookGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading books">
      {Array.from({ length: count }).map((_, i) => (
        <BookSkeleton key={i} />
      ))}
    </div>
  );
}
