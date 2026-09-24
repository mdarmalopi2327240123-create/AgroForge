const fs = require('fs');

let c = fs.readFileSync('src/pages/OrdersPage.tsx', 'utf8');
c = c.replace(/import \{ Pesanan, PesananStatus \} from '\.\.\/types';/, "import { Order as Pesanan, OrderStatus as PesananStatus } from '../types';");
c = c.replace(/newPesanan/g, 'newOrder');
c = c.replace(/orderTanggal/g, 'orderDate');
fs.writeFileSync('src/pages/OrdersPage.tsx', c);

let app = fs.readFileSync('src/App.tsx', 'utf8');
// Make sure routing for seller uses SellerDashboard
app = app.replace(/navigate\(role === 'admin' \? 'admin' : \(role === 'penjual' \? 'seller-dashboard' : 'marketplace'\)\);/g, "navigate(role === 'admin' ? 'admin' : (role === 'penjual' ? 'seller-dashboard' : 'marketplace'));");
fs.writeFileSync('src/App.tsx', app);
