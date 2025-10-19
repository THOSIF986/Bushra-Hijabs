import React, { useState } from 'react';
import { ShoppingCart, User, Heart, Menu, X, ChevronDown } from 'lucide-react';
import { useApp } from '../lib/AppContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { cart, user, isLoggedIn, logout, isAdmin, adminLogout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    if (isAdmin) {
      adminLogout();
      onNavigate('admin');
    } else {
      logout();
      onNavigate('home');
    }
  };

  // Admin header - keep original style
  if (isAdmin) {
    return (
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex-shrink-0 cursor-pointer group"
              onClick={() => onNavigate('admin-dashboard')}
            >
              <span className="text-2xl text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">Bushra Hijabs</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => onNavigate('admin-dashboard')}
                className={`text-gray-700 hover:text-gray-900 ${
                  currentPage === 'admin-dashboard' ? 'font-semibold' : ''
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('admin-products')}
                className={`text-gray-700 hover:text-gray-900 ${
                  currentPage === 'admin-products' ? 'font-semibold' : ''
                }`}
              >
                Products
              </button>
              <button
                onClick={() => onNavigate('admin-orders')}
                className={`text-gray-700 hover:text-gray-900 ${
                  currentPage === 'admin-orders' ? 'font-semibold' : ''
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => onNavigate('admin-custom-requests')}
                className={`text-gray-700 hover:text-gray-900 ${
                  currentPage === 'admin-custom-requests' ? 'font-semibold' : ''
                }`}
              >
                Custom Requests
              </button>
            </nav>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    onNavigate('admin-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-gray-900 px-2 py-1"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    onNavigate('admin-products');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-gray-900 px-2 py-1"
                >
                  Products
                </button>
                <button
                  onClick={() => {
                    onNavigate('admin-orders');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-gray-900 px-2 py-1"
                >
                  Orders
                </button>
                <button
                  onClick={() => {
                    onNavigate('admin-custom-requests');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-gray-900 px-2 py-1"
                >
                  Custom Requests
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-red-600 px-2 py-1"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }

  // Customer-facing header - new design
  return (
    <>
      {/* Top Banner */}
      <div className="bg-pink-50 text-center py-2 px-4">
        <p className="text-sm text-gray-800">
          Free shipping on orders within India above Rs 798 | Cash On Delivery Available
        </p>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row: Logo and User Actions */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            {/* Empty space for balance */}
            <div className="w-24 hidden lg:block"></div>
            
            {/* Logo - Center */}
            <div 
              className="flex-shrink-0 cursor-pointer text-center"
              onClick={() => onNavigate('home')}
            >
              <h1 className="text-2xl lg:text-3xl tracking-wider text-gray-900">
                BUSHRA HIJABS
              </h1>
              <p className="text-xs tracking-widest text-gray-600 mt-1">
                INDIA'S PREMIUM HIJAB BRAND
              </p>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Login/User */}
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-sm text-gray-700 hover:text-gray-900 uppercase tracking-wide hidden lg:block">
                      {user?.name || 'Account'}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => onNavigate('profile')}>
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onNavigate('wishlist')}>
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onNavigate('profile')}>
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  onClick={() => onNavigate('profile')}
                  className="text-sm text-pink-600 hover:text-pink-700 uppercase tracking-wide hidden lg:block"
                >
                  LOGIN/SIGN UP
                </button>
              )}

              {/* Cart */}
              <button
                onClick={() => onNavigate('cart')}
                className="text-sm text-pink-600 hover:text-pink-700 uppercase tracking-wide relative hidden lg:block"
              >
                CART
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 text-gray-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center justify-center gap-8 py-4">
            <button
              onClick={() => onNavigate('shop')}
              className="text-sm text-gray-700 hover:text-gray-900 uppercase tracking-wide"
            >
              LBH OFFERS
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="text-sm text-gray-700 hover:text-gray-900 uppercase tracking-wide"
            >
              DEAL OF THE DAY
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="text-sm text-gray-700 hover:text-gray-900 uppercase tracking-wide"
            >
              NEW ARRIVALS
            </button>
            <div className="relative group">
              <button
                onClick={() => onNavigate('shop')}
                className="text-sm text-gray-700 hover:text-gray-900 uppercase tracking-wide flex items-center gap-1"
              >
                HIJABS
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-sm text-gray-700 hover:text-gray-900 uppercase tracking-wide"
            >
              BACK IN STOCK
            </button>
            <div className="relative group">
              <button
                onClick={() => onNavigate('shop')}
                className="text-sm text-gray-700 hover:text-gray-900 uppercase tracking-wide flex items-center gap-1"
              >
                ACCESSORIES
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-sm text-gray-700 hover:text-gray-900 uppercase tracking-wide"
            >
              GIFT HAMPERS
            </button>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    onNavigate('home');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-gray-900 px-2 py-1 uppercase tracking-wide"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    onNavigate('shop');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-gray-900 px-2 py-1 uppercase tracking-wide"
                >
                  Shop All
                </button>
                <button
                  onClick={() => {
                    onNavigate('shop');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-gray-900 px-2 py-1 uppercase tracking-wide"
                >
                  New Arrivals
                </button>
                <button
                  onClick={() => {
                    onNavigate('custom-design');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-gray-900 px-2 py-1 uppercase tracking-wide"
                >
                  Custom Design
                </button>
                <button
                  onClick={() => {
                    onNavigate('wishlist');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-gray-900 px-2 py-1 uppercase tracking-wide"
                >
                  Wishlist
                </button>
                <button
                  onClick={() => {
                    onNavigate('cart');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-gray-900 px-2 py-1 uppercase tracking-wide"
                >
                  Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
                </button>
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => {
                        onNavigate('profile');
                        setMobileMenuOpen(false);
                      }}
                      className="text-left text-gray-700 hover:text-gray-900 px-2 py-1 uppercase tracking-wide"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="text-left text-red-600 px-2 py-1 uppercase tracking-wide"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      onNavigate('profile');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-pink-600 px-2 py-1 uppercase tracking-wide"
                  >
                    Login/Sign Up
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
