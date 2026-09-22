import { useState } from 'react';
import { CartItem, Order } from '../types';

interface CheckoutPageProps {
  items: CartItem[];
  total: number;
  onComplete: (order: Order) => void;
  onBack: () => void;
}

type CheckoutStep = 'shipping' | 'payment' | 'confirm';

export default function CheckoutPage({ items, total, onComplete, onBack }: CheckoutPageProps) {
  const [step, setStep] = useState<CheckoutStep>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  const [shipping, setShipping] = useState({
    fullName: 'Marcus Tillman',
    addressLine1: '4820 Harvest Ridge Rd',
    city: 'Ames',
    state: 'Iowa',
    zipCode: '50010',
    phone: '+1 (515) 882-4401',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'invoice'>('card');
  const [cardNum, setCardNum] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/27');
  const [cardCvc, setCardCvc] = useState('');

  const steps: CheckoutStep[] = ['shipping', 'payment', 'confirm'];
  const stepLabels = { shipping: 'Shipping', payment: 'Payment', confirm: 'Review' };

  const formatPrice = (n: number) => `$${n.toLocaleString()}`;
  const shipping_cost = total > 10000 ? 0 : 299;
  const tax = Math.round(total * 0.0725);
  const orderTotal = total + shipping_cost + tax;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 2000));

    const order: Order = {
      orderId: `AGF-2024-${String(Math.floor(Math.random() * 90000) + 10000)}`,
      orderDate: new Date().toISOString().split('T')[0],
      items,
      totalAmount: orderTotal,
      orderStatus: 'processing',
      shippingAddress: shipping,
      estimatedDelivery: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      trackingNumber: `UPS${Math.random().toString(36).substring(2, 16).toUpperCase()}`,
      paymentMethod: paymentMethod === 'card' ? `Visa ••${cardNum.slice(-4)}` : paymentMethod === 'bank' ? 'Bank Transfer' : 'Net-30 Invoice',
    };

    onComplete(order);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-lg mx-auto px-4 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <div>
            <h1 className="font-display text-2xl font-semibold text-foreground">Checkout</h1>
            <p className="text-sm text-muted-foreground">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* Step progress */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step === s ? 'bg-primary text-primary-foreground' :
                  steps.indexOf(step) > i ? 'bg-success text-white' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {steps.indexOf(step) > i ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${step === s ? 'text-primary' : 'text-muted-foreground'}`}>
                  {stepLabels[s]}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 rounded transition-all ${steps.indexOf(step) > i ? 'bg-success' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 animate-fade-up">
          {/* Main content */}
          <div className="bg-card border border-border rounded-2xl p-6">
            {step === 'shipping' && (
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-5">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'fullName', label: 'Full Name', span: 2 },
                    { id: 'addressLine1', label: 'Address Line 1', span: 2 },
                    { id: 'city', label: 'City', span: 1 },
                    { id: 'state', label: 'State', span: 1 },
                    { id: 'zipCode', label: 'ZIP Code', span: 1 },
                    { id: 'phone', label: 'Phone Number', span: 1 },
                  ].map(({ id, label, span }) => (
                    <div key={id} className={span === 2 ? 'sm:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
                      <input
                        type="text"
                        value={shipping[id as keyof typeof shipping]}
                        onChange={e => setShipping(s => ({ ...s, [id]: e.target.value }))}
                        className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStep('payment')}
                  className="mt-6 w-full bg-accent hover:bg-accent/90 text-white py-3 rounded-xl font-semibold text-sm transition-all"
                >
                  Continue to Payment →
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-5">Payment Method</h2>
                <div className="flex flex-col gap-3">
                  {[
                    { value: 'card' as const, label: 'Credit / Debit Card', icon: '💳' },
                    { value: 'bank' as const, label: 'Bank Transfer (EFT)', icon: '🏦' },
                    { value: 'invoice' as const, label: 'Net-30 Invoice', icon: '📄' },
                  ].map(({ value, label, icon }) => (
                    <button
                      key={value}
                      onClick={() => setPaymentMethod(value)}
                      className={`flex items-center gap-3 p-4 border-2 rounded-xl text-left transition-all ${
                        paymentMethod === value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <span className="text-2xl">{icon}</span>
                      <span className="font-medium text-sm text-foreground">{label}</span>
                      <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === value ? 'border-primary' : 'border-border'}`}>
                        {paymentMethod === value && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Card Number</label>
                      <input
                        type="text"
                        value={cardNum}
                        onChange={e => setCardNum(e.target.value)}
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-background font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Expiry</label>
                        <input type="text" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} placeholder="MM/YY" className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-background font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">CVC</label>
                        <input type="text" value={cardCvc} onChange={e => setCardCvc(e.target.value)} placeholder="•••" className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-background font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="mt-5 bg-muted rounded-xl p-4 text-sm text-muted-foreground space-y-1">
                    <p className="font-semibold text-foreground">Bank Transfer Details</p>
                    <p>Account Name: AgroForge Holdings Ltd.</p>
                    <p className="font-mono">Account: 082 – 4821 9920</p>
                    <p className="font-mono">BSB: 062 000</p>
                    <p className="text-xs mt-2">Use your order ID as reference. Funds clear in 1–3 business days.</p>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep('shipping')} className="flex-1 border border-border py-3 rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                    Back
                  </button>
                  <button onClick={() => setStep('confirm')} className="flex-1 bg-accent hover:bg-accent/90 text-white py-3 rounded-xl font-semibold text-sm transition-all">
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {step === 'confirm' && (
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-5">Review Your Order</h2>

                {/* Items */}
                <div className="space-y-3 mb-5">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-3 items-center bg-muted/50 rounded-xl p-3">
                      <img src={product.imageUrl} alt={product.productTitle} className="w-14 h-14 object-cover rounded-lg bg-muted" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground line-clamp-1">{product.productTitle}</p>
                        <p className="text-xs text-muted-foreground">Qty: {quantity} × {formatPrice(product.itemPrice)}</p>
                      </div>
                      <span className="font-mono text-sm font-bold">{formatPrice(product.itemPrice * quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Shipping address summary */}
                <div className="bg-muted/50 rounded-xl p-4 mb-5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Ship to</p>
                  <p className="text-sm font-semibold text-foreground">{shipping.fullName}</p>
                  <p className="text-sm text-muted-foreground">{shipping.addressLine1}, {shipping.city}, {shipping.state} {shipping.zipCode}</p>
                  <p className="text-sm text-muted-foreground">{shipping.phone}</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep('payment')} className="flex-1 border border-border py-3 rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 bg-accent hover:bg-accent/90 text-white py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                        Processing…
                      </>
                    ) : `Place Order · ${formatPrice(orderTotal)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="bg-card border border-border rounded-2xl p-5 h-fit sticky top-20">
            <h3 className="font-display font-semibold text-base text-foreground mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal ({items.length} items)</span><span className="font-mono">{formatPrice(total)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Freight shipping</span><span className={`font-mono ${shipping_cost === 0 ? 'text-success' : ''}`}>{shipping_cost === 0 ? 'FREE' : formatPrice(shipping_cost)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax (7.25%)</span><span className="font-mono">{formatPrice(tax)}</span></div>
              <div className="border-t border-border pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span className="font-mono text-lg">{formatPrice(orderTotal)}</span>
              </div>
            </div>
            {shipping_cost === 0 && (
              <div className="mt-3 bg-success-bg text-success text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                Free freight on orders over $10,000
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-border space-y-2">
              {['SSL encrypted checkout', '30-day returns policy', 'Verified suppliers'].map(badge => (
                <div key={badge} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
