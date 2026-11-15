import type { ScheduleRecord } from "@/types/database";
import type { DayRecord } from "@/types/database";

type DayListProps = {
    dayEditing: DayRecord | null;
    scheduleEditing: ScheduleRecord | null;
    viewingDays: boolean;
    viewingExercises: boolean;
    creatingNewSchedule: boolean;

    setDayEditing: (value: DayRecord) => void;
    setScheduleEditing: (value: ScheduleRecord) => void;
    setViewingDays: (value: boolean) => void;
    setViewingExercises: (value: boolean) => void;
    setCreatingNewSchedule: (value: boolean) => void;
}

export default function DayList({ dayEditing, scheduleEditing, viewingDays, viewingExercises, creatingNewSchedule, setDayEditing, setScheduleEditing, setViewingDays, setViewingExercises, setCreatingNewSchedule }: DayListProps) {
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const weeklySplit = [
        { day: "Day 1", name: "Monday", routine: "Push (Chest, Shoulders, Triceps)" },
        { day: "Day 2", name: "Tuesday", routine: "Pull (Back, Biceps)" },
        { day: "Day 3", name: "Wednesday", routine: "Legs & Core" },
        { day: "Day 4", name: "Thursday", routine: "Rest" },
        { day: "Day 5", name: "Friday", routine: "Full Body (Household Objects)" },
        { day: "Day 6", name: "Saturday", routine: "Active Recovery" },
        { day: "Day 7", name: "Sunday", routine: "Rest" },
    ];
    
    const editDayClicked = (day: DayRecord) => {
        setDayEditing(day)
        setViewingDays(false);
        setViewingExercises(true);
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 md:gap-6 p-4 md:p-8 lg:p-12">
                {(scheduleEditing?.days?.map((day, index) => (
                    <button 
                        key={day.id}
                        onClick={() => editDayClicked(day)}
                        className="group w-full h-full text-left focus:outline-none focus:ring-4 focus:ring-blue-100 rounded-xl transition-all"
                    >
                        <div className="bg-white border-2 border-gray-100 rounded-xl p-4 md:p-6 shadow-sm group-hover:border-blue-500 group-hover:bg-blue-50 group-hover:shadow-md transition-all duration-200 flex flex-col h-full">
                            
                            {/* Box Header: Day Name and Interactive Icon Box */}
                            <div className="flex justify-between items-start mb-4 md:mb-6">
                                <div>
                                    <span className="text-xs md:text-sm font-semibold text-blue-600 group-hover:text-blue-700 uppercase tracking-wider transition-colors">
                                        Day {index + 1}
                                    </span>
                                    <h2 className="text-lg md:text-xl font-bold text-gray-900">
                                        {day.name}
                                    </h2>
                                </div>
                                
                                {/* The icon now reacts to hovering over the entire card */}
                                <div className="p-2  text-gray-400 rounded-lg group-hover:text-blue-600 transition-colors shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Box Content: The assigned routine */}
                            <div className="mt-auto">
                                <div className={`p-3 md:p-4 rounded-lg border transition-colors ${
                                    day.name === "Rest" || day.routine === "N/A"
                                        ? "bg-gray-50 border-gray-200 text-gray-500 group-hover:bg-white group-hover:border-blue-200 group-hover:text-blue-600" 
                                        : "bg-blue-50 border-blue-200 text-blue-800 group-hover:bg-white"
                                }`}>
                                    <span className="text-sm md:text-base font-medium block">
                                        {day.routine}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </button>
                ))
            )}
        </div>
    )
}