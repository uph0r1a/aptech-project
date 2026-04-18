const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div className="flex flex-col">
                        <h3 className="font-bold mb-4 text-base">Về JobHot</h3>
                        <a href="/about" className="mb-2 cursor-pointer text-sm text-gray-300 no-underline hover:text-purple-400 transition-colors">
                            Giới thiệu
                        </a>
                        <a href="/contact" className="mb-2 cursor-pointer text-sm text-gray-300 no-underline hover:text-purple-400 transition-colors">
                            Liên hệ
                        </a>
                        <a href="/faq" className="mb-2 cursor-pointer text-sm text-gray-300 no-underline hover:text-purple-400 transition-colors">
                            Hỏi đáp
                        </a>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold mb-4 text-base">Dành cho ứng viên</h3>
                        <a href="/jobs" className="mb-2 cursor-pointer text-sm text-gray-300 no-underline hover:text-purple-400 transition-colors">
                            Tìm việc làm
                        </a>
                        <a href="/companies" className="mb-2 cursor-pointer text-sm text-gray-300 no-underline hover:text-purple-400 transition-colors">
                            Công ty
                        </a>
                        <a href="/career-guide" className="mb-2 cursor-pointer text-sm text-gray-300 no-underline hover:text-purple-400 transition-colors">
                            Cẩm nang nghề nghiệp
                        </a>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold mb-4 text-base">Dành cho nhà tuyển dụng</h3>
                        <a href="/post-job" className="mb-2 cursor-pointer text-sm text-gray-300 no-underline hover:text-purple-400 transition-colors">
                            Đăng tin tuyển dụng
                        </a>
                        <a href="/search-cv" className="mb-2 cursor-pointer text-sm text-gray-300 no-underline hover:text-purple-400 transition-colors">
                            Tìm hồ sơ
                        </a>
                        <a href="/services" className="mb-2 cursor-pointer text-sm text-gray-300 no-underline hover:text-purple-400 transition-colors">
                            Sản phẩm dịch vụ
                        </a>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="font-bold mb-4 text-base">Liên hệ</h3>
                        <p className="text-sm text-gray-300 mb-2">Email: [email]</p>
                        <p className="text-sm text-gray-300 mb-2">Hotline: [phone_number]</p>
                    </div>
                </div>
                <p className="text-center mt-8 pt-8 border-t border-white/10 opacity-70 text-sm">
                    © 2026 JobHot. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
