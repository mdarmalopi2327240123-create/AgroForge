import { useState } from 'react';
import { Page, User } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface TopNavProps {
  user: User;
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (page: Page) => void;
  currentPage: Page;
  onLogout: () => void;
}

export default function TopNav({ user, cartCount, onCartClick, onNavigate, currentPage, onLogout }: TopNavProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const navLinks: { label: string; page: Page }[] = user.role === 'admin'
    ? [{ label: 'Dasbor', page: 'admin' }, { label: 'Pasar', page: 'marketplace' }]
    : [{ label: 'Pasar', page: 'marketplace' }, { label: 'Pesanan Saya', page: 'orders' }];


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-16 flex items-center px-4 lg:px-6 gap-4 shadow-sm">
      {/* Logo */}
      <button
        onClick={() => onNavigate(user.role === 'admin' ? 'admin' : 'marketplace')}
        className="flex items-center gap-2 shrink-0"
      >
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12" />
            <path d="M12 6v6l4 2" />
            <path d="M2 12c0-2.76 1.12-5.26 2.93-7.07" />
            <circle cx="12" cy="12" r="2" />
            <path d="M8 8c.5-1.5 2-3 4-3" />
          </svg>
        </div>
        <span className="font-display font-semibold text-lg text-primary hidden sm:block">AgroForge</span>
      </button>

      {/* Desktop nav links */}
      <div className="hidden lg:flex items-center gap-1 ml-2">
        {navLinks.map(({ label, page }) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex-1 max-w-lg mx-auto hidden md:block">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Cari mesin, alat, perlengkapan…"
            className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Cart */}
        <button
          onClick={onCartClick}
          className="relative p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
          aria-label="Buka keranjang"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px] h-[18px] px-0.5">
              {cartCount}
            </span>
          )}
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(v => !v)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:block text-sm font-medium text-foreground max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground hidden sm:block">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <AnimatePresence>
          {isUserMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-xl shadow-lg py-1 z-50"
            >
              <div className="px-3 py-2 border-b border-border">
                <p className="text-sm font-semibold text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
                <span className={`inline-flex mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${user.role === 'admin' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`}>
                  {user.role}
                </span>
              </div>
              {user.role === 'buyer' && (
                <button onClick={() => { onNavigate('orders'); setIsUserMenuOpen(false); }} className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                  Pesanan Saya
                </button>
              )}
              {user.role === 'admin' && (
                <button onClick={() => { onNavigate('admin'); setIsUserMenuOpen(false); }} className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                  Dasbor Admin
                </button>
              )}
              <div className="border-t border-border mt-1">
                <button onClick={() => { onLogout(); setIsUserMenuOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-error hover:bg-error-bg/30 transition-colors flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                  Keluar
                </button>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
