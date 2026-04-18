const Hero = () => {
    return (
        <section className="bg-linear-to-r from-purple-600 to-purple-400 text-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="font-bold text-3xl mb-2">
                    Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc
                </h1>
                <p className="text-base opacity-90 mb-8">
                    Tiếp cận 40,000+ tin tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam
                </p>

                <div className="bg-white rounded-lg p-4 flex gap-4 items-center flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-sm text-gray-900 outline-none focus:border-purple-600 focus:bg-white"
                            placeholder="Vị trí tuyển dụng"
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-sm text-gray-900 outline-none focus:border-purple-600 focus:bg-white"
                            placeholder="Tất cả địa điểm"
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-sm text-gray-900 outline-none focus:border-purple-600 focus:bg-white"
                            placeholder="Tất cả mức lương"
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-sm text-gray-900 outline-none focus:border-purple-600 focus:bg-white"
                            placeholder="Tất cả kinh nghiệm"
                        />
                    </div>
                    <button className="bg-green-500 text-white px-8 py-3 rounded font-medium hover:bg-green-600 transition-colors">
                        Tìm việc
                    </button>
                </div>

                <div className="flex gap-4 mt-6 flex-wrap">
                    <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition-colors">
                        Hà Nội: 40.000
                    </button>
                    <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition-colors">
                        Hồ Chí Minh
                    </button>
                    <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition-colors">
                        Đà Nẵng
                    </button>
                    <button className="bg-white/20 text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition-colors">
                        Hải Phòng
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
