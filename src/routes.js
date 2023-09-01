import { Navigate, useRoutes, Outlet } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
// pages
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import BlogCreatePage from './pages/BlogCreatePage';
import BlogDetailPage from './pages/BlogDetailPage';
import authService from './_mock/auth_service';

// Componente para manejar rutas privadas
function PrivateRoute({ roles, children }) {
  if (!authService.isAuthenticated) {
    console.log(authService.isAuthenticated);
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(authService.role)) {
    return <Navigate to="/404" replace />;
  }

  return children;
}

// Componente para manejar la autenticación del layout del dashboard
function AuthenticatedLayout() {
  return authService.isAuthenticated && authService.role === 'admin'
    ? <DashboardLayout />
    : <Navigate to="/login" replace />;
}

// Rutas privadas del dashboard
function DashboardRoutes() {
  return [
    { element: <Navigate to="/dashboard/app" />, index: true },
    { path: 'app', element: <DashboardAppPage /> },
    { path: 'user', element: <PrivateRoute roles={['admin', 'user']}><UserPage /></PrivateRoute> },
    { path: 'products', element: <PrivateRoute roles={['admin']}><ProductsPage /></PrivateRoute> },
    {
      path: 'blog',
      children: [
        { path: '', element: <BlogPage /> },
        { path: 'create', element: <BlogCreatePage /> },
        { path: 'detail/:blogId', element: <BlogDetailPage /> },
      ],
    },
  ];
}

// Componente principal de rutas
export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <AuthenticatedLayout />,
      children: DashboardRoutes(),
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
