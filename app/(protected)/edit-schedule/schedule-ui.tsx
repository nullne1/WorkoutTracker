"use client";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";

interface ScheduleUI {
  title: string;
}

export default async function ScheduleUI({ title }: ScheduleUI) {
    const [viewingSchedules, setViewingSchedules] = useState(true);
    const [editingSchedule, setEditingSchedule] = useState("");
    const [editingDay, setEditingDay] = useState("");
    const [editingExercise, setEditingExercise] = useState("");

    const [expandedId, setExpandedId] = useState<string | null>(null);

    const { data: session, isPending, error, refetch } = authClient.useSession();

    const weeklySplit = [
            { day: "Day 1", name: "Monday", routine: "Push (Chest, Shoulders, Triceps)" },
            { day: "Day 2", name: "Tuesday", routine: "Pull (Back, Biceps)" },
            { day: "Day 3", name: "Wednesday", routine: "Legs & Core" },
            { day: "Day 4", name: "Thursday", routine: "Rest" },
            { day: "Day 5", name: "Friday", routine: "Full Body (Household Objects)" },
            { day: "Day 6", name: "Saturday", routine: "Active Recovery" },
            { day: "Day 7", name: "Sunday", routine: "Rest" },
        ];

    const editScheduleClicked = () => {
        setViewingSchedules(false);
        setEditingSchedule("test");
    }
    
    const editDayClicked = (day: string) => {
        setEditingSchedule("");
        setEditingDay(day);
    }

    const toggleExpand = (id: string) => {
        // If the clicked card is already open, close it. Otherwise, open the new one.
        setExpandedId(expandedId === id ? null : id);
    }

    const saveExerciseInfo = () => {

    }
    
    return (
        
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12">
            {session && (
                <>
                { viewingSchedules && (
                    <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12">
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
                                {/* You can wrap this in a conditional like {hasSchedule && (...)} later */}
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

                                {/* Right Card: Create New Schedule */}
                                <button className="group w-full h-full text-left focus:outline-none focus:ring-4 focus:ring-green-100 rounded-xl transition-all"
                                        onClick={() => editScheduleClicked()}>
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
                )}
                { editingSchedule !== "" && (
                    <>
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
                    </>
                )}
                { editingDay !== "" && (
                    <>
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
                                
                                {/* 1. Existing Exercise (Edit) */}
                                <div className={`border-2 rounded-xl bg-white transition-colors duration-200 overflow-hidden ${expandedId === 'ex1' ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-blue-300'}`}>
                                    
                                    {/* Summary Header (Clickable Toggle) */}
                                    <button 
                                        onClick={() => toggleExpand('ex1')}
                                        className="w-full text-left flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6 focus:outline-none gap-4 md:gap-6"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-lg transition-colors shrink-0 ${expandedId === 'ex1' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <span className="text-lg md:text-xl font-bold text-gray-900 block mb-0.5">Barbell Bench Press</span>
                                                <span className="text-xs md:text-sm text-gray-500 font-medium">Chest • 3 Sets • 8-12 Reps</span>
                                            </div>
                                        </div>
                                        
                                        {/* Arrow Indicator */}
                                        <div className="hidden md:block text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 md:h-6 md:w-6 transition-transform duration-300 ${expandedId === 'ex1' ? 'rotate-180 text-blue-500' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>

                                    {/* Dropdown Form Area */}
                                    <div className={`transition-all duration-300 ease-in-out ${expandedId === 'ex1' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50 flex flex-col gap-4 md:gap-6">
                                            
                                            {/* Form Inputs Grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                                <div className="md:col-span-3">
                                                    <label className="block text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Exercise Name</label>
                                                    <input type="text" defaultValue="Barbell Bench Press" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-sm md:text-base text-gray-900 bg-white" />
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Target Muscle</label>
                                                    <input type="text" defaultValue="Chest" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-sm md:text-base text-gray-900 bg-white" />
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Sets</label>
                                                    <input type="number" defaultValue="3" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-sm md:text-base text-gray-900 bg-white" />
                                                </div>

                                                <div>
                                                    <label className="block text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Reps</label>
                                                    <input type="text" defaultValue="8-12" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-sm md:text-base text-gray-900 bg-white" />
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col md:flex-row justify-end items-center gap-3 pt-2 md:pt-4">
                                                <button className="w-full md:w-auto px-4 py-2 text-red-600 hover:bg-red-50 font-medium rounded-lg transition-colors text-sm md:text-base mr-auto">Delete</button>
                                                <button onClick={() => setExpandedId(null)} className="w-full md:w-auto px-4 py-2 text-gray-600 hover:bg-gray-200 font-medium rounded-lg transition-colors text-sm md:text-base">Cancel</button>
                                                <button className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm md:text-base shadow-sm">Save Changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                    </>
                )}

                { editingExercise !== "" && (
                    <></>
                )}
                </>
            )}
        </div>
    );
}