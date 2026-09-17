type DayListProps = {
    editingSchedule: string,
    editingDay: string,

    setEditingSchedule: (value: string) => void,
    setEditingDay: (value: string) => void
}

export default function DayList({ editingSchedule, editingDay, setEditingSchedule, setEditingDay }: DayListProps) {
    const weeklySplit = [
        { day: "Day 1", name: "Monday", routine: "Push (Chest, Shoulders, Triceps)" },
        { day: "Day 2", name: "Tuesday", routine: "Pull (Back, Biceps)" },
        { day: "Day 3", name: "Wednesday", routine: "Legs & Core" },
        { day: "Day 4", name: "Thursday", routine: "Rest" },
        { day: "Day 5", name: "Friday", routine: "Full Body (Household Objects)" },
        { day: "Day 6", name: "Saturday", routine: "Active Recovery" },
        { day: "Day 7", name: "Sunday", routine: "Rest" },
    ];

    const editDayClicked = (day: string) => {
        setEditingSchedule("");
        setEditingDay(day);
    }

    return (
        <div>
            <div className="max-w-6xl mx-auto mb-6 md:mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                        Workout Schedule
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">
                        Select a day to edit your split and assign exercises.
                    </p>
                </div>
                
                {/* Primary Action Button: Full width on mobile, auto-width on desktop */}
                <button className="w-full md:w-auto px-6 py-3 md:py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors text-base md:text-lg">
                    Save Schedule
                </button>
            </div>

            {/* The 7-Box Grid: 
                Mobile: 1 column (stacked)
                Tablet: 2 columns
                Desktop: 4 columns (Day 7 naturally drops to the second row)
            */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                
                {weeklySplit.map((item, index) => (
                    <div 
                        key={index} 
                        className="bg-white border rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                    >
                        {/* Box Header: Day Name and Edit Icon Box */}
                        <div className="flex justify-between items-start mb-4 md:mb-6">
                            <div>
                                <span className="text-xs md:text-sm font-semibold text-blue-600 uppercase tracking-wider">
                                    {item.day}
                                </span>
                                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                                    {item.name}
                                </h2>
                            </div>
                            
                            {/* Icon Box: Clickable target for editing */}
                            <button 
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label={`Edit ${item.name}`}
                                onClick={() => editDayClicked(item.name)}
                            >   
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>

                        {/* Box Content: The assigned routine */}
                        <div className="mt-auto">
                            <div className={`p-3 md:p-4 rounded-lg border ${item.routine === "Rest" ? "bg-gray-50 border-gray-100 text-gray-500" : "bg-blue-50 border-blue-100 text-blue-800"}`}>
                                <span className="text-sm md:text-base font-medium block">
                                    {item.routine}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}