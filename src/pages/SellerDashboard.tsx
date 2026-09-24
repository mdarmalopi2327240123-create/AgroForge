import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SellerDashboard() {
  const [products, setProducts] = useState([
    { id: '1', name: 'Traktor Mini', price: '45000', stock: '10', description: 'Traktor bertenaga 20HP untuk lahan kecil.', imageUrl: 'https://picsum.photos/seed/AGRO1/700/480' }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', description: '', imageUrl: '' });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    setProducts([{ ...newProduct, id: Math.random().toString() }, ...products]);
    setNewProduct({ name: '', price: '', stock: '', description: '', imageUrl: '' });
    setShowAddForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-foreground">Dasbor Penjual</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary hover:bg-primary-hover text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all w-full sm:w-auto justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={showAddForm ? 'rotate-45 transition-transform' : 'transition-transform'}><path d="M12 5v14M5 12h14"/></svg>
          {showAddForm ? 'Tutup Form' : 'Tambah Produk'}
        </button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -20 }} 
            animate={{ opacity: 1, height: 'auto', y: 0 }} 
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="overflow-hidden mb-8"
          >
            <form onSubmit={handleAddProduct} className="bg-card p-5 sm:p-7 rounded-2xl border border-border shadow-sm">
              <h3 className="font-semibold text-lg mb-5 text-foreground">Tambah Produk Baru</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium mb-1.5 text-foreground">Nama Produk</label>
                  <input value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full border border-border px-3.5 py-2.5 rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none" required placeholder="Contoh: Traktor Baja" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">Harga (USD)</label>
                  <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full border border-border px-3.5 py-2.5 rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none" required placeholder="Contoh: 15000" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-foreground">Stok</label>
                  <input type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className="w-full border border-border px-3.5 py-2.5 rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none" required placeholder="Contoh: 10" />
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium mb-1.5 text-foreground">URL Gambar Produk</label>
                  <input type="url" value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} className="w-full border border-border px-3.5 py-2.5 rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none" placeholder="https://..." />
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-sm font-medium mb-1.5 text-foreground">Deskripsi Lengkap</label>
                  <textarea rows={3} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full border border-border px-3.5 py-2.5 rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Tuliskan detail produk di sini..."></textarea>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button type="button" onClick={() => setShowAddForm(false)} className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Batal</button>
                <button type="submit" className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-sm font-semibold transition-all shadow-sm">Simpan Produk</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {products.map(p => (
          <div key={p.id} className="bg-card border border-border rounded-xl p-4 flex gap-4 items-start shadow-sm">
            {p.imageUrl ? (
              <img src={p.imageUrl} alt={p.name} className="w-20 h-20 object-cover rounded-lg bg-muted shrink-0" />
            ) : (
              <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-muted-foreground opacity-50"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{p.name}</h3>
              <p className="text-sm font-mono text-primary font-bold mt-1">${Number(p.price).toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-success-bg text-success px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide">Stok: {p.stock}</span>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="p-8 text-center text-muted-foreground bg-card border border-border rounded-xl">Belum ada produk.</div>
        )}
      </div>

      <div className="hidden lg:block bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-muted-foreground border-b border-border">
            <tr>
              <th className="p-4 pl-6 font-semibold w-16">Foto</th>
              <th className="p-4 font-semibold">Detail Produk</th>
              <th className="p-4 font-semibold">Harga</th>
              <th className="p-4 font-semibold">Stok</th>
              <th className="p-4 pr-6 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-4 pl-6">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="w-12 h-12 object-cover rounded-lg bg-muted" />
                  ) : (
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-muted-foreground opacity-50"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <p className="font-semibold text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1 max-w-md">{p.description || 'Tidak ada deskripsi'}</p>
                </td>
                <td className="p-4 font-mono font-medium">${Number(p.price).toLocaleString()}</td>
                <td className="p-4">
                  <span className="inline-flex items-center justify-center min-w-[2rem] bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-xs font-bold">{p.stock}</span>
                </td>
                <td className="p-4 pr-6 text-right">
                  <span className="bg-success-bg text-success px-2.5 py-1 rounded-full text-xs font-semibold">Aktif</span>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="p-12 text-center text-muted-foreground">Belum ada produk yang dijual.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
