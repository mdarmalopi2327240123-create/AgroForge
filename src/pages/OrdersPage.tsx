import { useState } from 'react';
import { Order as Pesanan, OrderStatus as PesananStatus } from '../types';
import { MOCK_ORDERS } from '../data/products';

interface PesanansPageProps {
  newOrder?: Pesanan | null;
}

const ORDER_STEPS: { status: PesananStatus; label: string; icon: string }[] = [
  { status: 'processing', label: 'Pesanan Placed', icon: '📋' },
  { status: 'confirmed', label: 'Confirmed', icon: '✅' },
  { status: 'shipped', label: 'Shipped', icon: '📦' },
  { status: 'out_for_delivery', label: 'Out for Delivery', icon: '🚚' },
  { status: 'delivered', label: 'Delivered', icon: '🏠' },
];

const STATUS_ORDER: PesananStatus[] = ['processing', 'confirmed', 'shipped', 'out_for_delivery', 'delivered'];

const statusBadge: Record<PesananStatus, { label: string; bg: string; text: string }> = {
  processing: { label: 'Diproses', bg: 'bg-info/10', text: 'text-info' },
  confirmed: { label: 'Confirmed', bg: 'bg-primary/10', text: 'text-primary' },
  shipped: { label: 'Shipped', bg: 'bg-warning-bg', text: 'text-warning' },
  out_for_delivery: { label: 'Out for Delivery', bg: 'bg-accent/10', text: 'text-accent' },
  delivered: { label: 'Delivered', bg: 'bg-success-bg', text: 'text-success' },
};

