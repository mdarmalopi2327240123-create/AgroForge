const fs = require('fs');

// types.ts
let types = fs.readFileSync('src/types.ts', 'utf8');
types = types.replace(/'login'/, "'landing'\n  | 'login'");
fs.writeFileSync('src/types.ts', types);

// App.tsx
let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace("useState<Page>('login');", "useState<Page>('landing');");
app = app.replace("import AdminPage from './pages/AdminPage';", "import AdminPage from './pages/AdminPage';\nimport LandingPage from './pages/LandingPage';\nimport Footer from './components/Footer';");
app = app.replace("const isAuthPage = currentPage === 'login' || currentPage === 'register';", "const isAuthPage = currentPage === 'login' || currentPage === 'register' || currentPage === 'landing';");

app = app.replace("case 'login':", "case 'landing':\n        return <LandingPage onNavigate={navigate} />;\n      case 'login':");

// add footer
app = app.replace("{/* Mobile bottom nav */}", "{(currentPage !== 'login' && currentPage !== 'register') && <Footer />}\n      {/* Mobile bottom nav */}");

fs.writeFileSync('src/App.tsx', app);
