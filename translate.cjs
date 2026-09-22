const fs = require('fs');

const files_to_translate = {
    'src/pages/LoginPage.tsx': [
        ['Sign in to your account', 'Masuk ke akun Anda'],
        ['Enter your details to access the marketplace.', 'Masukkan detail Anda untuk mengakses pasar.'],
        ['Email Address', 'Alamat Email'],
        ['Password', 'Kata Sandi'],
        ['Remember me', 'Ingat saya'],
        ['Forgot password?', 'Lupa kata sandi?'],
        ['Sign In', 'Masuk'],
        ['Admin Access', 'Akses Admin'],
        ['Logging in...', 'Sedang masuk...'],
        ["Don't have an account?", 'Belum punya akun?'],
        ['Register here', 'Daftar di sini']
    ],
    'src/pages/RegisterPage.tsx': [
        ['Create an account', 'Buat akun'],
        ['Join the AgroForge marketplace today.', 'Bergabung dengan pasar AgroForge hari ini.'],
        ['Full Name', 'Nama Lengkap'],
        ['Email Address', 'Alamat Email'],
        ['Password', 'Kata Sandi'],
        ['Confirm Password', 'Konfirmasi Kata Sandi'],
        ['I agree to the', 'Saya setuju dengan'],
        ['Terms of Service', 'Syarat Layanan'],
        ['and', 'dan'],
        ['Privacy Policy', 'Kebijakan Privasi'],
        ['Create Account', 'Buat Akun'],
        ['Creating account...', 'Membuat akun...'],
        ['Already have an account?', 'Sudah punya akun?'],
        ['Sign in', 'Masuk']
    ],
    'src/components/BottomNav.tsx': [
        ['Market', 'Pasar'],
        ['Cart', 'Keranjang'],
        ['Orders', 'Pesanan'],
        ['Admin', 'Admin']
    ],
    'src/pages/AdminPage.tsx': [
        ['Dashboard Overview', 'Ringkasan Dasbor'],
        ['Welcome back, Admin.', 'Selamat datang kembali, Admin.'],
        ['Total Revenue', 'Total Pendapatan'],
        ['Active Orders', 'Pesanan Aktif'],
        ['Total Customers', 'Total Pelanggan'],
        ['Products Listed', 'Produk Terdaftar'],
        ['Recent Orders', 'Pesanan Terbaru'],
        ['Customer', 'Pelanggan'],
        ['Date', 'Tanggal'],
        ['Amount', 'Jumlah'],
        ['Status', 'Status'],
        ['Inventory Alerts', 'Peringatan Inventaris'],
        ['Low Stock', 'Stok Menipis'],
        ['Out of Stock', 'Kehabisan Stok']
    ]
};

for (const [filepath, replacements] of Object.entries(files_to_translate)) {
    try {
        let content = fs.readFileSync(filepath, 'utf-8');
        for (const [oldStr, newStr] of replacements) {
            content = content.replaceAll(oldStr, newStr);
        }
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`Translated ${filepath}`);
    } catch (e) {
        console.error(`Error on ${filepath}:`, e.message);
    }
}
