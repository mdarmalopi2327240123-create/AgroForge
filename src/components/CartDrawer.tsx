import { CartItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (productId: string) => void;
  onUpdateQty: (productId: string, quantity: number) => void;
  total: number;
  onCheckout: () => void;
}

export default function CartDrawer({ isOpen, onClose, items, onRemove, onUpdateQty, total, onCheckout }: CartDrawerProps) {
  const formatPrice = (n: number) => `$${n.toLocaleString()}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-sm bg-card h-full flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <h2 className="font-display font-semibold text-lg text-foreground">Keranjang Anda</h2>
                <p className="text-sm text-muted-foreground">
                  {items.length} {items.length === 1 ? 'barang' : 'barang'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
                      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground">Keranjang Anda kosong</p>
                    <p className="text-sm text-muted-foreground mt-1">Tambahkan peralatan untuk mulai</p>
                  </div>
                  <button onClick={onClose} className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors">
                    Lihat Marketplace
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map(({ product, quantity }) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                      className="flex gap-3 bg-background rounded-xl p-3 border border-border"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.productTitle}
                        className="w-16 h-16 object-cover rounded-lg bg-muted shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground font-medium">{product.brand}</p>
                        <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2 mt-0.5">{product.productTitle}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-mono text-sm font-semibold text-foreground">
                            ${(product.itemPrice * quantity).toLocaleString()}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => quantity > 1 ? onUpdateQty(product.id, quantity - 1) : onRemove(product.id)}
                              className="w-6 h-6 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground"
                            >
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                            </button>
                            <span className="font-mono text-sm w-5 text-center">{quantity}</span>
                            <button
                              onClick={() => onUpdateQty(product.id, quantity + 1)}
                              className="w-6 h-6 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground"
                            >
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemove(product.id)}
                        className="self-start p-1.5 rounded-lg hover:bg-error-bg transition-colors text-muted-foreground hover:text-error"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-border bg-card flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono font-semibold">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pengiriman</span>
                  <span className="text-success font-medium text-sm">Dihitung saat pembayaran</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-mono font-bold text-lg">{formatPrice(total)}</span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-lg active:scale-98"
                >
                  Lanjut ke Pembayaran →
                </button>
                <button onClick={onClose} className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Lanjut Belanja
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
