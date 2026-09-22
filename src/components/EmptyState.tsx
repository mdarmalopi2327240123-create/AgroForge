interface EmptyStateProps {
  title: string;
  description: string;
  onReset?: () => void;
  resetLabel?: string;
}

export default function EmptyState({ title, description, onReset, resetLabel = 'Clear filters' }: EmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
      {/* Illustration */}
      <div className="relative w-24 h-24 mb-6">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none" className="text-muted-foreground">
            <circle cx="32" cy="28" r="16" stroke="currentColor" strokeWidth="2" />
            <path d="M24 28c0-4.4 3.6-8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 48l24 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M26 54l12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* Wheat stalks */}
            <path d="M8 16c0-3 2-5 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 12c-1-2 1-4 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M56 20c0-3-2-5-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M52 16c1-2-1-4-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
      </div>
      <h3 className="font-display font-semibold text-xl text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-xs leading-relaxed">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-6 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors"
        >
          {resetLabel}
        </button>
      )}
    </div>
  );
}
