import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Truck, 
  Palette, 
  Tag, 
  Star,
  BarChart3,
  LogOut
} from 'lucide-react';
import { useApp } from '../../lib/AppContext';

interface AdminSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onNavigate: (page: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentView, onViewChange, onNavigate }) => {
  const { adminLogout } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'delivery', label: 'Delivery', icon: Truck },
    { id: 'custom-designs', label: 'Custom Designs', icon: Palette },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const handleLogout = () => {
    adminLogout();
    onNavigate('admin');
  };

  return (
    <aside className="w-72 bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white min-h-screen flex flex-col shadow-2xl">
      <div className="p-6 border-b border-gray-800/50">
        <h1 className="text-2xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Bushra Hijabs</h1>
        <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:translate-x-1'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-600/20 hover:text-red-400 transition-all duration-300 hover:translate-x-1"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
