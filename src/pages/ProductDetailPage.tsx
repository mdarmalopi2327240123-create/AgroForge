import { useState } from 'react';
import { Product } from '../types';

interface ProductDetailPageProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBack: () => void;
}

const stockConfig = {
  in_stock: { label: 'In Stock', dot: 'bg-success', text: 'text-success', bg: 'bg-success-bg' },
  low_stock: { label: 'Low Stock', dot: 'bg-warning', text: 'text-warning', bg: 'bg-warning-bg' },
  out_of_stock: { label: 'Out of Stock', dot: 'bg-muted-foreground', text: 'text-muted-foreground', bg: 'bg-muted' },
};

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#D97706' : 'none'} stroke={i <= Math.round(rating) ? '#D97706' : '#D4CCBA'} strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      <span className="font-mono text-sm text-muted-foreground">{rating} out of 5 ({reviewCount} reviews)</span>
    </div>
  );
}

export default function ProductDetailPage({ product, onAddToCart, onBack }: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'shipping' | 'warranty'>('specs');
  const [addedFeedback, setAddedFeedback] = useState(false);

  const { productTitle, productDescription, itemPrice, originalPrice, brand, stockStatus, rating, reviewCount, imageUrl, specs, tags, sku } = product;
  const stock = stockConfig[stockStatus];
  const isDisabled = stockStatus === 'out_of_stock';
  const discount = originalPrice ? Math.round((1 - itemPrice / originalPrice) * 100) : null;

  const handleAddToCart = () => {
    if (isDisabled) return;
    onAddToCart(product, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2500);
  };

  const formatPrice = (n: number) => `$${n.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-in">
          <button onClick={onBack} className="hover:text-primary transition-colors flex items-center gap-1.5 font-medium">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            Marketplace
          </button>
          <span>/</span>
          <span className="text-muted-foreground">{product.category}</span>
          <span>/</span>
          <span className="text-foreground font-medium line-clamp-1 max-w-xs">{productTitle}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 animate-fade-up">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-muted rounded-2xl overflow-hidden relative">
              <img src={imageUrl} alt={productTitle} className="w-full h-full object-cover" />
              {discount && (
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                  −{discount}%
                </span>
              )}
            </div>
            {/* Thumbnail row */}
            <div className="flex gap-3">
              {[imageUrl].map((src, i) => (
                <button key={i} className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === 0 ? 'border-primary' : 'border-transparent hover:border-border'}`}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-muted px-2.5 py-1 rounded-full">{brand}</span>
                {tags.map(tag => (
                  <span key={tag} className="text-xs text-muted-foreground"># {tag}</span>
                ))}
              </div>
              <h1 className="font-display text-2xl lg:text-3xl font-semibold text-foreground mt-2 leading-snug">{productTitle}</h1>
              <p className="font-mono text-xs text-muted-foreground mt-1">SKU: {sku}</p>
            </div>

            <StarRating rating={rating} reviewCount={reviewCount} />

            {/* Stock */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit ${stock.bg}`}>
              <span className={`w-2 h-2 rounded-full ${stock.dot}`} style={stockStatus === 'in_stock' ? { boxShadow: '0 0 6px #16A34A' } : {}} />
              <span className={`text-sm font-semibold ${stock.text}`}>{stock.label}</span>
              {product.stockQuantity > 0 && product.stockQuantity <= 5 && (
                <span className="text-xs text-muted-foreground">— only {product.stockQuantity} left</span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-3xl font-bold text-foreground">{formatPrice(itemPrice)}</span>
              {originalPrice && (
                <span className="font-mono text-lg text-muted-foreground line-through">{formatPrice(originalPrice)}</span>
              )}
              {discount && (
                <span className="text-sm font-semibold text-success">Save {formatPrice(originalPrice! - itemPrice)}</span>
              )}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{productDescription}</p>

            {/* Quantity + CTA */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-2.5 hover:bg-muted transition-colors text-foreground"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                </button>
                <span className="font-mono text-base font-semibold w-10 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  disabled={isDisabled}
                  className="px-3 py-2.5 hover:bg-muted transition-colors text-foreground"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isDisabled}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                  addedFeedback
                    ? 'bg-success text-white'
                    : isDisabled
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-accent hover:bg-accent/90 text-white hover:shadow-lg active:scale-[0.98]'
                }`}
              >
                {addedFeedback ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                    {isDisabled ? 'Currently Unavailable' : `Add ${quantity > 1 ? `${quantity} ×` : ''} to Cart`}
                  </>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 py-4 border-t border-b border-border">
              {[
                { icon: '🛡️', label: 'Verified Supplier' },
                { icon: '🚚', label: 'Free Freight' },
                { icon: '↩️', label: '30-Day Returns' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <span className="text-xl">{icon}</span>
                  <span className="text-xs text-muted-foreground font-medium">{label}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div>
              <div className="flex border-b border-border">
                {(['specs', 'shipping', 'warranty'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 text-sm font-medium capitalize transition-all border-b-2 -mb-px ${
                      activeTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="pt-4">
                {activeTab === 'specs' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.entries(specs).map(([key, value]) => (
                      <div key={key} className="flex items-start gap-2 bg-muted/50 rounded-lg px-3 py-2.5">
                        <span className="text-xs font-semibold text-muted-foreground shrink-0 min-w-[90px]">{key}</span>
                        <span className="text-xs text-foreground font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-3 bg-muted/50 rounded-lg p-3">
                      <span className="text-lg">🚚</span>
                      <div>
                        <p className="font-semibold text-foreground">Freight shipping included</p>
                        <p>Large machinery items are delivered via specialized flatbed freight. Estimated 5–14 business days depending on location.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-muted/50 rounded-lg p-3">
                      <span className="text-lg">📍</span>
                      <div>
                        <p className="font-semibold text-foreground">Curbside delivery</p>
                        <p>Standard delivery is to your driveway or farm gate. Site delivery and crane unloading available on request.</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'warranty' && (
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-3 bg-muted/50 rounded-lg p-3">
                      <span className="text-lg">🛡️</span>
                      <div>
                        <p className="font-semibold text-foreground">Manufacturer warranty</p>
                        <p>All products sold on AgroForge carry full manufacturer warranty. Duration varies by brand — typically 1–3 years for machinery.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-muted/50 rounded-lg p-3">
                      <span className="text-lg">↩️</span>
                      <div>
                        <p className="font-semibold text-foreground">30-day return policy</p>
                        <p>Return unused equipment in original condition within 30 days for a full refund. Return freight charges apply for large items.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
