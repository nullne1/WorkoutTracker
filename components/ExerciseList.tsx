import { useState } from "react";

type ExerciseListProps = {

};

export default function ExerciseList() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        // If the clicked card is already open, close it. Otherwise, open the new one.
        setExpandedId(expandedId === id ? null : id);
    }
    return (
        <div>
           <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12">
                <div className="mx-auto max-w-3xl p-6 md:p-10 border border-gray-200 rounded-2xl bg-white shadow-sm flex flex-col gap-6 md:gap-8">
                    
                    {/* Header Section */}
                    <div>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                            Day 1: Push
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 mt-1">
                            Click an exercise to edit its details, or add a new movement.
                        </p>
                    </div>

                    {/* Vertical Single-Column List */}
                    <div className="flex flex-col gap-4 md:gap-5">

                        {/* 2. Create New Exercise */}
                        <div className={`border-2 border-dashed rounded-xl transition-colors duration-200 overflow-hidden ${expandedId === 'new' ? 'border-green-500 bg-white shadow-md' : 'border-gray-300 bg-gray-50 hover:border-green-400'}`}>
                            
                            {/* Summary Header (Clickable Toggle) */}
                            <button 
                                onClick={() => toggleExpand('new')}
                                className="w-full text-left flex items-center justify-center p-4 md:p-6 focus:outline-none gap-3"
                            >
                                <div className={`p-2 rounded-full border transition-colors shrink-0 shadow-sm ${expandedId === 'new' ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-200 text-gray-400'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 md:h-6 md:w-6 transition-transform duration-300 ${expandedId === 'new' ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <span className={`text-base md:text-lg font-bold ${expandedId === 'new' ? 'text-gray-900' : 'text-gray-700'}`}>
                                    {expandedId === 'new' ? 'Close Form' : 'Add Exercise'}
                                </span>
                            </button>

                            {/* Dropdown Form Area (Blank) */}
                            <div className={`transition-all duration-300 ease-in-out ${expandedId === 'new' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-4 md:p-6 border-t border-gray-100 bg-white flex flex-col gap-4 md:gap-6">
                                    
                                    {/* Form Inputs Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                        <div className="md:col-span-3">
                                            <label className="block text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Exercise Name</label>
                                            <input type="text" placeholder="e.g., Incline Dumbbell Press" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow text-sm md:text-base text-gray-900 bg-white" />
                                        </div>
                                        
                                        {/* Additional fields formatted identically to the edit form */}
                                        <div>
                                            <label className="block text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Target Muscle</label>
                                            <input type="text" placeholder="e.g., Chest" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow text-sm md:text-base text-gray-900 bg-white" />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Sets</label>
                                            <input type="number" placeholder="3" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow text-sm md:text-base text-gray-900 bg-white" />
                                        </div>
                                        <div>
                                            <label className="block text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Reps</label>
                                            <input type="text" placeholder="8-12" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow text-sm md:text-base text-gray-900 bg-white" />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col md:flex-row justify-end items-center gap-3 pt-2 md:pt-4">
                                        <button onClick={() => setExpandedId(null)} className="w-full md:w-auto px-4 py-2 text-gray-600 hover:bg-gray-100 font-medium rounded-lg transition-colors text-sm md:text-base">Cancel</button>
                                        <button className="w-full md:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm md:text-base shadow-sm">Add to Workout</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}