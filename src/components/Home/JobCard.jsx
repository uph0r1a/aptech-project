const JobCard = ({ job }) => {
    return (
        <div className="h-full cursor-pointer transition-all bg-white rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1">
            <div className="relative p-4">
                <div className="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-red-500 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path
                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <div className="w-15 h-15 rounded-lg bg-gray-100 flex items-center justify-center mb-4 overflow-hidden">
                    {job.logo ? (
                        <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-2xl font-bold text-purple-600">{job.company.charAt(0)}</span>
                    )}
                </div>

                <h3 className="font-bold text-base mb-2 text-gray-800 line-clamp-2 leading-snug">
                    {job.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                <p className="text-sm text-green-600 font-semibold mb-2">{job.salary}</p>

                <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span>{job.location}</span>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-xs px-3 py-1 bg-gray-100 rounded-xl text-gray-600">
                        Còn {job.daysLeft} ngày
                    </span>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
