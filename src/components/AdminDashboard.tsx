import React, { useState } from 'react';
import { useApp } from '../lib/AppContext';
import { AdminSidebar } from './admin/AdminSidebar';
import AdminDashboardHome from './admin/AdminDashboardHome';
import { ProductsView } from './admin/ProductsView';
import { OrdersView } from './admin/OrdersView';
import { CustomersView } from './admin/CustomersView';
import { DeliveryView } from './admin/DeliveryView';
import { CustomDesignsView } from './admin/CustomDesignsView';
import { CouponsView } from './admin/CouponsView';
import { ReviewsView } from './admin/ReviewsView';
import { AnalyticsView } from './admin/AnalyticsView';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const { isAdmin } = useApp();

  if (!isAdmin) {
    onNavigate('admin');
    return null;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminDashboardHome />;
      case 'products':
        return <ProductsView />;
      case 'orders':
        return <OrdersView />;
      case 'customers':
        return <CustomersView />;
      case 'delivery':
        return <DeliveryView />;
      case 'custom-designs':
        return <CustomDesignsView />;
      case 'coupons':
        return <CouponsView />;
      case 'reviews':
        return <ReviewsView />;
      case 'analytics':
        return <AnalyticsView />;
      default:
        return <AdminDashboardHome />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        onNavigate={onNavigate}
      />
      <main className="flex-1 p-8 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};
