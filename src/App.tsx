import { useState, useCallback } from 'react';
import { Page, User, UserRole, Product, CartItem, Order } from './types';
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import CartDrawer from './components/CartDrawer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MarketplacePage from './pages/MarketplacePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import SellerDashboard from './pages/SellerDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [pageKey, setPageKey] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    setPageKey(k => k + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLogin = (role: UserRole, email: string, name: string) => {
    setUser({ id: crypto.randomUUID(), name, email, role });
    navigate(role === 'admin' ? 'admin' : (role === 'penjual' ? 'seller-dashboard' : 'marketplace'));
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setCompletedOrder(null);
    navigate('login');
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQty = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    navigate('product-detail');
  };

  const handleOrderComplete = (order: Order) => {
    setCompletedOrder(order);
    setCart([]);
    navigate('orders');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.itemPrice * item.quantity, 0);

  const isAuthPage = currentPage === 'login' || currentPage === 'register';

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onNavigateRegister={() => navigate('register')}
          />
        );

      case 'register':
        return (
          <RegisterPage
            onLogin={handleLogin}
            onNavigateLogin={() => navigate('login')}
          />
        );

      case 'marketplace':
        return (
          <MarketplacePage
            onViewProduct={viewProduct}
            onAddToCart={product => addToCart(product, 1)}
          />
        );

      case 'product-detail':
        return selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onAddToCart={(product, qty) => addToCart(product, qty)}
            onBack={() => navigate('marketplace')}
          />
        ) : null;

      case 'checkout':
        return (
          <CheckoutPage
            items={cart}
            total={cartTotal}
            onComplete={handleOrderComplete}
            onBack={() => navigate('marketplace')}
          />
        );

      case 'orders':
        return (
          <OrdersPage
            newOrder={completedOrder}
          />
        );

      case 'admin':
        return <AdminPage />;

      case 'seller-dashboard':
        return <SellerDashboard />;


      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Navigation — hidden on auth screens */}
      {!isAuthPage && user && (
        <TopNav
          user={user}
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
          onNavigate={navigate}
          currentPage={currentPage}
          onLogout={handleLogout}
        />
      )}

      {/* Page content */}
      <main
        key={pageKey}
        className={`page-enter ${!isAuthPage && user ? 'pt-16 pb-20 lg:pb-0' : ''}`}
      >
        {renderPage()}
      </main>

      {/* Mobile bottom nav */}
      {!isAuthPage && user && (
        <BottomNav
          currentPage={currentPage}
          onNavigate={navigate}
          cartCount={cartCount}
        />
      )}

      {/* Cart drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateCartQty}
        total={cartTotal}
        onCheckout={() => {
          setIsCartOpen(false);
          navigate('checkout');
        }}
      />
    </div>
  );
}
