const fs = require('fs');

const files_to_translate = {
    'src/pages/MarketplacePage.tsx': [
        ['All Categories', 'Semua Kategori'],
        ['Search machinery, tools, equipment...', 'Cari mesin, alat, perlengkapan...'],
        ['Filters', 'Filter'],
        ['Price Range', 'Rentang Harga'],
        ['Min Price', 'Harga Min'],
        ['Max Price', 'Harga Maks'],
        ['Apply', 'Terapkan'],
        ['Add to Cart', 'Tambah ke Keranjang'],
        ['View Details', 'Lihat Detail']
    ],
    'src/pages/OrdersPage.tsx': [
        ['Order Completed Successfully!', 'Pesanan Berhasil Diselesaikan!'],
        ['Thank you for your purchase. Your order', 'Terima kasih atas pembelian Anda. Pesanan Anda'],
        ['is being processed.', 'sedang diproses.'],
        ['Continue Shopping', 'Lanjut Belanja'],
        ['Order History', 'Riwayat Pesanan'],
        ['No orders found.', 'Tidak ada pesanan ditemukan.'],
        ['Order', 'Pesanan'],
        ['Status', 'Status'],
        ['Date', 'Tanggal'],
        ['Total', 'Total'],
        ['Items', 'Item'],
        ['Shipping', 'Pengiriman'],
        ['Payment', 'Pembayaran'],
        ['Completed', 'Selesai'],
        ['Pending', 'Tertunda'],
        ['Processing', 'Diproses']
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
