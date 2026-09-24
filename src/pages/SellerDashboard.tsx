import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SellerDashboard() {
  const [products, setProducts] = useState([
    { id: '1', name: 'Traktor Mini', price: '45000', stock: '10' }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    setProducts([...products, { ...newProduct, id: Math.random().toString() }]);
    setNewProduct({ name: '', price: '', stock: '' });
    setShowAddForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-semibold">Dasbor Penjual</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          Tambah Produk
        </button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <form onSubmit={handleAddProduct} className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Tambah Produk Baru</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm mb-1">Nama Produk</label>
                  <input value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full border px-3 py-2 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm mb-1">Harga (USD)</label>
                  <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full border px-3 py-2 rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm mb-1">Stok</label>
                  <input type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className="w-full border px-3 py-2 rounded-lg" required />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-sm text-muted-foreground">Batal</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg text-sm">Simpan</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="p-4 font-semibold">Nama Produk</th>
              <th className="p-4 font-semibold">Harga</th>
              <th className="p-4 font-semibold">Stok</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-4">{p.name}</td>
                <td className="p-4">${Number(p.price).toLocaleString()}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4"><span className="bg-success-bg text-success px-2 py-1 rounded-full text-xs">Aktif</span></td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">Belum ada produk yang dijual.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
