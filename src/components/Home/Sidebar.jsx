const Sidebar = () => {
    const workTypes = [
        'Nhân viên chính thức',
        'Nhân viên bán thời gian',
        'Nhân viên thời vụ',
        'Freelancer',
        'Thực tập sinh',
    ];

    const levels = [
        'Mới tốt nghiệp',
        'Nhân viên',
        'Trưởng nhóm',
        'Trưởng phòng',
        'Giám đốc',
    ];

    return (
        <aside className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 mb-2">Hình thức làm việc</h3>
            <ul className="list-none p-0 m-0">
                {workTypes.map((type, index) => (
                    <li
                        key={index}
                        className="py-2 cursor-pointer text-sm text-gray-600 hover:bg-gray-50 hover:pl-2 transition-all"
                    >
                        {type}
                    </li>
                ))}
            </ul>

            <hr className="my-4 border-gray-200" />

            <h3 className="font-bold text-sm text-gray-800 mb-2">Cấp bậc</h3>
            <ul className="list-none p-0 m-0">
                {levels.map((level, index) => (
                    <li
                        key={index}
                        className="py-2 cursor-pointer text-sm text-gray-600 hover:bg-gray-50 hover:pl-2 transition-all"
                    >
                        {level}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
