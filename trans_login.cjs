const fs = require('fs');
let c = fs.readFileSync('src/pages/LoginPage.tsx', 'utf8');

c = c.replace('The premium<br />agri-marketplace', 'Marketplace Agrikultur<br />No. 1 di Indonesia');
c = c.replace('Source certified machinery, precision tools, and farming equipment from trusted suppliers worldwide.', 'Temukan mesin bersertifikat, alat presisi, dan perlengkapan pertanian dari supplier terpercaya seluruh Indonesia.');
c = c.replace('Products listed', 'Produk terdaftar');
c = c.replace('GMV traded', 'Nilai transaksi');
c = c.replace('Satisfaction rate', 'Tingkat kepuasan');
c = c.replace('Welcome back', 'Selamat Datang Kembali');
c = c.replace('Email address', 'Alamat Email');
c = c.replace('Signing in…', 'Sedang masuk...');
c = c.replace('Demo accounts', 'Akun Demo');
c = c.replace('Create one free', 'Daftar Gratis sekarang');

fs.writeFileSync('src/pages/LoginPage.tsx', c);
