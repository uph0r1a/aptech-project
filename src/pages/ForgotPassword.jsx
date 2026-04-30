import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//Nhập email
const Email = ({ onNext }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra email
        if (!email.trim()) { setError('Vui lòng nhập email.'); return; }
        if (!/\S+@\S+\.\S+/.test(email)) { setError('Email không hợp lệ.'); return; }

        setLoading(true);

        //thêm fetch vào php để gửi mail

    };

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label htmlFor="fp-email" className="text-sm font-medium text-gray-700">Địa chỉ email</label>
                <input
                    id="fp-email"
                    type="email"
                    placeholder="example@email.com"
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-purple-500'}`}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    autoComplete="email"
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-purple-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
                {loading && (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                )}
                {loading ? 'Đang gửi...' : 'Gửi mã xác nhận'}
            </button>
        </form>
    );
};


//Nhập OTP
const OTP = ({ email, onNext }) => {
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resent, setResent] = useState(false);

    const inputs = useRef([]);

    const handleChange = (i, val) => {
        // kiểm tra số chỉ được từ 0-9
        if (!/^\d?$/.test(val)) return;

        const next = [...otp];
        next[i] = val;
        setOtp(next);
        setError('');

        // tự sang ô tiếp
        if (val && i < 5) inputs.current[i + 1]?.focus();
    };

    // chuyển về ô trước
    const handleKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !otp[i] && i > 0) {
            inputs.current[i - 1]?.focus();
        }
    };

    // paste thay vif nhập
    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (paste.length === 6) {
            setOtp(paste.split(''));
            inputs.current[5]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = otp.join('');

        if (code.length < 6) { setError('Vui lòng nhập đủ 6 chữ số.'); return; }

        setLoading(true);

        //thêm kiểm tra xem otp có đúng ko
    };

    // Gửi lại OTP cần thêm cooldown để ko spam gửi lại otp
    const handleResend = async () => {
        setResent(true);
        try {
            await fetch('/api/forgot-password.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
        } finally {
            setResent(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <p className="text-sm text-gray-500 text-center">
                Nhập mã 6 chữ số đã gửi đến <span className="font-medium text-gray-700">{email}</span>
            </p>

            <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                {otp.map((val, i) => (
                    <input
                        key={i}
                        ref={(el) => (inputs.current[i] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={val}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        className="w-11 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg outline-none focus:border-purple-500 transition-colors"
                    />
                ))}
            </div>

            {error && <p className="text-xs text-red-500 text-center">{error}</p>}

            <p className="text-center text-xs text-gray-400">
                Không nhận được mã?{' '}
                <button type="button" onClick={handleResend} className="text-purple-600 hover:underline cursor-pointer">
                    {resent ? '✓ Đã gửi lại!' : 'Gửi lại'}
                </button>
            </p>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-purple-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
                {loading && (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                )}
                {loading ? 'Đang xác minh...' : 'Xác nhận'}
            </button>
        </form>
    );
};


//Đổi mật khẩu
const NewPassword = ({ onDone }) => {
    const [form, setForm] = useState({ password: '', confirm: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // check mật khẩu
    const validate = () => {
        const e = {};
        if (!form.password) e.password = 'Vui lòng nhập mật khẩu mới.';
        else if (form.password.length < 8) e.password = 'Mật khẩu tối thiểu 8 ký tự.';
        if (!form.confirm) e.confirm = 'Vui lòng xác nhận mật khẩu.';
        else if (form.confirm !== form.password) e.confirm = 'Mật khẩu không khớp.';
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length) return;

        setLoading(true);

        //thêm xác định tài khoản cần cập nhật, sau đó vô hiệu hóa OTP
    };

    //cập nhật từng trường
    const set = (field) => (ev) => {
        setForm((f) => ({ ...f, [field]: ev.target.value }));
        setErrors((er) => ({ ...er, [field]: undefined }));
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label htmlFor="new-pw" className="text-sm font-medium text-gray-700">Mật khẩu mới</label>
                <input
                    id="new-pw"
                    type="password"
                    placeholder="Tối thiểu 8 ký tự"
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300 focus:border-purple-500'}`}
                    value={form.password}
                    onChange={set('password')}
                    autoComplete="new-password"
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="confirm-pw" className="text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
                <input
                    id="confirm-pw"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    className={`w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ${errors.confirm ? 'border-red-400 bg-red-50' : form.confirm && form.confirm === form.password ? 'border-green-400' : 'border-gray-300 focus:border-purple-500'}`}
                    value={form.confirm}
                    onChange={set('confirm')}
                    autoComplete="new-password"
                />
                {errors.confirm && <p className="text-xs text-red-500">{errors.confirm}</p>}
                {!errors.confirm && form.confirm && form.confirm === form.password && (
                    <p className="text-xs text-green-500">✓ Mật khẩu khớp</p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-purple-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
                {loading && (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                )}
                {loading ? 'Đang lưu...' : 'Đặt mật khẩu mới'}
            </button>
        </form>
    );
};

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');

    const stepTitles = [
        { title: 'Quên mật khẩu', subtitle: 'Nhập email để nhận mã xác nhận' },
        { title: 'Xác minh email', subtitle: 'Nhập mã OTP đã gửi đến email' },
        { title: 'Mật khẩu mới', subtitle: 'Tạo mật khẩu mới cho tài khoản' },
    ];

    if (step === 3) {
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
                            onClick={() => navigate('/login')}
                            className="w-full py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-600 to-purple-400">
            <div className="w-full max-w-md px-4">

                <div className="text-center mb-6">
                    <Link to="/" className="text-white font-bold text-3xl tracking-tight">JobHot</Link>
                    <p className="text-purple-100 text-sm mt-1">Tìm việc làm dễ dàng hơn</p>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-xl">

                    <button
                        onClick={() => step === 0 ? navigate('/login') : setStep((s) => s - 1)}
                        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer mb-5"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                        </svg>
                        {step === 0 ? 'Quay lại đăng nhập' : 'Quay lại'}
                    </button>

                    <div className="flex items-center gap-1.5 justify-center mb-6">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all ${i === step ? 'w-6 bg-purple-600' : i < step ? 'w-1.5 bg-purple-300' : 'w-1.5 bg-gray-200'}`}
                            />
                        ))}
                    </div>

                    <h1 className="text-2xl font-bold text-center mb-1 text-gray-800">{stepTitles[step].title}</h1>
                    <p className="text-center text-gray-500 text-sm mb-6">{stepTitles[step].subtitle}</p>

                    {step === 0 && <Email onNext={(e) => { setEmail(e); setStep(1); }} />}
                    {step === 1 && <OTP email={email} onNext={() => setStep(2)} />}
                    {step === 2 && <NewPassword onDone={() => setStep(3)} />}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;