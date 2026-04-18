const Header = () => {
    return (
        <header className="bg-purple-600 w-full">
            <div className="flex items-center px-8 py-4 max-w-7xl mx-auto">
                <div className="text-white font-bold text-2xl mr-8 cursor-pointer">
                    JobHot
                </div>
                <nav className="grow flex gap-4">
                    <button className="text-white px-4 py-2 rounded hover:bg-white/10 transition-colors">
                        Việc làm
                    </button>
                    <button className="text-white px-4 py-2 rounded hover:bg-white/10 transition-colors">
                        Công ty
                    </button>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="text-white px-4 py-2 rounded hover:bg-white/10 transition-colors">
                        Nhà tuyển dụng
                    </button>
                    <button className="bg-white text-purple-600 px-6 py-2 rounded font-medium hover:bg-gray-100 transition-colors">
                        Đăng nhập
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
