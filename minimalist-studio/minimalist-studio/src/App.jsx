import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { CartProvider, useCart } from './contexts/CartContext';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components for better performance
const Hero = lazy(() => import('./components/Hero'));
const Categories = lazy(() => import('./components/Categories'));
const ProductGrid = lazy(() => import('./components/ProductGrid'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout'));
import { seedDatabase } from './dbSeeder';

// Loading fallback component
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>LOADING...</p>
  </div>
);
// Wrapper component for category pages
const CategoryPage = () => {
  const { categoryName } = useParams();
  return <ProductGrid activeCategory={categoryName} />;
};

// Header component with cart functionality
const Header = () => {
  const [searchActive, setSearchActive] = useState(false);
  const { getCartCount } = useCart();

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <Link to="/">STUDIO</Link>
        </div>
        <nav className="nav">
          <Link to="/">STORE</Link>
          <Link to="/category/all">COLLECTIONS</Link>
        </nav>
      </div>

      <div className="header-right">
        {/* Search Bar */}
        <div className={`search-container ${searchActive ? 'active' : ''}`}>
          <input 
            type="text" 
            placeholder="SEARCH..." 
            className="search-input"
            onFocus={() => setSearchActive(true)}
            onBlur={() => setSearchActive(false)}
          />
          <span className="search-icon">⚲</span>
        </div>

        <div className="user-actions">
          <Link to="/signin" className="nav-link-small">SIGN IN</Link>
          <Link to="/cart" className="cart-button">
            CART <span className="cart-count-badge">{getCartCount()}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

const App = () => {
  // Temporarily enable seeder to populate all categories
  //seedDatabase();
  
  return (
    <CartProvider>
      <ErrorBoundary>
        <Router>
        <div className="app-container">
          <Header />
          <main className="main-wrapper">
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<LoadingFallback />}>
                <>
                  <Hero />
                  <Categories />
                  <ProductGrid activeCategory="All" />
                </>
              </Suspense>
            } />
            <Route path="/category/:categoryName" element={
              <Suspense fallback={<LoadingFallback />}>
                <CategoryPage />
              </Suspense>
            } />
            <Route path="/product/:id" element={
              <Suspense fallback={<LoadingFallback />}>
                <ProductDetail />
              </Suspense>
            } />
            <Route path="/cart" element={
              <Suspense fallback={<LoadingFallback />}>
                <Cart />
              </Suspense>
            } />
            <Route path="/checkout" element={
              <Suspense fallback={<LoadingFallback />}>
                <Checkout />
              </Suspense>
            } />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-links">
              <Link to="/">STORE</Link>
              <Link to="/legal">LEGAL</Link>
              <Link to="/privacy">PRIVACY</Link>
            </div>
            <div className="copyright">© 2026 STUDIO — ALL RIGHTS RESERVED</div>
          </div>
        </footer>
      </div>
      </Router>
      </ErrorBoundary>
    </CartProvider>
  );
};

export default App;