import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Product, CartItem } from './types';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { PersonalCabinet } from './pages/PersonalCabinet';
import { Login } from './pages/Login';
import { Checkout } from './pages/Checkout';
import { CategoryPage } from './pages/CategoryPage';
import { ProductPage } from './components/ProductPage';
import { Cart } from './components/Cart';
import { ChatAssistant } from './components/ChatAssistant';
import { CatalogMenu } from './components/CatalogMenu';
import { BottomNav } from './components/BottomNav';
import { I18nProvider } from './i18n/I18nProvider';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function AppInner() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Close catalog on route changes
    setIsCatalogOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOpenCatalog = () => {
      setIsCatalogOpen(true);
    };

    window.addEventListener('openCatalog', handleOpenCatalog);
    return () => {
      window.removeEventListener('openCatalog', handleOpenCatalog);
    };
  }, []);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const cartItemCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="app">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        onCatalogClick={() => setIsCatalogOpen((v) => !v)}
        onSearch={(query) => {
          navigate(`/category/all?q=${encodeURIComponent(query)}`);
        }}
      />
      <CatalogMenu isOpen={isCatalogOpen} onClose={() => setIsCatalogOpen(false)} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={addToCart} onCatalogClick={() => setIsCatalogOpen((v) => !v)} />} />
          <Route path="/category/:category" element={<CategoryPage onAddToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductPage onAddToCart={addToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PersonalCabinet />} />
          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
                onOrderComplete={() => {
                  setCartItems([]);
                  setIsCartOpen(false);
                }}
              />
            }
          />
        </Routes>
      </main>
      <Cart
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
      <ChatAssistant onAddToCart={addToCart} />
      <BottomNav 
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <AppInner />
        </Router>
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;
