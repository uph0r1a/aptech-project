import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token');

    // Nếu đã đăng nhập và đang cố truy cập trang login, redirect về dashboard
    if (isAuthenticated && window.location.pathname === '/login') {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;
