const fs = require('fs');

// types.ts
let types = fs.readFileSync('src/types.ts', 'utf8');
types = types.replace(/'admin';/, "'admin'\n  | 'seller-dashboard';");
fs.writeFileSync('src/types.ts', types);

// App.tsx
let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(/navigate\(role === 'admin' \? 'admin' : 'marketplace'\);/g, "navigate(role === 'admin' ? 'admin' : (role === 'penjual' ? 'seller-dashboard' : 'marketplace'));");
app = app.replace("import AdminPage from './pages/AdminPage';", "import AdminPage from './pages/AdminPage';\nimport SellerDashboard from './pages/SellerDashboard';");
app = app.replace("case 'admin':\n        return <AdminPage />;", "case 'admin':\n        return <AdminPage />;\n\n      case 'seller-dashboard':\n        return <SellerDashboard />;\n");
fs.writeFileSync('src/App.tsx', app);
