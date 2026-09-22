import { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { MOCK_ORDERS } from '../data/products';

type AdminTab = 'overview' | 'inventory' | 'orders';

const stockConfig = {
  in_stock: { label: 'In Stock', bg: 'bg-success-bg', text: 'text-success' },
  low_stock: { label: 'Low Stock', bg: 'bg-warning-bg', text: 'text-warning' },
  out_of_stock: { label: 'Out of Stock', bg: 'bg-error-bg', text: 'text-error' },
};

function KpiCard({ label, value, sub, icon, trend }: { label: string; value: string; sub?: string; icon: string; trend?: 'up' | 'down' }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex gap-4 items-start">
      <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-xl shrink-0">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <p className="font-display text-2xl font-semibold text-foreground mt-0.5">{value}</p>
        {sub && (
          <p className={`text-xs font-medium flex items-center gap-1 mt-0.5 ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground'}`}>
            {trend === 'up' && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15" /></svg>}
            {trend === 'down' && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9" /></svg>}
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [inventory, setInventory] = useState<Product[]>(PRODUCTS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Product>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const lowStockProducts = inventory.filter(p => p.stockStatus === 'low_stock' || p.stockQuantity <= 3);
  const outOfStockCount = inventory.filter(p => p.stockStatus === 'out_of_stock').length;
  const totalValue = inventory.reduce((sum, p) => sum + p.itemPrice * p.stockQuantity, 0);

  const filteredInventory = inventory.filter(p =>
    p.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setEditValues({ itemPrice: product.itemPrice, stockQuantity: product.stockQuantity, stockStatus: product.stockStatus });
  };

  const saveEdit = (productId: string) => {
    setInventory(prev => prev.map(p => {
      if (p.id !== productId) return p;
      const qty = Number(editValues.stockQuantity ?? p.stockQuantity);
      const status = qty === 0 ? 'out_of_stock' : qty <= 3 ? 'low_stock' : 'in_stock';
      return { ...p, ...editValues, stockQuantity: qty, stockStatus: status };
    }));
    setEditingId(null);
    setEditValues({});
  };

  const formatPrice = (n: number) => `$${n.toLocaleString()}`;

  const tabs: { id: AdminTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'inventory', label: 'Inventory', icon: '📦' },
    { id: 'orders', label: 'Orders', icon: '📋' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 animate-fade-in">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-semibold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">AgroForge platform management</p>
          </div>
          <div className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1.5 rounded-full">Admin Access</div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted p-1 rounded-xl mb-6 w-fit animate-fade-in">
          {tabs.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{icon}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-up">
            {/* KPI row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <KpiCard label="Total Revenue" value="$2.47M" sub="↑ 18.4% this quarter" icon="💰" trend="up" />
              <KpiCard label="Active Listings" value={`${inventory.length - outOfStockCount}`} sub={`${outOfStockCount} out of stock`} icon="🏪" />
              <KpiCard label="Monthly Orders" value="847" sub="↑ 12% vs last month" icon="📦" trend="up" />
              <KpiCard label="Inventory Value" value={formatPrice(totalValue)} sub={`${inventory.length} SKUs tracked`} icon="🏗️" />
            </div>

            {/* Low stock alerts */}
            {lowStockProducts.length > 0 && (
              <div className="bg-warning-bg border border-warning/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-warning"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                  <h3 className="font-semibold text-foreground text-sm">Low Stock Alerts ({lowStockProducts.length})</h3>
                </div>
                <div className="space-y-2">
                  {lowStockProducts.map(p => {
                    const cfg = stockConfig[p.stockStatus];
                    return (
                      <div key={p.id} className="flex items-center justify-between bg-card rounded-xl px-4 py-2.5">
                        <div>
                          <p className="font-semibold text-sm text-foreground">{p.productTitle}</p>
                          <p className="text-xs text-muted-foreground font-mono">{p.sku}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>{p.stockQuantity} units</span>
                          <button onClick={() => { setActiveTab('inventory'); }} className="text-xs text-primary font-medium hover:underline">Restock →</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recent orders preview */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h3 className="font-display font-semibold text-base text-foreground">Recent Orders</h3>
                <button onClick={() => setActiveTab('orders')} className="text-xs text-primary font-medium hover:underline">View all →</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      {['Order ID', 'Buyer', 'Items', 'Total', 'Status'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ORDERS.map(order => {
                      const s = order.orderStatus;
                      const badge = { processing: 'bg-info/10 text-info', confirmed: 'bg-primary/10 text-primary', shipped: 'bg-warning-bg text-warning', out_for_delivery: 'bg-accent/10 text-accent', delivered: 'bg-success-bg text-success' }[s];
                      return (
                        <tr key={order.orderId} className="border-t border-border hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">{order.orderId}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{order.shippingAddress.fullName}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{order.items.length}</td>
                          <td className="px-4 py-3 font-mono text-sm font-semibold">{formatPrice(order.totalAmount)}</td>
                          <td className="px-4 py-3">
                            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${badge} capitalize`}>
                              {s.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Management */}
        {activeTab === 'inventory' && (
          <div className="animate-fade-up space-y-4">
            {/* Search + actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by name, SKU, or brand…"
                  className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                Add Listing
              </button>
            </div>

            {/* Inventory table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      {['Product', 'SKU', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map(product => {
                      const isEditing = editingId === product.id;
                      const cfg = stockConfig[product.stockStatus];

                      return (
                        <tr key={product.id} className={`border-t border-border transition-colors ${isEditing ? 'bg-primary/5' : 'hover:bg-muted/30'}`}>
                          {/* Product */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img src={product.imageUrl} alt={product.productTitle} className="w-10 h-10 object-cover rounded-lg bg-muted shrink-0" />
                              <div className="min-w-0">
                                <p className="font-semibold text-foreground truncate max-w-[180px]">{product.productTitle}</p>
                                <p className="text-xs text-muted-foreground">{product.brand}</p>
                              </div>
                            </div>
                          </td>

                          {/* SKU */}
                          <td className="px-4 py-3">
                            <span className="font-mono text-xs text-muted-foreground">{product.sku}</span>
                          </td>

                          {/* Category */}
                          <td className="px-4 py-3">
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{product.category}</span>
                          </td>

                          {/* Price */}
                          <td className="px-4 py-3">
                            {isEditing ? (
                              <div className="relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                                <input
                                  type="number"
                                  value={editValues.itemPrice ?? product.itemPrice}
                                  onChange={e => setEditValues(v => ({ ...v, itemPrice: Number(e.target.value) }))}
                                  className="w-24 pl-5 pr-2 py-1 border border-primary rounded-lg font-mono text-xs bg-card focus:outline-none"
                                />
                              </div>
                            ) : (
                              <span className="font-mono font-semibold text-foreground">{formatPrice(product.itemPrice)}</span>
                            )}
                          </td>

                          {/* Stock qty */}
                          <td className="px-4 py-3">
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                value={editValues.stockQuantity ?? product.stockQuantity}
                                onChange={e => setEditValues(v => ({ ...v, stockQuantity: Number(e.target.value) }))}
                                className="w-16 px-2 py-1 border border-primary rounded-lg font-mono text-xs text-center bg-card focus:outline-none"
                              />
                            ) : (
                              <span className="font-mono text-sm font-medium">{product.stockQuantity}</span>
                            )}
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3">
                            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${cfg.bg} ${cfg.text}`}>
                              {cfg.label}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {isEditing ? (
                                <>
                                  <button
                                    onClick={() => saveEdit(product.id)}
                                    className="text-xs font-semibold text-success hover:underline"
                                  >Save</button>
                                  <button
                                    onClick={() => setEditingId(null)}
                                    className="text-xs font-semibold text-muted-foreground hover:underline"
                                  >Cancel</button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => startEdit(product)}
                                    className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
                                    title="Edit"
                                  >
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                  </button>
                                  <button
                                    onClick={() => setInventory(inv => inv.filter(p => p.id !== product.id))}
                                    className="p-1.5 rounded-lg hover:bg-error-bg transition-colors text-muted-foreground hover:text-error"
                                    title="Delete"
                                  >
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 border-t border-border bg-muted/30 flex justify-between text-xs text-muted-foreground">
                <span>Showing {filteredInventory.length} of {inventory.length} products</span>
                <span>Total inventory value: <strong className="text-foreground font-mono">{formatPrice(totalValue)}</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* Orders management */}
        {activeTab === 'orders' && (
          <div className="animate-fade-up space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Total Orders', value: '847', icon: '📋' },
                { label: 'Processing', value: '23', icon: '⏳' },
                { label: 'Shipped', value: '156', icon: '🚚' },
                { label: 'Delivered', value: '668', icon: '✅' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground font-medium">{label}</p>
                    <span className="text-lg">{icon}</span>
                  </div>
                  <p className="font-display text-2xl font-semibold text-foreground mt-1">{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <h3 className="font-display font-semibold text-base text-foreground">All Orders</h3>
                <button className="flex items-center gap-1.5 text-xs text-primary font-medium hover:underline">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                  Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      {['Order ID', 'Date', 'Customer', 'Items', 'Total', 'Status', 'Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ORDERS.map(order => {
                      const s = order.orderStatus;
                      const badge = { processing: 'bg-info/10 text-info', confirmed: 'bg-primary/10 text-primary', shipped: 'bg-warning-bg text-warning', out_for_delivery: 'bg-accent/10 text-accent', delivered: 'bg-success-bg text-success' }[s];
                      return (
                        <tr key={order.orderId} className="border-t border-border hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">{order.orderId}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{new Date(order.orderDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                          <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{order.shippingAddress.fullName}</td>
                          <td className="px-4 py-3 text-muted-foreground">{order.items.length}</td>
                          <td className="px-4 py-3 font-mono font-semibold">{formatPrice(order.totalAmount)}</td>
                          <td className="px-4 py-3">
                            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${badge} capitalize`}>
                              {s.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button className="text-xs text-primary font-medium hover:underline">View</button>
                              <button className="text-xs text-muted-foreground font-medium hover:underline">Update</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
