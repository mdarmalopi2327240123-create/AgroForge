const fs = require('fs');

let c = fs.readFileSync('src/types.ts', 'utf8');
c = c.replace(/export type UserRole = 'buyer' \| 'admin';/, "export type UserRole = 'pembeli' | 'penjual' | 'admin';");
fs.writeFileSync('src/types.ts', c);

// Modify App.tsx where roles might be hardcoded
let appC = fs.readFileSync('src/App.tsx', 'utf8');
// For login mock
appC = appC.replace(/role === 'admin' \? 'admin' : 'marketplace'/g, "role === 'admin' ? 'admin' : (role === 'penjual' ? 'seller-dashboard' : 'marketplace')");
fs.writeFileSync('src/App.tsx', appC);

console.log('Modified types and App.tsx');
