import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import LoginPage from '../auth/login/login'
import RegisterPage from '../auth/register/register'
export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/auth/login',
        element: <LoginPage />,
    },
    {
        path: '/auth/register',
        element: <RegisterPage />,
    },
])
