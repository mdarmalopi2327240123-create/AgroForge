import { useState } from 'react';
import { FilterState } from '../types';
import { CATEGORIES, BRANDS } from '../data/products';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClose?: () => void;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
      >
        {title}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({ filters, onChange, onClose }: FilterSidebarProps) {
  const resetFilters = () => {
    onChange({
      category: 'All Categories',
      brands: [],
      priceMin: '',
      priceMax: '',
      stockOnly: false,
      minRating: 0,
    });
  };

  const hasActiveFilters =
    filters.category !== 'All Categories' ||
    filters.brands.length > 0 ||
    filters.priceMin !== '' ||
    filters.priceMax !== '' ||
    filters.stockOnly ||
    filters.minRating > 0;

  const toggleBrand = (brand: string) => {
    const brands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands });
  };

  return (
    <aside className="bg-card border border-border rounded-xl p-4 flex flex-col gap-4 h-fit sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-display font-semibold text-base text-foreground">Filters</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button onClick={resetFilters} className="text-xs text-accent hover:underline font-medium">
              Reset all
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-muted">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          )}
        </div>
      </div>

      {/* Category */}
      <Section title="Category">
        <div className="flex flex-col gap-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => onChange({ ...filters, category: cat })}
              className={`text-left text-sm px-2.5 py-1.5 rounded-lg transition-colors ${
                filters.category === cat
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Section>

      {/* Brand */}
      <Section title="Brand">
        <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
          {BRANDS.map(brand => (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                  filters.brands.includes(brand)
                    ? 'bg-primary border-primary'
                    : 'border-border group-hover:border-primary'
                }`}
                onClick={() => toggleBrand(brand)}
              >
                {filters.brands.includes(brand) && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                )}
              </div>
              <span className="text-sm text-foreground">{brand}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Price range */}
      <Section title="Price Range">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={e => onChange({ ...filters, priceMin: e.target.value })}
              className="w-full pl-6 pr-2 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <span className="text-muted-foreground text-sm">–</span>
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={e => onChange({ ...filters, priceMax: e.target.value })}
              className="w-full pl-6 pr-2 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>
      </Section>

      {/* Availability */}
      <Section title="Availability">
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            className={`relative w-9 h-5 rounded-full transition-colors ${filters.stockOnly ? 'bg-primary' : 'bg-muted'}`}
            onClick={() => onChange({ ...filters, stockOnly: !filters.stockOnly })}
          >
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${filters.stockOnly ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </div>
          <span className="text-sm text-foreground">In-stock only</span>
        </label>
      </Section>

      {/* Rating */}
      <Section title="Minimum Rating">
        <div className="flex flex-col gap-1">
          {[4, 3, 2, 0].map(rating => (
            <button
              key={rating}
              onClick={() => onChange({ ...filters, minRating: rating })}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                filters.minRating === rating ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'
              }`}
            >
              {rating > 0 ? (
                <>
                  <div className="flex">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= rating ? '#D97706' : 'none'} stroke={s <= rating ? '#D97706' : '#D4CCBA'} strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  & up
                </>
              ) : (
                'Any rating'
              )}
            </button>
          ))}
        </div>
      </Section>
    </aside>
  );
}
