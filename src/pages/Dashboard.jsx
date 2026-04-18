import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg p-8 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
                        <button
                            className="px-6 py-2 bg-white text-red-500 border border-red-500 rounded cursor-pointer hover:bg-red-500 hover:text-white transition-all"
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </button>
                    </div>

                    <p className="text-base mb-4 text-gray-800">
                        Chào mừng bạn đến với trang quản trị!
                    </p>

                    <p className="text-sm text-gray-600">
                        Đây là trang private route, chỉ người dùng đã đăng nhập mới có thể truy cập.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
