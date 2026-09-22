interface ErrorModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onRetry?: () => void;
  onDismiss: () => void;
}

export default function ErrorModal({ isOpen, title = 'Something went wrong', message, onRetry, onDismiss }: ErrorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-fade-in" onClick={onDismiss} />
      <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col items-center text-center gap-4 animate-slide-up-modal">
        {/* Error icon */}
        <div className="w-14 h-14 rounded-full bg-error-bg flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-error" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{message}</p>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={onDismiss}
            className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Dismiss
          </button>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
