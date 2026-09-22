import { Page } from '../types';

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
}

const navItems = [
  {
    page: 'marketplace' as Page,
    label: 'Market',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    page: 'orders' as Page,
    label: 'Orders',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
];

export default function BottomNav({ currentPage, onNavigate, cartCount }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card border-t border-border h-16 flex items-center justify-around px-2 safe-area-pb">
      {navItems.map(({ page, label, icon }) => {
        const isActive = currentPage === page;
        return (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-xl transition-all duration-200 ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>{icon}</span>
            <span className="text-[10px] font-medium">{label}</span>
            {isActive && <span className="w-1 h-1 rounded-full bg-primary" />}
          </button>
        );
      })}

      {/* Cart */}
      <button
        onClick={() => {}}
        className="flex flex-col items-center gap-0.5 px-5 py-1.5 rounded-xl text-muted-foreground relative transition-all duration-200"
      >
        <span className="relative">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </span>
        <span className="text-[10px] font-medium">Cart</span>
      </button>
    </nav>
  );
}
