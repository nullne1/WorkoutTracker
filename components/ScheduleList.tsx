type ScheduleListProps = {
    hasSchedule: boolean,
    viewingSchedules: boolean,
    viewingDays: string,
    creatingNewSchedule: boolean

    setViewingSchedules: (value: boolean) => void,
    setViewingDays: (value: string) => void,
    setCreatingNewSchedule: (value:boolean) => void
}

export default function ScheduleList({ hasSchedule, viewingSchedules, viewingDays, creatingNewSchedule, setViewingSchedules, setViewingDays, setCreatingNewSchedule }: ScheduleListProps) {
    const editScheduleClicked = () => {
        setCreatingNewSchedule(false);
        setViewingSchedules(false);
        setViewingDays("test");
    }

    const createNewScheduleClicked = () => {
        setCreatingNewSchedule(true);
        setViewingSchedules(false);
        setViewingDays("test");
    }

    return (
        <div>
            <div className="min-h-screen bg-gray-50 p-4 md:p-4 lg:p-4">
                <div className="mx-auto max-w-4xl p-6 md:p-10 lg:p-12 border border-gray-200 rounded-2xl bg-white shadow-sm flex flex-col gap-8">
                    
                    {/* Header Section */}
                    <div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                            Manage Schedules
                        </h1>
                        <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
                            Select your current routine to make changes, or build a new one from scratch.
                        </p>
                    </div>

                    {/* Selection Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Left Card: Edit Existing Schedule */}
                        {hasSchedule && (
                            <button className="group w-full h-full text-left focus:outline-none focus:ring-4 focus:ring-blue-100 rounded-xl transition-all"
                                    onClick={() => editScheduleClicked()}>
                                <div className="h-full flex flex-col p-6 md:p-8 rounded-xl border-2 border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 hover:shadow-md transition-all duration-200 relative overflow-hidden">
                                    
                                    {/* Active Badge */}
                                    <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-green-100 text-green-700 text-xs md:text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        Active
                                    </div>

                                    {/* Icon Box */}
                                    <div className="mb-4 md:mb-6 p-4 w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                        </svg>
                                    </div>
                                    
                                    <span className="text-xl md:text-2xl font-bold text-gray-900 block mb-1">Schedule 1</span>
                                    <span className="text-sm md:text-base text-gray-500 line-clamp-2">View or modify your current 7-day training split.</span>
                                </div>
                            </button>
                        )}
                        

                        {/* Right Card: Create New Schedule */}
                        <button className="group w-full h-full text-left focus:outline-none focus:ring-4 focus:ring-green-100 rounded-xl transition-all"
                                onClick={() => createNewScheduleClicked()}>
                            {/* Notice the border-dashed class here */}
                            <div className="h-full flex flex-col items-center justify-center p-6 md:p-8 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-green-500 hover:bg-green-50 hover:shadow-md transition-all duration-200">
                                
                                {/* Icon Box */}
                                <div className="mb-3 md:mb-4 p-4 w-16 h-16 flex items-center justify-center bg-white border border-gray-200 text-gray-400 rounded-full group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600 transition-colors shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                
                                <span className="text-lg md:text-xl font-bold text-gray-700 group-hover:text-gray-900 text-center">Create Schedule</span>
                                <span className="text-sm md:text-base text-gray-500 mt-1 text-center">Start fresh with a blank template.</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}