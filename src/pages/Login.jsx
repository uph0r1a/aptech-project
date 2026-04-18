import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleLogin = (e) => {
        e.preventDefault();
        localStorage.setItem('token', 'demo-token');
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-600 to-purple-400">
            <div className="w-full max-w-md px-8">
                <div className="bg-white rounded-lg p-8 shadow-lg">
                    <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                        Đăng nhập
                    </h1>
                    <form onSubmit={handleLogin} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-800">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-base outline-none focus:border-purple-600 transition-colors"
                                value={credentials.email}
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-800">
                                Mật khẩu
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-base outline-none focus:border-purple-600 transition-colors"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-3 py-3 bg-purple-600 text-white rounded text-base font-medium cursor-pointer hover:bg-purple-700 transition-colors"
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
