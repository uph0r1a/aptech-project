import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';


//Icon loading
const SpinnerIcon = () => (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
);

//Nhập email
const Email = ({ onNext }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Kiểm tra email không được trống
        if (!email.trim()) {
            setError('Vui lòng nhập email.');
            return;
        }

        //Kiểm tra email hợp lệ
        const emailRegex = /\S+@\S+\.\S+/;
        const emailIsValid = emailRegex.test(email);

        if (!emailIsValid) {
            setError('Email không hợp lệ.');
            return;
        }

        setLoading(true);

        //TODO: Gọi API PHP để gửi mã OTP đến email người dùng
        //Cách làm:
        //1. Gửi POST request đến file PHP
        //2. Truyền email trong body dưới dạng JSON
        //3. PHP sẽ tạo mã OTP, lưu vào database, rồi gửi email cho người dùng
        //4. Nếu thành công thì gọi onNext(email) để qua bước nhập OTP
        //5. Nếu thất bại thì hiện lỗi và tắt loading
    };

    //class viền cho input email
    let inputClass = 'w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ';

    if (error) {
        inputClass = inputClass + 'border-red-400 bg-red-50';
    } else {
        inputClass = inputClass + 'border-gray-300 focus:border-purple-500';
    }

    //chữ hiển thị trên nút submit
    let buttonText = 'Gửi mã xác nhận';

    if (loading) {
        buttonText = 'Đang gửi...';
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label htmlFor="fp-email" className="text-sm font-medium text-gray-700">
                    Địa chỉ email
                </label>
                <input
                    id="fp-email"
                    type="email"
                    placeholder="example@email.com"
                    className={inputClass}
                    value={email}
                    onChange={handleEmailChange}
                    autoComplete="email"
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-purple-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
                {loading && <SpinnerIcon />}
                {buttonText}
            </button>
        </form>
    );
};


