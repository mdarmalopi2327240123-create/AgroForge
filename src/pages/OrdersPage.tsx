import { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { MOCK_ORDERS } from '../data/products';

interface OrdersPageProps {
  newOrder?: Order | null;
}

const ORDER_STEPS: { status: OrderStatus; label: string; icon: string }[] = [
  { status: 'processing', label: 'Order Placed', icon: '📋' },
  { status: 'confirmed', label: 'Confirmed', icon: '✅' },
  { status: 'shipped', label: 'Shipped', icon: '📦' },
  { status: 'out_for_delivery', label: 'Out for Delivery', icon: '🚚' },
  { status: 'delivered', label: 'Delivered', icon: '🏠' },
];

const STATUS_ORDER: OrderStatus[] = ['processing', 'confirmed', 'shipped', 'out_for_delivery', 'delivered'];

const statusBadge: Record<OrderStatus, { label: string; bg: string; text: string }> = {
  processing: { label: 'Processing', bg: 'bg-info/10', text: 'text-info' },
  confirmed: { label: 'Confirmed', bg: 'bg-primary/10', text: 'text-primary' },
  shipped: { label: 'Shipped', bg: 'bg-warning-bg', text: 'text-warning' },
  out_for_delivery: { label: 'Out for Delivery', bg: 'bg-accent/10', text: 'text-accent' },
  delivered: { label: 'Delivered', bg: 'bg-success-bg', text: 'text-success' },
};

function OrderTimeline({ status }: { status: OrderStatus }) {
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

export default function OrdersPage({ newOrder }: OrdersPageProps) {
  const allOrders = newOrder ? [newOrder, ...MOCK_ORDERS] : MOCK_ORDERS;
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(newOrder?.orderId || allOrders[0]?.orderId || null);

  const selectedOrder = allOrders.find(o => o.orderId === selectedOrderId);

  const formatPrice = (n: number) => `$${n.toLocaleString()}`;
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6">
        <div className="mb-6 animate-fade-in">
          <h1 className="font-display text-2xl lg:text-3xl font-semibold text-foreground">My Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">{allOrders.length} order{allOrders.length !== 1 ? 's' : ''} · all time</p>
        </div>

        {/* New order confirmation banner */}
        {newOrder && (
          <div className="mb-6 bg-success-bg border border-success/20 rounded-2xl p-4 flex items-start gap-3 animate-bounce-in">
            <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center shrink-0 text-white text-xl">✅</div>
            <div>
              <p className="font-semibold text-foreground">Order placed successfully!</p>
              <p className="text-sm text-muted-foreground">Order <span className="font-mono font-medium">{newOrder.orderId}</span> has been confirmed. Estimated delivery: {formatDate(newOrder.estimatedDelivery)}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-5 animate-fade-up">
          {/* Order list */}
          <div className="flex flex-col gap-3">
            {allOrders.map(order => {
              const badge = statusBadge[order.orderStatus];
              const isSelected = selectedOrderId === order.orderId;
              return (
                <button
                  key={order.orderId}
                  onClick={() => setSelectedOrderId(order.orderId)}
                  className={`text-left bg-card border-2 rounded-xl p-4 transition-all ${
                    isSelected ? 'border-primary shadow-md' : 'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-mono text-xs font-medium text-muted-foreground">{order.orderId}</p>
                      <p className="font-semibold text-sm text-foreground mt-0.5">{formatDate(order.orderDate)}</p>
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

          {/* Order detail */}
          {selectedOrder && (
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-border">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Order ID</p>
                    <p className="font-mono font-bold text-lg text-foreground mt-0.5">{selectedOrder.orderId}</p>
                    <p className="text-sm text-muted-foreground">Placed {formatDate(selectedOrder.orderDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Order Total</p>
                    <p className="font-mono font-bold text-xl text-foreground">{formatPrice(selectedOrder.totalAmount)}</p>
                    <p className="text-xs text-muted-foreground">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Shipping timeline */}
              <div className="p-5 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-base text-foreground">Shipping Status</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                    Est. delivery: <strong className="text-foreground">{formatDate(selectedOrder.estimatedDelivery)}</strong>
                  </div>
                </div>
                <OrderTimeline status={selectedOrder.orderStatus} />

                {selectedOrder.trackingNumber && (
                  <div className="mt-4 flex items-center gap-2 bg-muted rounded-lg px-3 py-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    <span className="text-xs text-muted-foreground">Tracking:</span>
                    <span className="font-mono text-xs font-semibold text-foreground">{selectedOrder.trackingNumber}</span>
                    <button className="ml-auto text-xs text-primary font-medium hover:underline">Track →</button>
                  </div>
                )}
              </div>

              {/* Items */}
              <div className="p-5 border-b border-border">
                <h3 className="font-display font-semibold text-base text-foreground mb-3">Items Ordered</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map(({ product, quantity }) => (
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
                  <p className="font-semibold text-foreground">{selectedOrder.shippingAddress.fullName}</p>
                  <p className="text-muted-foreground">{selectedOrder.shippingAddress.addressLine1}</p>
                  <p className="text-muted-foreground">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</p>
                  <p className="text-muted-foreground mt-1">{selectedOrder.shippingAddress.phone}</p>
                </div>

                {selectedOrder.orderStatus !== 'delivered' && (
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
