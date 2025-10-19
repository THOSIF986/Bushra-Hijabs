import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">Bushra Hijabs</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Premium quality hijabs crafted with elegance and care. Experience comfort, style, and modesty in perfect harmony.
            </p>
            <p className="text-gray-500 text-sm">
              © 2025 Bushra Hijabs. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-pink-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Return & Refund</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Care Instructions</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Privacy Policy</a></li>
              {onNavigate && (
                <li>
                  <button 
                    onClick={() => onNavigate('admin')} 
                    className="hover:text-pink-400 transition-colors"
                  >
                    Admin Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-4 w-4 text-pink-500 fill-current animate-pulse" /> for modest fashion
          </p>
        </div>
      </div>
    </footer>
  );
};
