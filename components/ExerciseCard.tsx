type ExerciseCardProps = {
    name?: string;
    category?: string;
    sets?: string | number;
    reps?: number;
    muscle?: string;
    notes?: string;
    onEdit?: () => void;
};

export default function ExerciseCard({
    name = "Barbell Bench Press",
    category = "Compound • Barbell",
    sets = 3,
    reps = 8,
    muscle = "Chest",
    notes = "Keep scapulae retracted and pause 1 second at the bottom.",
    onEdit
}: ExerciseCardProps) {
    return (
        <button 
            type="button"
            onClick={onEdit}
            className="group w-full text-left focus:outline-none focus:ring-4 focus:ring-blue-100 rounded-xl transition-all"
        >
            <div className="flex flex-col p-4 md:p-6 rounded-xl border-2 border-gray-200 bg-white group-hover:border-blue-500 group-hover:bg-blue-50 group-hover:shadow-md transition-all duration-200 gap-4">
                
                {/* Top Row: Icon, Title, and Stat Boxes */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 w-full">
                    
                    {/* Left Side: Icon Box and Exercise Name */}
                    <div className="flex items-center gap-3.5 md:gap-4 min-w-0">
                        {/* <div className="p-3 md:p-3 bg-gray-100 text-gray-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div> */}
                        <div className="min-w-0 flex-1">
                            <h4 className="text-lg md:text-xl font-bold text-gray-900 truncate">
                                {name}
                            </h4>
                            <span className="text-xs md:text-sm text-gray-500 font-medium block mt-0.5">
                                {category}
                            </span>
                        </div>
                    </div>

                    {/* Right Side: Information Display Boxes (Sets, Reps, Muscle) */}
                    <div className="grid grid-cols-3 md:flex items-center gap-2 md:gap-3 w-full md:w-auto shrink-0">
                        
                        {/* Sets Display Box */}
                        <div className="flex flex-col items-center justify-center bg-gray-50 group-hover:bg-white border border-gray-200 group-hover:border-blue-200 px-3 py-2 md:min-w-[4.5rem] rounded-lg transition-colors">
                            <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-semibold">
                                Sets
                            </span>
                            <span className="text-sm md:text-base font-bold text-gray-900 tabular-nums mt-0.5">
                                {sets}
                            </span>
                        </div>

                        {/* Reps Display Box */}
                        <div className="flex flex-col items-center justify-center bg-gray-50 group-hover:bg-white border border-gray-200 group-hover:border-blue-200 px-3 py-2 md:min-w-[4.5rem] rounded-lg transition-colors">
                            <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-semibold">
                                Reps
                            </span>
                            <span className="text-sm md:text-base font-bold text-gray-900 tabular-nums mt-0.5">
                                {reps}
                            </span>
                        </div>

                        {/* Target Muscle Display Box */}
                        <div className="flex flex-col items-center justify-center bg-gray-50 group-hover:bg-white border border-gray-200 group-hover:border-blue-200 px-3 py-2 md:min-w-[5.5rem] rounded-lg transition-colors">
                            <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-semibold">
                                Muscle
                            </span>
                            <span className="text-sm md:text-base font-bold text-blue-600 mt-0.5 truncate max-w-full">
                                {muscle}
                            </span>
                        </div>

                    </div>
                </div>

                {/* Optional Bottom Row: Notes or Form Cues */}
                {/* {notes && (
                    <div className="pt-3 border-t border-gray-100 group-hover:border-blue-200 transition-colors flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-hover:text-blue-500 shrink-0 mt-0.5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                            {notes}
                        </p>
                    </div>
                )} */}

            </div>
        </button>
    );
}