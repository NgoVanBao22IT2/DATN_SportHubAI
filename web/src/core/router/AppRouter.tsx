import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

// ==========================================
// THƯ MỤC SCREEN BOILERPLATES (TRÁNH UI/UX)
// ==========================================
// Trả về Outlet hoặc null để làm khung sườn điều hướng, hoàn toàn không có layout visual
const PlaceholderLayout = () => <Outlet />;
const PlaceholderPage = (name: string) => () => <div>{name}</div>;

const LoginPage = PlaceholderPage('Login');
const RegisterPage = PlaceholderPage('Register');
const ForgotPasswordPage = PlaceholderPage('ForgotPassword');

const UserHomePage = PlaceholderPage('User Home (Court Search)');
const UserBookingsPage = PlaceholderPage('User Bookings History');
const VenueDetailsPage = PlaceholderPage('Venue Details');

const OwnerDashboardPage = PlaceholderPage('Owner Dashboard');
const OwnerVenuesPage = PlaceholderPage('Owner Venues Management');

const AdminDashboardPage = PlaceholderPage('Admin System Dashboard');
const UnauthorizedPage = PlaceholderPage('403 - Unauthorized Access');

// ==========================================
// ROLE & AUTHENTICATION ROUTE GUARDS
// ==========================================

interface RouteGuardProps {
  allowedRoles?: Array<'USER' | 'OWNER' | 'ADMIN'>;
}

// Route được bảo vệ: yêu cầu đăng nhập và phân quyền (RBAC)
const ProtectedRoute: React.FC<RouteGuardProps> = ({ allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useSelector((state: RootState) => state.auth);

  if (isLoading) {
    return <div>Loading session...</div>; // Trả về text đơn giản trong lúc kiểm tra session
  }

  if (!isAuthenticated) {
    // Chưa đăng nhập -> redirect sang trang login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Không có quyền phù hợp -> redirect sang 403
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

// Route công khai: Chỉ truy cập được khi CHƯA đăng nhập (Ví dụ: Login, Register)
const PublicRoute = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated && user) {
    // Đã đăng nhập -> redirect về dashboard tương ứng của role
    if (user.role === 'OWNER') return <Navigate to="/owner/dashboard" replace />;
    if (user.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

// ==========================================
// MAIN APP ROUTER CONFIGURATION
// ==========================================
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Luồng công khai (chưa đăng nhập) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Luồng bảo vệ cho Khách đặt sân (USER) */}
        <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
          <Route path="/home" element={<UserHomePage />} />
          <Route path="/bookings" element={<UserBookingsPage />} />
          <Route path="/venues/:venueId" element={<VenueDetailsPage />} />
        </Route>

        {/* Luồng bảo vệ cho Chủ sân (OWNER) */}
        <Route path="/owner" element={<ProtectedRoute allowedRoles={['OWNER']} />}>
          <Route element={<PlaceholderLayout />}>
            <Route path="dashboard" element={<OwnerDashboardPage />} />
            <Route path="venues" element={<OwnerVenuesPage />} />
          </Route>
        </Route>

        {/* Luồng bảo vệ cho Admin hệ thống (ADMIN) */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
          <Route element={<PlaceholderLayout />}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
          </Route>
        </Route>

        {/* Các trang đặc biệt */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        {/* Điều hướng mặc định */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
