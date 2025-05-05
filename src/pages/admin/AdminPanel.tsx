
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import VendorManagement from '@/components/admin/VendorManagement';
import UserManagement from '@/components/admin/UserManagement';
import CategoryManagement from '@/components/admin/CategoryManagement';
import CouponManagement from '@/components/admin/CouponManagement';
import ReviewManagement from '@/components/admin/ReviewManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import DataExport from '@/components/admin/DataExport';
import AdminSettings from '@/components/admin/AdminSettings';

const AdminPanel = () => {
  const { section } = useParams<{ section: string }>();
  const navigate = useNavigate();
  
  // Default to dashboard if no section specified
  const currentSection = section || 'dashboard';
  
  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'vendors':
        return <VendorManagement />;
      case 'users':
        return <UserManagement />;
      case 'categories':
        return <CategoryManagement />;
      case 'coupons':
        return <CouponManagement />;
      case 'reviews':
        return <ReviewManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'export':
        return <DataExport />;
      case 'settings':
        return <AdminSettings />;
      default:
        navigate('/admin/dashboard');
        return <AdminDashboard />;
    }
  };
  
  return (
    <AdminLayout currentSection={currentSection}>
      {renderSection()}
    </AdminLayout>
  );
};

export default AdminPanel;
