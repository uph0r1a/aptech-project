import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import ForgotPasswordPage from '../pages/ForgotPassword';
import DashboardPage from '../pages/Dashboard';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <HomePage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <RegisterPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/forgot-password"
                    element={
                        <PublicRoute>
                            <ForgotPasswordPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
