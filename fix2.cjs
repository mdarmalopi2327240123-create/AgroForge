const fs = require('fs');
let c = fs.readFileSync('src/pages/MarketplacePage.tsx', 'utf8');
c = c.replace('<div className="fixed inset-0 z-[100] flex">', '<motion.div className="fixed inset-0 z-[100] flex">');
fs.writeFileSync('src/pages/MarketplacePage.tsx', c);
