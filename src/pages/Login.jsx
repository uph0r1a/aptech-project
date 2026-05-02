import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


//Icon spinner dùng chung cho nút loading
const SpinnerIcon = () => (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
);


//Icon mắt để ẩn/hiện mật khẩu
const EyeIcon = ({ open }) => {
    // Nếu open = true thì hiện icon mắt mở (đang thấy mật khẩu)
    if (open) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        );
    }

    // Nếu open = false thì hiện icon mắt gạch (đang ẩn mật khẩu)
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );
};


//Trang đăng nhập
const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
        setServerError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
        setServerError('');
    };

    // Bật/tắt hiển thị mật khẩu
    const toggleShowPassword = () => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }
    };

    // Kiểm tra hợp lệ, trả về true nếu không có lỗi
    const validate = () => {
        let isValid = true;

        if (!email.trim()) {
            setEmailError('Vui lòng nhập email.');
            isValid = false;
        } else {
            const emailRegex = /\S+@\S+\.\S+/;
            const emailIsValid = emailRegex.test(email);

            if (!emailIsValid) {
                setEmailError('Email không hợp lệ.');
                isValid = false;
            }
        }

        if (!password) {
            setPasswordError('Vui lòng nhập mật khẩu.');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Mật khẩu tối thiểu 6 ký tự.');
            isValid = false;
        }

        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        setServerError('');

        const isValid = validate();
        if (!isValid) {
            return;
        }

        setLoading(true);

        // TODO: Gửi email và mật khẩu lên server PHP để kiểm tra đăng nhập
        // Cách làm:
        //   1. Gửi POST request đến file PHP (ví dụ: /api/login.php)
        //   2. Truyền email và password trong body dưới dạng JSON
        //   3. PHP sẽ tìm tài khoản theo email trong database
        //   4. So sánh mật khẩu đã nhập với mật khẩu đã hash trong database
        //   5. Nếu đúng thì tạo session hoặc trả về token, rồi gọi navigate('/') để về trang chủ
        //   6. Nếu sai thì hiện lỗi serverError và tắt loading

    };

    // Xác định class viền cho ô email
    let emailInputClass = 'w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ';

    if (emailError) {
        emailInputClass = emailInputClass + 'border-red-400 focus:border-red-500 bg-red-50';
    } else {
        emailInputClass = emailInputClass + 'border-gray-300 focus:border-purple-500';
    }

    // Xác định class viền cho ô mật khẩu
    let passwordInputClass = 'w-full px-3 py-2.5 pr-10 border rounded-lg text-sm outline-none transition-colors ';

    if (passwordError) {
        passwordInputClass = passwordInputClass + 'border-red-400 focus:border-red-500 bg-red-50';
    } else {
        passwordInputClass = passwordInputClass + 'border-gray-300 focus:border-purple-500';
    }

    // Xác định kiểu input mật khẩu (ẩn hay hiện)
    let passwordInputType = 'password';

    if (showPassword) {
        passwordInputType = 'text';
    }

    // Xác định chữ hiển thị trên nút submit
    let buttonText = 'Đăng nhập';

    if (loading) {
        buttonText = 'Đang đăng nhập...';
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-600 to-purple-400">
            <div className="w-full max-w-md px-4">
                <div className="text-center mb-6">
                    <Link to="/" className="text-white font-bold text-3xl tracking-tight">JobHot</Link>
                    <p className="text-purple-100 text-sm mt-1">Tìm việc làm dễ dàng hơn</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                    <h1 className="text-2xl font-bold text-center mb-1 text-gray-800">Đăng nhập</h1>
                    <p className="text-center text-gray-500 text-sm mb-6">Chào mừng bạn quay trở lại!</p>
                    {serverError && (
                        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                            {serverError}
                        </div>
                    )}

                    <form onSubmit={handleLogin} noValidate className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="example@email.com"
                                className={emailInputClass}
                                value={email}
                                onChange={handleEmailChange}
                                autoComplete="email"
                            />
                            {emailError && <p className="text-xs text-red-500">{emailError}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700">Mật khẩu</label>
                                <Link to="/forgot-password" className="text-xs text-purple-600 hover:text-purple-700 hover:underline">
                                    Quên mật khẩu?
                                </Link>
                            </div>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={passwordInputType}
                                    placeholder="••••••••"
                                    className={passwordInputClass}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    tabIndex={-1}
                                >
                                    <EyeIcon open={showPassword} />
                                </button>
                            </div>
                            {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 mt-2 bg-purple-600 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-purple-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading && <SpinnerIcon />}
                            {buttonText}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Chưa có tài khoản?{' '}
                        <Link to="/register" className="text-purple-600 font-medium hover:underline">Đăng ký ngay</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;