//Nhập OTP
const OTP = ({ email, onNext }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resent, setResent] = useState(false);

    const inputs = useRef([]);

    //Xử lý người dùng nhập vào từng ô
    const handleChange = (index, value) => {
        //Chỉ cho phép nhập chữ số 0-9, hoặc xóa trống
        const isValidDigit = /^\d?$/.test(value);

        if (!isValidDigit) {
            return;
        }

        //Sao chép mảng OTP hiện tại, sau đó cập nhật ô vừa nhập
        const newOtp = otp.slice();
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        //Nếu đã nhập và chưa phải ô cuối, tự chuyển sang ô kế tiếp
        const isNotLastInput = index < 5;

        if (value && isNotLastInput) {
            const nextInput = inputs.current[index + 1];

            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    //Khi nhấn Backspace ở ô trống, quay về ô trước
    const handleKeyDown = (index, e) => {
        const isBackspace = e.key === 'Backspace';
        const currentCellEmpty = !otp[index];
        const isNotFirstInput = index > 0;

        if (isBackspace && currentCellEmpty && isNotFirstInput) {
            const prevInput = inputs.current[index - 1];

            if (prevInput) {
                prevInput.focus();
            }
        }
    };

    //Xử lý dán (Ctrl+V) toàn bộ mã OTP một lần
    const handlePaste = (e) => {
        const pastedText = e.clipboardData.getData('text');
        const digitsOnly = pastedText.replace(/\D/g, '').slice(0, 6);

        if (digitsOnly.length === 6) {
            setOtp(digitsOnly.split(''));

            const lastInput = inputs.current[5];

            if (lastInput) {
                lastInput.focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const code = otp.join('');

        if (code.length < 6) {
            setError('Vui lòng nhập đủ 6 chữ số.');
            return;
        }

        setLoading(true);

        // TODO: Gửi OTP lên server PHP để xác minh
        // Cách làm:
        //   1. Gửi POST request đến file PHP (ví dụ: /api/verify-otp.php)
        //   2. Truyền email và mã OTP trong body dưới dạng JSON
        //   3. PHP sẽ so sánh mã OTP với mã đã lưu trong database
        //   4. Kiểm tra thêm xem OTP có còn hạn sử dụng không (ví dụ: 5 phút)
        //   5. Nếu đúng thì gọi onNext() để qua bước đặt mật khẩu mới
        //   6. Nếu sai hoặc hết hạn thì hiện lỗi và tắt loading
    };

    // TODO: Thêm cooldown (ví dụ 60 giây) để tránh spam gửi lại OTP
    // Cách làm:
    //   1. Dùng thêm một state đếm ngược (ví dụ: countdown) bắt đầu từ 60
    //   2. Dùng setInterval để đếm ngược mỗi giây
    //   3. Khi countdown > 0 thì ẩn nút "Gửi lại" hoặc hiện chữ "Gửi lại sau Xs"
    //   4. Khi countdown = 0 thì cho phép nhấn gửi lại
    const handleResend = async () => {
        setResent(true);

        // TODO: Gửi lại OTP cho người dùng
        // Cách làm:
        //   1. Gọi lại cùng API đã dùng ở bước 1 (/api/forgot-password.php)
        //   2. PHP sẽ tạo mã OTP mới, xóa mã cũ, rồi gửi email lại
        //   3. Sau khi gửi xong (dù thành công hay thất bại) thì tắt trạng thái resent

        setResent(false);
    };

    // Xác định chữ của nút gửi lại
    let resendText = 'Gửi lại';

    if (resent) {
        resendText = 'Đã gửi lại!';
    }

    // Xác định chữ hiển thị trên nút submit
    let buttonText = 'Xác nhận';

    if (loading) {
        buttonText = 'Đang xác minh...';
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <p className="text-sm text-gray-500 text-center">
                Nhập mã 6 chữ số đã gửi đến{' '}
                <span className="font-medium text-gray-700">{email}</span>
            </p>

            <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                {otp.map((value, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-11 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
                    />
                ))}
            </div>

            {error && <p className="text-xs text-red-500 text-center">{error}</p>}

            <p className="text-center text-xs text-gray-400">
                Không nhận được mã?{' '}
                <button type="button" onClick={handleResend} className="text-purple-600 hover:underline cursor-pointer">
                    {resendText}
                </button>
            </p>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-purple-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
                {loading && <SpinnerIcon />}
                {buttonText}
            </button>
        </form>
    );
};


//Đặt mật khẩu mới
const NewPassword = ({ onDone }) => {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [loading, setLoading] = useState(false);

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

        if (!password) {
            setPasswordError('Vui lòng nhập mật khẩu mới.');
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

        // TODO: Gửi mật khẩu mới lên server PHP để cập nhật
        // Cách làm:
        //   1. Gửi POST request đến file PHP (ví dụ: /api/reset-password.php)
        //   2. Truyền email (hoặc token từ bước OTP) và mật khẩu mới trong body
        //   3. PHP sẽ tìm tài khoản theo email, cập nhật mật khẩu mới (đã hash)
        //   4. Sau khi cập nhật xong thì đánh dấu OTP là đã dùng (vô hiệu hóa)
        //   5. Nếu thành công thì gọi onDone() để hiện màn hình thành công
        //   6. Nếu thất bại thì hiện lỗi và tắt loading

    };

    // Xác định class viền cho ô mật khẩu
    let passwordInputClass = 'w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ';

    if (passwordError) {
        passwordInputClass = passwordInputClass + 'border-red-400 bg-red-50';
    } else {
        passwordInputClass = passwordInputClass + 'border-gray-300 focus:border-purple-500';
    }

    // Xác định class viền cho ô xác nhận mật khẩu
    let confirmInputClass = 'w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ';

    if (confirmError) {
        confirmInputClass = confirmInputClass + 'border-red-400 bg-red-50';
    } else if (confirm && confirm === password) {
        confirmInputClass = confirmInputClass + 'border-green-400';
    } else {
        confirmInputClass = confirmInputClass + 'border-gray-300 focus:border-purple-500';
    }

    // Xác định chữ hiển thị trên nút submit
    let buttonText = 'Đặt mật khẩu mới';

    if (loading) {
        buttonText = 'Đang lưu...';
    }

    // Kiểm tra có nên hiện thông báo "Mật khẩu khớp" không
    let shouldShowMatchMessage = false;

    if (!confirmError && confirm && confirm === password) {
        shouldShowMatchMessage = true;
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label htmlFor="new-pw" className="text-sm font-medium text-gray-700">
                    Mật khẩu mới
                </label>
                <input
                    id="new-pw"
                    type="password"
                    placeholder="Tối thiểu 8 ký tự"
                    className={passwordInputClass}
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="new-password"
                />
                {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="confirm-pw" className="text-sm font-medium text-gray-700">
                    Xác nhận mật khẩu mới
                </label>
                <input
                    id="confirm-pw"
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
                className="w-full py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-purple-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
                {loading && <SpinnerIcon />}
                {buttonText}
            </button>
        </form>
    );
};


//Quên mật khẩu
const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');

    const stepTitles = [
        { title: 'Quên mật khẩu', subtitle: 'Nhập email để nhận mã xác nhận' },
        { title: 'Xác minh email', subtitle: 'Nhập mã OTP đã gửi đến email' },
        { title: 'Mật khẩu mới', subtitle: 'Tạo mật khẩu mới cho tài khoản' },
    ];

    // Xử lý nút quay lại:về trang login,sau về bước trước
    const handleBack = () => {
        if (step === 0) {
            navigate('/login');
        } else {
            setStep(step - 1);
        }
    };

    // Xác định chữ của nút quay lại
    let backButtonLabel = 'Quay lại';

    if (step === 0) {
        backButtonLabel = 'Quay lại đăng nhập';
    }

    // Màn hình thành công sau khi đặt mật khẩu xong
    if (step === 3) {
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
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Đặt lại thành công!</h2>
                        <p className="text-gray-500 text-sm mb-6">Mật khẩu đã được cập nhật. Vui lòng đăng nhập lại.</p>
                        <button
                            onClick={goToLogin}
                            className="w-full py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Hàm nhận email từ component Email rồi chuyển sang bước OTP
    const handleEmailDone = (submittedEmail) => {
        setEmail(submittedEmail);
        setStep(1);
    };

    // Hàm chuyển từ bước OTP sang bước đặt mật khẩu
    const handleOtpDone = () => {
        setStep(2);
    };

    // Hàm chuyển từ bước đặt mật khẩu sang màn hình thành công
    const handlePasswordDone = () => {
        setStep(3);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-600 to-purple-400">
            <div className="w-full max-w-md px-4">
                <div className="text-center mb-6">
                    <Link to="/" className="text-white font-bold text-3xl tracking-tight">JobHot</Link>
                    <p className="text-purple-100 text-sm mt-1">Tìm việc làm dễ dàng hơn</p>
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer mb-5"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        {backButtonLabel}
                    </button>
                    <div className="flex items-center gap-1.5 justify-center mb-6">
                        {[0, 1, 2].map((i) => {
                            let dotClass = 'h-1.5 rounded-full transition-all ';

                            if (i === step) {
                                dotClass = dotClass + 'w-6 bg-purple-600';   // Bước hiện tại
                            } else if (i < step) {
                                dotClass = dotClass + 'w-1.5 bg-purple-300'; // Bước đã qua
                            } else {
                                dotClass = dotClass + 'w-1.5 bg-gray-200';   // Bước chưa tới
                            }

                            return <div key={i} className={dotClass} />;
                        })}
                    </div>

                    <h1 className="text-2xl font-bold text-center mb-1 text-gray-800">
                        {stepTitles[step].title}
                    </h1>
                    <p className="text-center text-gray-500 text-sm mb-6">
                        {stepTitles[step].subtitle}
                    </p>

                    {step === 0 && <Email onNext={handleEmailDone} />}
                    {step === 1 && <OTP email={email} onNext={handleOtpDone} />}
                    {step === 2 && <NewPassword onDone={handlePasswordDone} />}

                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
