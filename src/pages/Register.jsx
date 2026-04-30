import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

//xem độ mạnh mật khẩu
const getStrength = (pw) => {
    let score = 0;
    if (pw.length >= 8) score++;           //cần ít nhất 8 ký tự
    if (/[A-Z]/.test(pw)) score++;         //cần ít nhất 1 chữ hoa
    if (/[0-9]/.test(pw)) score++;         //cần ít nhất 1 chữ số
    if (/[^A-Za-z0-9]/.test(pw)) score++;  //cần  ít nhất 1 dấu
    return score;
};

const strengthConfig = [
    { label: '', color: 'bg-gray-200' },
    { label: 'Yếu', color: 'bg-red-400' },
    { label: 'Trung bình', color: 'bg-yellow-400' },
    { label: 'Tốt', color: 'bg-blue-400' },
    { label: 'Mạnh', color: 'bg-green-500' },
];

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const strength = form.password ? getStrength(form.password) : 0;

    //kiểm tra dữ liệu 
    const validate = () => {
        const e = {};
        if (!form.fullName.trim()) e.fullName = 'Vui lòng nhập họ và tên.';
        if (!form.email.trim()) e.email = 'Vui lòng nhập email.';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email không hợp lệ.';
        if (!form.password) e.password = 'Vui lòng nhập mật khẩu.';
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
        //thêm gửi lên file php và mã hóa mật khẩu và gửi email xác nhận bằng phpmailer
    };

    const set = (field) => (ev) => {
        setForm((f) => ({ ...f, [field]: ev.target.value }));
        setErrors((er) => ({ ...er, [field]: undefined }));
    };

    if (success) {
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
                            Chào mừng <span className="font-medium text-gray-700">{form.fullName}</span> đến với JobHot!
                        </p>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors cursor-pointer"
                        >
                            Đăng nhập ngay
                        </button>
                    </div>
                </div>
            </div>
        );
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
                                className={`w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ${errors.fullName ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-gray-300 focus:border-purple-500'}`}
                                value={form.fullName}
                                onChange={set('fullName')}
                                autoComplete="name"
                            />
                            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="reg-email" className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="reg-email"
                                type="email"
                                placeholder="example@email.com"
                                className={`w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ${errors.email ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-gray-300 focus:border-purple-500'}`}
                                value={form.email}
                                onChange={set('email')}
                                autoComplete="email"
                            />
                            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="reg-password" className="text-sm font-medium text-gray-700">Mật khẩu</label>
                            <input
                                id="reg-password"
                                type="password"
                                placeholder="Tối thiểu 8 ký tự"
                                className={`w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ${errors.password ? 'border-red-400 focus:border-red-500 bg-red-50' : 'border-gray-300 focus:border-purple-500'}`}
                                value={form.password}
                                onChange={set('password')}
                                autoComplete="new-password"
                            />

                            {form.password && (
                                <div className="mt-1.5">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthConfig[strength].color : 'bg-gray-200'}`}
                                            />
                                        ))}
                                    </div>
                                    {strength > 0 && (
                                        <p className="text-xs mt-1 text-gray-500">
                                            Độ mạnh: <span className="font-medium">{strengthConfig[strength].label}</span>
                                        </p>
                                    )}
                                </div>
                            )}
                            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="confirm" className="text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                            <input
                                id="confirm"
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                className={`w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors ${errors.confirm ? 'border-red-400 focus:border-red-500 bg-red-50' : form.confirm && form.confirm === form.password ? 'border-green-400 focus:border-green-500' : 'border-gray-300 focus:border-purple-500'}`}
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
                            className="w-full py-2.5 mt-1 bg-purple-600 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-purple-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading && (
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                            )}
                            {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
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