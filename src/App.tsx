
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VendorRegister from "./pages/vendor/VendorRegister";
import BecomeVendor from "./pages/vendor/BecomeVendor";
import ApplicationStatus from "./pages/vendor/ApplicationStatus";
import Profile from "./pages/Profile";
import Unauthorized from "./pages/Unauthorized";
import AdminPanel from "./pages/admin/AdminPanel";
import NotFound from "./pages/NotFound";
import VendorListPage from "./pages/vendors/VendorListPage";
import ServiceListPage from "./pages/services/ServiceListPage";
import VendorDetail from "./pages/vendor/VendorDetail";
import VendorManage from "./pages/vendor/VendorManage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Index />} />
          <Route path="/login" element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          } />
          <Route path="/register" element={
            <ProtectedRoute requireAuth={false}>
              <Register />
            </ProtectedRoute>
          } />
          <Route path="/vendor/register" element={<VendorRegister />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/vendors" element={<VendorListPage />} />
          <Route path="/services" element={<ServiceListPage />} />
          <Route path="/products" element={<ServiceListPage />} /> {/* Added products route */}
          <Route path="/vendor/:id" element={<VendorDetail />} />
          <Route path="/vendor/manage/:id" element={
            <ProtectedRoute requiredRole="vendor">
              <VendorManage />
            </ProtectedRoute>
          } />
          <Route path="/vendor/become" element={
            <ProtectedRoute>
              <BecomeVendor />
            </ProtectedRoute>
          } />
          <Route path="/vendor/application-status" element={
            <ProtectedRoute>
              <ApplicationStatus />
            </ProtectedRoute>
          } />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          } />
          <Route path="/admin/:section" element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          } />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
