import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  style?: React.CSSProperties;
}

const stockConfig = {
  in_stock: { label: 'In Stock', dot: 'bg-success', text: 'text-success', bg: 'bg-success-bg' },
  low_stock: { label: 'Low Stock', dot: 'bg-warning', text: 'text-warning', bg: 'bg-warning-bg' },
  out_of_stock: { label: 'Out of Stock', dot: 'bg-muted-foreground', text: 'text-muted-foreground', bg: 'bg-muted' },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#D97706' : 'none'} stroke={i <= Math.round(rating) ? '#D97706' : '#D4CCBA'} strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product, onView, onAddToCart, style }: ProductCardProps) {
  const { productTitle, itemPrice, originalPrice, brand, stockStatus, rating, reviewCount, imageUrl, isFeatured } = product;
  const stock = stockConfig[stockStatus];
  const isDisabled = stockStatus === 'out_of_stock';
  const discount = originalPrice ? Math.round((1 - itemPrice / originalPrice) * 100) : null;

  const formatPrice = (n: number) =>
    n >= 1000 ? `$${n.toLocaleString()}` : `$${n.toLocaleString()}`;

  return (
    <article
      style={style}
      className={`group bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 flex flex-col animate-fade-up ${isDisabled ? 'opacity-70' : ''}`}
    >
      {/* Image container */}
      <div className="relative overflow-hidden bg-muted aspect-[4/3]" onClick={() => onView(product)}>
        <img
          src={imageUrl}
          alt={productTitle}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer ${isDisabled ? 'grayscale' : ''}`}
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {isFeatured && (
            <span className="bg-accent text-white text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">Featured</span>
          )}
          {discount && !isDisabled && (
            <span className="bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">−{discount}%</span>
          )}
        </div>
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onView(product)}
            className="bg-card text-foreground text-sm font-medium px-4 py-2 rounded-lg shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{brand}</p>
            <h3
              className="font-display font-semibold text-foreground text-sm leading-snug mt-0.5 cursor-pointer hover:text-primary transition-colors line-clamp-2"
              onClick={() => onView(product)}
            >
              {productTitle}
            </h3>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <StarRating rating={rating} />
          <span className="font-mono text-[11px] text-muted-foreground">{rating} ({reviewCount})</span>
        </div>

        {/* Stock indicator */}
        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full w-fit ${stock.bg}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${stock.dot} ${stockStatus === 'in_stock' ? 'shadow-[0_0_4px_currentColor]' : ''}`} style={stockStatus === 'in_stock' ? { boxShadow: '0 0 6px #16A34A' } : {}} />
          <span className={`text-[11px] font-semibold ${stock.text}`}>{stock.label}</span>
          {product.stockQuantity > 0 && product.stockQuantity <= 5 && (
            <span className="text-[10px] text-muted-foreground">({product.stockQuantity} left)</span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-end justify-between mt-auto pt-1">
          <div>
            <p className="font-mono font-semibold text-foreground text-base">{formatPrice(itemPrice)}</p>
            {originalPrice && (
              <p className="font-mono text-[11px] text-muted-foreground line-through">{formatPrice(originalPrice)}</p>
            )}
          </div>
          <button
            disabled={isDisabled}
            onClick={() => !isDisabled && onAddToCart(product)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              isDisabled
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-accent hover:bg-accent/90 text-white active:scale-95 hover:shadow-md'
            }`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {isDisabled ? 'Unavailable' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
}
