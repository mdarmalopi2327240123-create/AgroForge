export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 mt-16 border-t border-border/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 0 1 10 10" /><path d="M8 8c.5-1.5 2-3 4-3" /><circle cx="12" cy="12" r="2" /><path d="M12 14v8" /><path d="M8 20c1-1.5 2.5-2 4-2s3 .5 4 2" /></svg>
              </div>
              <span className="font-display text-lg font-semibold text-white">AgroForge</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Platform e-commerce alat berat pertanian dan mesin pertama dan terbesar di Indonesia. Menghubungkan petani dengan teknologi terbaik.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Tentang AgroForge</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-primary transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Karir</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Beli & Jual</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-primary transition-colors">Cara Belanja</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cara Berjualan</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Garansi AgroForge</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pengiriman Bebas Ongkir</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>+62 812-3456-7890<br/><span className="text-xs text-white/40">(Senin-Minggu, 24 Jam)</span></span>
              </li>
              <li className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>bantuan@agroforge.co.id</span>
              </li>
              <li className="flex items-start gap-2 mt-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Gedung Agro Tower Lt. 14<br/>Jl. Pertanian Raya No. 88<br/>Jakarta Selatan, 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© 2024 AgroForge Indonesia. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4">
            <span>Indonesia / Bahasa Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
