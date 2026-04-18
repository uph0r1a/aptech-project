import JobCard from './JobCard';

const mockJobs = [
    {
        id: 1,
        title: 'Trưởng Phòng Đào Tạo - Tập Đoàn Giáo Dục',
        company: 'Công ty TNHH Giáo Dục ABC',
        salary: '15-20 triệu',
        location: 'Hà Nội',
        daysLeft: 30,
        logo: null,
    },
    {
        id: 2,
        title: 'Kỹ Sư Xây Dựng Cầu Đường - Dự Án Long',
        company: 'Công ty Xây Dựng XYZ',
        salary: '12-18 triệu',
        location: 'Hồ Chí Minh',
        daysLeft: 25,
        logo: null,
    },
    {
        id: 3,
        title: 'Nhân Viên Kế Toán - Kế Toán Tổng Hợp',
        company: 'Công ty Tài Chính DEF',
        salary: '8-12 triệu',
        location: 'Đà Nẵng',
        daysLeft: 20,
        logo: null,
    },
    {
        id: 4,
        title: 'Nhân Viên Kinh Doanh - Bất Động Sản',
        company: 'Công ty BĐS GHI',
        salary: '10-15 triệu',
        location: 'Hà Nội',
        daysLeft: 15,
        logo: null,
    },
    {
        id: 5,
        title: 'Lập Trình Viên Full Stack - ReactJS',
        company: 'Công ty Công Nghệ JKL',
        salary: '20-30 triệu',
        location: 'Hồ Chí Minh',
        daysLeft: 28,
        logo: null,
    },
    {
        id: 6,
        title: 'Nhân Viên Marketing - Digital Marketing',
        company: 'Công ty Truyền Thông MNO',
        salary: '10-15 triệu',
        location: 'Hà Nội',
        daysLeft: 22,
        logo: null,
    },
];

const JobList = () => {
    return (
        <div className="flex-1">
            <div className="w-full h-50 rounded-lg bg-linear-to-r from-blue-500 to-blue-800 mb-8 flex items-center justify-center text-white text-4xl font-bold">
                JobHot Banner
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg text-red-500 m-0">Việc làm tốt nhất</h2>
                <a href="/jobs" className="text-sm text-purple-600 no-underline hover:underline">
                    Xem tất cả →
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {mockJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>

            <div className="flex justify-between items-center mb-6 mt-8">
                <h2 className="font-bold text-lg text-red-500 m-0">Việc làm hấp dẫn</h2>
                <a href="/jobs/featured" className="text-sm text-purple-600 no-underline hover:underline">
                    Xem tất cả →
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockJobs.slice(0, 3).map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default JobList;
