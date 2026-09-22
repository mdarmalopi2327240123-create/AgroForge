export default function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
      {/* Image skeleton */}
      <div className="aspect-[4/3] shimmer-bg" />

      {/* Content skeleton */}
      <div className="p-3.5 flex flex-col gap-3">
        <div>
          <div className="shimmer-bg h-2.5 w-16 rounded-full" />
          <div className="shimmer-bg h-4 w-full rounded mt-2" />
          <div className="shimmer-bg h-4 w-3/4 rounded mt-1" />
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="shimmer-bg w-3 h-3 rounded-sm" />
          ))}
          <div className="shimmer-bg h-3 w-12 rounded-full ml-1" />
        </div>
        <div className="shimmer-bg h-5 w-24 rounded-full" />
        <div className="flex items-end justify-between mt-2">
          <div>
            <div className="shimmer-bg h-5 w-20 rounded" />
            <div className="shimmer-bg h-3 w-14 rounded mt-1" />
          </div>
          <div className="shimmer-bg h-8 w-16 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
