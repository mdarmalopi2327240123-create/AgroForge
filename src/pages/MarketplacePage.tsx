import { useState, useEffect, useMemo } from 'react';
import { Product, FilterState } from '../types';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import FilterSidebar from '../components/FilterSidebar';
import CategoryChips from '../components/CategoryChips';
import EmptyState from '../components/EmptyState';
import ErrorModal from '../components/ErrorModal';

interface MarketplacePageProps {
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name A–Z' },
];

const DEFAULT_FILTERS: FilterState = {
  category: 'All Categories',
  brands: [],
  priceMin: '',
  priceMax: '',
  stockOnly: false,
  minRating: 0,
};

export default function MarketplacePage({ onViewProduct, onAddToCart }: MarketplacePageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Simulate API fetch
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Simulate occasional API error (remove for stable demo)
      // if (Math.random() < 0.1) { setShowError(true); setIsLoading(false); return; }
      setProducts(PRODUCTS);
      setIsLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category !== 'All Categories') {
      result = result.filter(p => p.category === filters.category);
    }
    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }
    if (filters.priceMin) {
      result = result.filter(p => p.itemPrice >= Number(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter(p => p.itemPrice <= Number(filters.priceMax));
    }
    if (filters.stockOnly) {
      result = result.filter(p => p.stockStatus !== 'out_of_stock');
    }
    if (filters.minRating > 0) {
      result = result.filter(p => p.rating >= filters.minRating);
    }

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.itemPrice - b.itemPrice); break;
      case 'price-desc': result.sort((a, b) => b.itemPrice - a.itemPrice); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'name': result.sort((a, b) => a.productTitle.localeCompare(b.productTitle)); break;
      default: result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, filters, sortBy]);

  const hasActiveFilters = JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero banner */}
      <div className="bg-primary/5 border-b border-border px-4 lg:px-8 py-5">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-semibold text-foreground">
              Agricultural Marketplace
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {isLoading ? 'Loading inventory…' : `${filteredProducts.length} products from verified suppliers`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="12" y1="18" x2="12" y2="18" /></svg>
              Filters
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-accent" />}
            </button>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile category chips */}
      <div className="lg:hidden px-4 pt-4">
        <CategoryChips
          selected={filters.category}
          onSelect={cat => setFilters(f => ({ ...f, category: cat }))}
        />
      </div>

      {/* Main layout */}
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <FilterSidebar filters={filters} onChange={setFilters} />
          </div>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filteredProducts.length === 0 ? (
              <EmptyState
                title="No products found"
                description="Try adjusting your filters or search in a different category to find what you're looking for."
                onReset={() => setFilters(DEFAULT_FILTERS)}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onView={onViewProduct}
                    onAddToCart={onAddToCart}
                    style={{ animationDelay: `${i * 60}ms`, opacity: 0 }}
                  />
                ))}
              </div>
            )}

            {/* Active filter tags */}
            {hasActiveFilters && !isLoading && (
              <div className="flex flex-wrap gap-2 mt-4">
                {filters.category !== 'All Categories' && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    {filters.category}
                    <button onClick={() => setFilters(f => ({ ...f, category: 'All Categories' }))}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                  </span>
                )}
                {filters.brands.map(b => (
                  <span key={b} className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    {b}
                    <button onClick={() => setFilters(f => ({ ...f, brands: f.brands.filter(x => x !== b) }))}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                  </span>
                ))}
                {filters.stockOnly && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    In-stock only
                    <button onClick={() => setFilters(f => ({ ...f, stockOnly: false }))}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
          <div className="relative mt-auto w-full max-h-[85vh] overflow-y-auto bg-card rounded-t-2xl p-4 animate-slide-up-modal">
            <FilterSidebar filters={filters} onChange={setFilters} onClose={() => setShowMobileFilters(false)} />
            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full mt-4 bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm"
            >
              Show {filteredProducts.length} results
            </button>
          </div>
        </div>
      )}

      <ErrorModal
        isOpen={showError}
        title="Failed to load products"
        message="We couldn't fetch the product catalog from the server. Please check your connection and try again."
        onRetry={() => { setShowError(false); setIsLoading(true); setTimeout(() => { setProducts(PRODUCTS); setIsLoading(false); }, 1200); }}
        onDismiss={() => setShowError(false)}
      />
    </div>
  );
}
