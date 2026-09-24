import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AdminTab = 'komplain' | 'penjual' | 'monitoring';

// Mock data
const MOCK_COMPLAINTS = [
  { id: 'C-001', user: 'Budi Santoso', issue: 'Barang tidak sesuai deskripsi', status: 'pending', date: '2026-09-23' },
  { id: 'C-002', user: 'Agus Pratama', issue: 'Pengiriman terlambat 5 hari', status: 'resolved', date: '2026-09-22' },
  { id: 'C-003', user: 'Siti Aminah', issue: 'Penjual tidak merespon chat', status: 'investigating', date: '2026-09-24' },
];

const MOCK_SELLERS = [
  { id: 'S-001', name: 'Tani Maju Jaya', rating: 4.8, active: true, complaints: 1 },
  { id: 'S-002', name: 'Alat Tani Murah', rating: 3.2, active: true, complaints: 12 },
  { id: 'S-003', name: 'Agro Makmur', rating: 4.5, active: false, complaints: 0 },
];

const MOCK_SYSTEM_STATS = {
  cpu: '45%',
  memory: '2.4GB / 8GB',
  uptime: '99.9%',
  activeUsers: 143,
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('komplain');
  const [sellers, setSellers] = useState(MOCK_SELLERS);
  const [complaints, setComplaints] = useState(MOCK_COMPLAINTS);

  const handleBanSeller = (id: string) => {
    setSellers(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const handleResolveComplaint = (id: string) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'resolved' } : c));
  };

  const tabs: { id: AdminTab; label: string; icon: string }[] = [
    { id: 'komplain', label: 'Komplain', icon: '📝' },
    { id: 'penjual', label: 'Daftar Penjual', icon: '🏪' },
    { id: 'monitoring', label: 'Monitoring', icon: '🖥️' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-semibold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Sistem Manajemen Platform</p>
          </div>
          <div className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1.5 rounded-full">Super Admin</div>
        </motion.div>

        {/* Tabs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex gap-1 bg-muted p-1 rounded-xl mb-6 w-fit">
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
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'komplain' && (
            <motion.div key="komplain" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Daftar Komplain Pelanggan</h2>
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      {['ID', 'Tanggal', 'Pengguna', 'Masalah', 'Status', 'Aksi'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map(c => (
                      <tr key={c.id} className="border-t border-border hover:bg-muted/30">
                        <td className="px-4 py-3 font-mono text-xs">{c.id}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{c.date}</td>
                        <td className="px-4 py-3 font-medium">{c.user}</td>
                        <td className="px-4 py-3 text-muted-foreground">{c.issue}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${c.status === 'resolved' ? 'bg-success-bg text-success' : c.status === 'pending' ? 'bg-warning-bg text-warning' : 'bg-info/10 text-info'}`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {c.status !== 'resolved' && (
                            <button onClick={() => handleResolveComplaint(c.id)} className="text-xs text-success font-medium hover:underline">Tandai Selesai</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'penjual' && (
            <motion.div key="penjual" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Manajemen Akun Penjual</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sellers.map(s => (
                  <div key={s.id} className="bg-card border border-border rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{s.name}</h3>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.active ? 'bg-success-bg text-success' : 'bg-error-bg text-error'}`}>
                          {s.active ? 'Aktif' : 'Banned'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Rating: {s.rating} ⭐</p>
                      <p className="text-sm text-muted-foreground">Komplain: <span className={s.complaints > 5 ? 'text-error font-semibold' : ''}>{s.complaints}</span></p>
                    </div>
                    <button
                      onClick={() => handleBanSeller(s.id)}
                      className={`mt-4 w-full py-2 rounded-lg text-sm font-semibold transition-all ${s.active ? 'bg-error/10 text-error hover:bg-error/20' : 'bg-success/10 text-success hover:bg-success/20'}`}
                    >
                      {s.active ? 'Nonaktifkan Akun' : 'Aktifkan Akun'}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'monitoring' && (
            <motion.div key="monitoring" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
               <h2 className="text-xl font-semibold mb-4">Monitoring Sistem</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                 <div className="bg-card border border-border rounded-2xl p-5">
                   <p className="text-sm text-muted-foreground font-medium">Pengguna Aktif</p>
                   <p className="font-display text-3xl font-semibold text-primary mt-2">{MOCK_SYSTEM_STATS.activeUsers}</p>
                 </div>
                 <div className="bg-card border border-border rounded-2xl p-5">
                   <p className="text-sm text-muted-foreground font-medium">CPU Usage</p>
                   <p className="font-display text-3xl font-semibold text-info mt-2">{MOCK_SYSTEM_STATS.cpu}</p>
                 </div>
                 <div className="bg-card border border-border rounded-2xl p-5">
                   <p className="text-sm text-muted-foreground font-medium">Memory Usage</p>
                   <p className="font-display text-3xl font-semibold text-warning mt-2">{MOCK_SYSTEM_STATS.memory}</p>
                 </div>
                 <div className="bg-card border border-border rounded-2xl p-5">
                   <p className="text-sm text-muted-foreground font-medium">System Uptime</p>
                   <p className="font-display text-3xl font-semibold text-success mt-2">{MOCK_SYSTEM_STATS.uptime}</p>
                 </div>
               </div>
               <div className="mt-8 bg-card border border-border rounded-2xl p-6 text-center">
                 <h3 className="font-semibold text-lg mb-2">Pusat Bantuan</h3>
                 <p className="text-sm text-muted-foreground mb-4">Sistem berjalan normal. Tidak ada tindakan yang diperlukan.</p>
                 <button className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                   Hubungi Tim Teknis
                 </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
