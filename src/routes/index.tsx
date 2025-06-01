import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import LoginPage from '../auth/login/login';
import RegisterPage from '../auth/register/register';
import ProtectedRoute from '../components/ui/ProtectedRoute';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Home /> 
            </ProtectedRoute>
        ),
    },
    {
        path: '/auth/login',
        element: <LoginPage />,
    },
    {
        path: '/auth/register',
        element: <RegisterPage />,
    },
]);
