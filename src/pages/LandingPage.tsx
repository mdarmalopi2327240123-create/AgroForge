import { motion } from 'framer-motion';

export default function LandingPage({ onNavigate }: { onNavigate: (p: any) => void }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Nav for Landing */}
      <nav className="fixed top-0 w-full bg-card/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2a10 10 0 0 1 10 10" /><path d="M8 8c.5-1.5 2-3 4-3" /><circle cx="12" cy="12" r="2" /><path d="M12 14v8" /><path d="M8 20c1-1.5 2.5-2 4-2s3 .5 4 2" /></svg>
            </div>
            <span className="font-display text-lg font-semibold text-foreground">AgroForge</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('login')} className="text-sm font-medium hover:text-primary transition-colors">Masuk</button>
            <button onClick={() => onNavigate('register')} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors">Daftar Gratis</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center lg:text-left"
        >
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase mb-6">Marketplace Pertanian #1</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-foreground mb-6">
            Pusat Jual Beli<br/>Alat Pertanian <span className="text-primary">Terpercaya.</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto lg:mx-0">
            Temukan traktor, mesin panen, dan perlengkapan agrikultur berkualitas tinggi dari supplier terverifikasi di seluruh Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <button onClick={() => onNavigate('login')} className="w-full sm:w-auto bg-primary text-white px-8 py-3.5 rounded-xl text-base font-semibold hover:bg-primary-hover hover:shadow-lg transition-all">
              Mulai Belanja Sekarang
            </button>
            <button onClick={() => onNavigate('register')} className="w-full sm:w-auto bg-card border border-border text-foreground px-8 py-3.5 rounded-xl text-base font-semibold hover:border-primary/50 transition-all">
              Jadilah Penjual
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden relative">
            <img src="https://picsum.photos/seed/AGROHERO/800/800" alt="Pertanian Modern" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-xl border border-border flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-success-bg rounded-full flex items-center justify-center">
              <span className="text-success text-xl">🚜</span>
            </div>
            <div>
              <p className="font-bold text-foreground">12,000+</p>
              <p className="text-xs text-muted-foreground">Produk Tersedia</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section className="bg-card py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-semibold mb-4">Mengapa Memilih AgroForge?</h2>
            <p className="text-muted-foreground">Platform yang dirancang khusus untuk memajukan industri pertanian.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🛡️', title: 'Transaksi Aman', desc: 'Sistem pembayaran rekber menjamin keamanan uang Anda sampai barang tiba.' },
              { icon: '🚚', title: 'Pengiriman Kargo', desc: 'Dukungan logistik khusus alat berat ke seluruh pelosok nusantara.' },
              { icon: '⭐', title: 'Supplier Terverifikasi', desc: 'Hanya penjual dengan reputasi baik dan dokumen lengkap yang bisa berjualan.' },
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-background p-6 rounded-2xl border border-border"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
