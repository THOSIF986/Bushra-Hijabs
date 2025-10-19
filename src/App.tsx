import React, { useState } from 'react';
import { AppProvider } from './lib/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './components/HomePage';
import { ProductListing } from './components/ProductListing';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { CustomDesign } from './components/CustomDesign';
import { Wishlist } from './components/Wishlist';
import { UserProfile } from './components/UserProfile';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Toaster } from './components/ui/sonner';

type Page = 
  | 'home' 
  | 'shop' 
  | 'product' 
  | 'cart' 
  | 'checkout' 
  | 'custom-design' 
  | 'wishlist' 
  | 'profile'
  | 'admin'
  | 'admin-dashboard'
  | 'admin-products'
  | 'admin-orders'
  | 'admin-custom-requests';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleNavigate = (page: string, productId?: string) => {
    setCurrentPage(page as Page);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'shop':
        return <ProductListing onNavigate={handleNavigate} />;
      case 'product':
        return selectedProductId ? (
          <ProductDetail productId={selectedProductId} onNavigate={handleNavigate} />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        );
      case 'cart':
        return <Cart onNavigate={handleNavigate} />;
      case 'checkout':
        return <Checkout onNavigate={handleNavigate} />;
      case 'custom-design':
        return <CustomDesign onNavigate={handleNavigate} />;
      case 'wishlist':
        return <Wishlist onNavigate={handleNavigate} />;
      case 'profile':
        return <UserProfile onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminLogin onNavigate={handleNavigate} />;
      case 'admin-dashboard':
      case 'admin-products':
      case 'admin-orders':
      case 'admin-custom-requests':
        return <AdminDashboard onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const isAdminPage = currentPage.startsWith('admin');

  return (
    <AppProvider>
      <div className="min-h-screen bg-white flex flex-col">
        {!isAdminPage && (
          <Header onNavigate={handleNavigate} currentPage={currentPage} />
        )}
        {isAdminPage && currentPage !== 'admin' && (
          <Header onNavigate={handleNavigate} currentPage={currentPage} />
        )}
        <main className="flex-1">
          {renderPage()}
        </main>
        {!isAdminPage && currentPage !== 'checkout' && <Footer onNavigate={handleNavigate} />}
        <ScrollToTop />
        <Toaster position="top-right" />
      </div>
    </AppProvider>
  );
}

export default App;
