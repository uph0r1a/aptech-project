import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


//Icon spinner dùng chung cho nút loading
const SpinnerIcon = () => (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
);


//Tính điểm độ mạnh mật khẩu (0 đến 4)
const getStrength = (pw) => {
    let score = 0;

    if (pw.length >= 8)
        score++;   // Cần ít nhất 8 ký tự

    if (/[A-Z]/.test(pw))
        score++;   // Cần ít nhất 1 chữ hoa

    if (/[0-9]/.test(pw))
        score++;   // Cần ít nhất 1 chữ số

    if (/[^A-Za-z0-9]/.test(pw))
        score++;   // Cần ít nhất 1 ký tự đặc biệt

    return score;
};

// Cấu hình nhãn và màu tương ứng với từng mức độ mạnh
const strengthConfig = [
    { label: '', color: 'bg-gray-200' },  // 0: chưa nhập
    { label: 'Yếu', color: 'bg-red-400' },  // 1
    { label: 'Trung bình', color: 'bg-yellow-400' }, // 2
    { label: 'Tốt', color: 'bg-blue-400' },  // 3
    { label: 'Mạnh', color: 'bg-green-500' },  // 4
];


//Trang đăng ký
const RegisterPage = () => {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
        setFullNameError('');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    const handleConfirmChange = (e) => {
        setConfirm(e.target.value);
        setConfirmError('');
    };

    // Kiểm tra hợp lệ, trả về true nếu không có lỗi
    const validate = () => {
        let isValid = true;

        if (!fullName.trim()) {
            setFullNameError('Vui lòng nhập họ và tên.');
            isValid = false;
        }

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
        } else if (password.length < 8) {
            setPasswordError('Mật khẩu tối thiểu 8 ký tự.');
            isValid = false;
        }

        if (!confirm) {
            setConfirmError('Vui lòng xác nhận mật khẩu.');
            isValid = false;
        } else if (confirm !== password) {
            setConfirmError('Mật khẩu không khớp.');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) {
            return;
        }

        setLoading(true);

        // TODO: Gửi thông tin đăng ký lên server PHP để tạo tài khoản
        // Cách làm:
        //   1. Gửi POST request đến file PHP (ví dụ: /api/register.php)
        //   2. Truyền họ tên, email và mật khẩu trong body dưới dạng JSON
        //   3. PHP kiểm tra xem email đã tồn tại trong database chưa
        //   4. Nếu chưa thì hash mật khẩu bằng password_hash() rồi lưu vào database
        //   5. Sau đó gửi email xác nhận tài khoản bằng PHPMailer
        //   6. Nếu thành công thì gọi setSuccess(true) để hiện màn hình thành công
        //   7. Nếu thất bại (email trùng, lỗi server...) thì hiện lỗi và tắt loading

    };

    // Màn hình thành công sau khi đăng ký xong
    if (success) {
        const goToLogin = () => {
            navigate('/login');
        };

        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-600 to-purple-400">
                <div className="w-full max-w-md px-4">
                    <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng ký thành công!</h2>
                        <p className="text-gray-500 text-sm mb-6">
                            Chào mừng <span className="font-medium text-gray-700">{fullName}</span> đến với JobHot!
                        </p>
                        <button
                            onClick={goToLogin}
                            className="w-full py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer"
                        >
                            Đăng nhập ngay
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Tính độ mạnh mật khẩu (chỉ tính khi đã nhập)
    let strength = 0;
    if (password) {
        strength = getStrength(password);
    }

    // Xác định class viền cho ô họ tên
    let fullNameInputClass = 'w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ';

    if (fullNameError) {
        fullNameInputClass = fullNameInputClass + 'border-red-400 focus:border-red-500 bg-red-50';
    } else {
        fullNameInputClass = fullNameInputClass + 'border-gray-300 focus:border-purple-500';
    }

    // Xác định class viền cho ô email
    let emailInputClass = 'w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ';

    if (emailError) {
        emailInputClass = emailInputClass + 'border-red-400 focus:border-red-500 bg-red-50';
    } else {
        emailInputClass = emailInputClass + 'border-gray-300 focus:border-purple-500';
    }

    // Xác định class viền cho ô mật khẩu
    let passwordInputClass = 'w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ';

    if (passwordError) {
        passwordInputClass = passwordInputClass + 'border-red-400 focus:border-red-500 bg-red-50';
    } else {
        passwordInputClass = passwordInputClass + 'border-gray-300 focus:border-purple-500';
    }

    // Xác định class viền cho ô xác nhận mật khẩu
    let confirmInputClass = 'w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ';

    if (confirmError) {
        confirmInputClass = confirmInputClass + 'border-red-400 focus:border-red-500 bg-red-50';
    } else if (confirm && confirm === password) {
        confirmInputClass = confirmInputClass + 'border-green-400 focus:border-green-500';
    } else {
        confirmInputClass = confirmInputClass + 'border-gray-300 focus:border-purple-500';
    }

    // Xác định chữ hiển thị trên nút submit
    let buttonText = 'Đăng ký';

    if (loading) {
        buttonText = 'Đang tạo tài khoản...';
    }

    // Kiểm tra có nên hiện thông báo "Mật khẩu khớp" không
    let shouldShowMatchMessage = false;

    if (!confirmError && confirm && confirm === password) {
        shouldShowMatchMessage = true;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-600 to-purple-400 py-8">
            <div className="w-full max-w-md px-4">
                <div className="text-center mb-6">
                    <Link to="/" className="text-white font-bold text-3xl tracking-tight">JobHot</Link>
                    <p className="text-purple-100 text-sm mt-1">Tìm việc làm dễ dàng hơn</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-xl">
                    <h1 className="text-2xl font-bold text-center mb-1 text-gray-800">Tạo tài khoản</h1>
                    <p className="text-center text-gray-500 text-sm mb-6">Miễn phí hoàn toàn, mãi mãi</p>

                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Họ và tên</label>
                            <input
                                id="fullName"
                                type="text"
                                placeholder="Nguyễn Văn A"
                                className={fullNameInputClass}
                                value={fullName}
                                onChange={handleFullNameChange}
                                autoComplete="name"
                            />
                            {fullNameError && <p className="text-xs text-red-500">{fullNameError}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="reg-email" className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="reg-email"
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
                            <label htmlFor="reg-password" className="text-sm font-medium text-gray-700">Mật khẩu</label>
                            <input
                                id="reg-password"
                                type="password"
                                placeholder="Tối thiểu 8 ký tự"
                                className={passwordInputClass}
                                value={password}
                                onChange={handlePasswordChange}
                                autoComplete="new-password"
                            />

                            {password && (
                                <div className="mt-1.5">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map((i) => {
                                            // Ô nào có chỉ số <= điểm mạnh thì tô màu, còn lại để xám
                                            let barColor = 'bg-gray-200';

                                            if (i <= strength) {
                                                barColor = strengthConfig[strength].color;
                                            }
                                            return <div key={i} className={'h-1 flex-1 rounded-full transition-colors ' + barColor} />;
                                        })}
                                    </div>
                                    {strength > 0 && (
                                        <p className="text-xs mt-1 text-gray-500">
                                            Độ mạnh: <span className="font-medium">{strengthConfig[strength].label}</span>
                                        </p>
                                    )}
                                </div>
                            )}
                            {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="confirm" className="text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                            <input
                                id="confirm"
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                className={confirmInputClass}
                                value={confirm}
                                onChange={handleConfirmChange}
                                autoComplete="new-password"
                            />
                            {confirmError && <p className="text-xs text-red-500">{confirmError}</p>}
                            {shouldShowMatchMessage && <p className="text-xs text-green-500">✓ Mật khẩu khớp</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 mt-1 bg-purple-600 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-purple-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading && <SpinnerIcon />}
                            {buttonText}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Đã có tài khoản?{' '}
                        <Link to="/login" className="text-purple-600 font-medium hover:underline">Đăng nhập</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;