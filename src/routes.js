import { Navigate, useRoutes } from 'react-router-dom';
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
import { isAuthenticated, getRole } from './_mock/auth_service';
import RegisterPage from './pages/RegisterPage';
import SubjectDetailPage from './pages/SubjectDetailPage';

// Componente para manejar rutas privadas
function PrivateRoute({ roles, children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const userRole = getRole();

  if (!roles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }

  return children;
}


// Componente para manejar la autenticación del layout del dashboard
function AuthenticatedLayout() {
  const userIsAuthenticated = isAuthenticated();
  const userRole = getRole();
  return userIsAuthenticated && (userRole === 'teacher' || userRole === 'student') ? (
    <DashboardLayout />
  ) : (
    <Navigate to="/login" replace />
  );
}


// Rutas privadas del dashboard
function DashboardRoutes() {
  return [
    { element: <Navigate to="/dashboard/app" />, index: true },
    { path: 'app', element: <DashboardAppPage /> },
    {
      path: 'user',
      element: (
        <PrivateRoute roles={['teacher']}>
          <UserPage />
        </PrivateRoute>
      ),
    },
    {
      path: 'products',
      children: [
        {
          path: '', element: (
            <PrivateRoute roles={['teacher', 'student']}>
              <ProductsPage />
            </PrivateRoute>
          )
        }, 
        {
         path: 'detail/:subjectId', element: <SubjectDetailPage/>
        }
      ],
    },
    {
      path: 'blog',
      children: [
        { path: '', element: <BlogPage /> },
        {
          path: 'create', element: (
            <PrivateRoute roles={['teacher']}>
              <BlogCreatePage />
            </PrivateRoute>
          )
        },
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
      path: 'register',
      element: <RegisterPage />
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
