
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
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
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