function PesananTimeline({ status }: { status: PesananStatus }) {
  const currentIdx = STATUS_ORDER.indexOf(status);

  return (
    <div className="flex items-start gap-0">
      {ORDER_STEPS.map((step, i) => {
        const isDone = i <= currentIdx;
        const isCurrent = i === currentIdx;

        return (
          <div key={step.status} className="flex-1 flex flex-col items-center">
            <div className="relative flex items-center w-full">
              {i > 0 && (
                <div className={`flex-1 h-0.5 ${i <= currentIdx ? 'bg-primary' : 'bg-border'}`} />
              )}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 border-2 transition-all ${
                isDone ? 'bg-primary border-primary' : 'bg-card border-border'
              } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}>
                {isDone ? (
                  i === currentIdx ? (
                    <span className="text-white text-sm">{step.icon}</span>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  )
                ) : (
                  <span className="text-muted-foreground text-xs">{i + 1}</span>
                )}
              </div>
              {i < ORDER_STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 ${i < currentIdx ? 'bg-primary' : 'bg-border'}`} />
              )}
            </div>
            <p className={`text-[10px] font-medium mt-1.5 text-center leading-tight max-w-[60px] ${isDone ? 'text-primary' : 'text-muted-foreground'}`}>
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default function PesanansPage({ newOrder }: PesanansPageProps) {
  const allPesanans = newOrder ? [newOrder, ...MOCK_ORDERS] : MOCK_ORDERS;
  const [selectedPesananId, setSelectedPesananId] = useState<string | null>(newOrder?.orderId || allPesanans[0]?.orderId || null);

  const selectedPesanan = allPesanans.find(o => o.orderId === selectedPesananId);

  const formatPrice = (n: number) => `$${n.toLocaleString()}`;
  const formatTanggal = (d: string) => new Tanggal(d).toLocaleTanggalString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6">
        <div className="mb-6 animate-fade-in">
          <h1 className="font-display text-2xl lg:text-3xl font-semibold text-foreground">My Pesanans</h1>
          <p className="text-muted-foreground text-sm mt-1">{allPesanans.length} order{allPesanans.length !== 1 ? 's' : ''} · all time</p>
        </div>

        {/* New order confirmation banner */}
        {newOrder && (
          <div className="mb-6 bg-success-bg border border-success/20 rounded-2xl p-4 flex items-start gap-3 animate-bounce-in">
            <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center shrink-0 text-white text-xl">✅</div>
            <div>
              <p className="font-semibold text-foreground">Pesanan placed successfully!</p>
              <p className="text-sm text-muted-foreground">Pesanan <span className="font-mono font-medium">{newOrder.orderId}</span> has been confirmed. Estimated delivery: {formatTanggal(newOrder.estimatedDelivery)}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-5 animate-fade-up">
          {/* Pesanan list */}
          <div className="flex flex-col gap-3">
            {allPesanans.map(order => {
              const badge = statusBadge[order.orderStatus];
              const isSelected = selectedPesananId === order.orderId;
              return (
                <button
                  key={order.orderId}
                  onClick={() => setSelectedPesananId(order.orderId)}
                  className={`text-left bg-card border-2 rounded-xl p-4 transition-all ${
                    isSelected ? 'border-primary shadow-md' : 'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-mono text-xs font-medium text-muted-foreground">{order.orderId}</p>
                      <p className="font-semibold text-sm text-foreground mt-0.5">{formatTanggal(order.orderDate)}</p>
                    </div>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${badge.bg} ${badge.text} whitespace-nowrap`}>
                      {badge.label}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                    <p className="font-mono font-bold text-sm">{formatPrice(order.totalAmount)}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pesanan detail */}
          {selectedPesanan && (
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-border">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Pesanan ID</p>
                    <p className="font-mono font-bold text-lg text-foreground mt-0.5">{selectedPesanan.orderId}</p>
                    <p className="text-sm text-muted-foreground">Placed {formatTanggal(selectedPesanan.orderDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Pesanan Total</p>
                    <p className="font-mono font-bold text-xl text-foreground">{formatPrice(selectedPesanan.totalAmount)}</p>
                    <p className="text-xs text-muted-foreground">{selectedPesanan.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Pengiriman timeline */}
              <div className="p-5 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-base text-foreground">Pengiriman Status</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                    Est. delivery: <strong className="text-foreground">{formatTanggal(selectedPesanan.estimatedDelivery)}</strong>
                  </div>
                </div>
                <PesananTimeline status={selectedPesanan.orderStatus} />

                {selectedPesanan.trackingNumber && (
                  <div className="mt-4 flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    <span className="text-xs text-muted-foreground">Tracking:</span>
                    <span className="font-mono text-xs font-semibold text-foreground">{selectedPesanan.trackingNumber}</span>
                    <button className="ml-auto text-xs text-primary font-medium hover:underline">Track →</button>
                  </div>
                )}
              </div>

              {/* Item */}
              <div className="p-5 border-b border-border">
                <h3 className="font-display font-semibold text-base text-foreground mb-3">Item Pesananed</h3>
                <div className="space-y-3">
                  {selectedPesanan.items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <img src={product.imageUrl} alt={product.productTitle} className="w-14 h-14 object-cover rounded-xl bg-muted" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                        <p className="text-sm font-semibold text-foreground line-clamp-1">{product.productTitle}</p>
                        <p className="font-mono text-xs text-muted-foreground">Qty: {quantity} × {formatPrice(product.itemPrice)}</p>
                      </div>
                      <span className="font-mono font-bold text-sm">{formatPrice(product.itemPrice * quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery address */}
              <div className="p-5">
                <h3 className="font-display font-semibold text-base text-foreground mb-3">Delivery Address</h3>
                <div className="bg-muted/50 rounded-xl p-4 text-sm">
                  <p className="font-semibold text-foreground">{selectedPesanan.shippingAddress.fullName}</p>
                  <p className="text-muted-foreground">{selectedPesanan.shippingAddress.addressLine1}</p>
                  <p className="text-muted-foreground">{selectedPesanan.shippingAddress.city}, {selectedPesanan.shippingAddress.state} {selectedPesanan.shippingAddress.zipCode}</p>
                  <p className="text-muted-foreground mt-1">{selectedPesanan.shippingAddress.phone}</p>
                </div>

                {selectedPesanan.orderStatus !== 'delivered' && (
                  <button className="mt-4 w-full border border-error text-error py-2.5 rounded-xl text-sm font-medium hover:bg-error-bg transition-colors">
                    Request Cancellation
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
