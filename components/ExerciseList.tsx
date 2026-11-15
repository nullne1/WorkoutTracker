import { useState } from "react";
import { useRef } from "react";
import { SubmitEvent } from "react";

import { saveExercise } from "@/app/(protected)/actions";
import ExerciseCard from "./ExerciseCard"

import type { ScheduleRecord } from "@/types/database";
import type { DayRecord } from "@/types/database";
import type { ExerciseRecordCopy } from "@/types/database"

type ExerciseListProps = {
    dayEditing: DayRecord | null;
    scheduleEditing: ScheduleRecord | null;
    viewingExercises: boolean;

    setDayEditing: (value: DayRecord) => void;
    setScheduleEditing: (value: ScheduleRecord) => void;
    setViewingExercises: (value: boolean) => void
};


export default function ExerciseList({ dayEditing, scheduleEditing, viewingExercises, setDayEditing, setScheduleEditing, setViewingExercises } : ExerciseListProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [isRestDay, setIsRestDay] = useState(false);
    const [addedExercise, setAddedExercise] = useState<ExerciseRecordCopy | null>(null);
    const [exerciseList, setExerciseList] = useState<ExerciseRecordCopy[] | null>([]);
    
    const toggleExpand = (id: string) => {
        // If the clicked card is already open, close it. Otherwise, open the new one.
        setExpandedId(expandedId === id ? null : id);
    }
    
    const toggleRestDay = () => {
        if (isRestDay) {
            setIsRestDay(false);
        } else {
            setIsRestDay(true);
        }
    }

    const addExerciseClicked = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        const exercise : ExerciseRecordCopy = {
            name: formData.get("name")?.toString()!,
            sets: Number(formData.get("sets")),
            reps: Number(formData.get("reps")),
            dayId: dayEditing?.id!
        }
        setExerciseList((prevList) => [...prevList!, exercise]);
    }

    const saveClicked = () => {
        for (let i = 0; i < exerciseList!.length; i++) {
            saveExercise(exerciseList!.at(i)!);
        }
    }

    const findExercises = () => {
        const daysList = scheduleEditing?.days!;
        for (let i = 0; i < daysList.length; i++) {
            const dayRecord = Object.entries(daysList.at(i)!)

            if (dayRecord.find(([key, val]) => val === dayEditing?.id)) {
                return daysList.at(i)?.exercises
            }
        }
    }
    console.log(findExercises())
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="mx-auto max-w-3xl p-6 md:p-10 border border-gray-200 rounded-2xl bg-white shadow-sm flex flex-col gap-6 md:gap-8">
                {/* Day Settings Section */}
                <div className="flex flex-col gap-2 md:gap-3">
                    <label className="text-sm md:text-base font-semibold text-gray-500 uppercase tracking-wider pl-1">
                        {dayEditing?.name}
                    </label>

                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Routine Name Input */}
                        <input 
                            type="text" 
                            defaultValue=""
                            disabled={isRestDay}
                            placeholder="Day: e.g., Push, Legs, Full Body"
                            className="flex-1 w-full p-4 md:p-5 text-lg md:text-xl font-bold text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400 placeholder:font-medium"
                        />
                        
                        {/* Rest Day Toggle Button */}
                        <button 
                            className={`group flex items-center justify-center gap-3 px-6 py-4 md:py-5 rounded-xl border-2 font-bold text-base md:text-lg transition-all focus:outline-none focus:ring-4 shrink-0 ${
                                isRestDay 
                                    ? "bg-blue-50 border-blue-500 text-blue-700 focus:ring-blue-100" 
                                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 focus:ring-gray-100"
                                }`}
                            onClick={() => toggleRestDay()}
                        >
                            {/* Coffee Cup Icon for Rest */}
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors ${isRestDay ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {isRestDay ? "Rest Day Active" : "Set as Rest Day"}
                        </button>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Main Content Area: Exercises or Rest State */}
                {isRestDay ? (
                    /* Empty State for Rest Days */
                    <div className="p-8 md:p-12 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center justify-center">
                        <div className="p-4 bg-gray-100 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Enjoy your rest!</h3>
                        <p className="text-sm md:text-base text-gray-500">No exercises scheduled for today. Uncheck the "Rest Day" button above to add movements.</p>
                    </div>
                ) : (
                    <>
                    {dayEditing?.exercises?.map((exercise, index) => (
                        <ExerciseCard
                            key={index}
                            name={exercise.name} 
                            sets={exercise.sets}
                            reps={exercise.reps}>
                        </ExerciseCard>
                    ))}
                    {exerciseList?.map((exercise, index) => (
                        <ExerciseCard 
                            key={index}
                            name={exercise.name} 
                            sets={exercise.sets} 
                            reps={exercise.reps}>
                        </ExerciseCard>
                    ))}
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

                            {/* Dropdown Form Area */}
                            <div className={`transition-all duration-300 ease-in-out ${expandedId === 'new' ? 'max-h-200 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-4 md:p-6 border-t border-gray-100 bg-white flex flex-col gap-4 md:gap-6">
                                    
                                    {/* Form Inputs Grid */}
                                    <div className="p-4 md:p-4 grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6">
                                        <form onSubmit={addExerciseClicked}>
                                            <div className="md:col-span-3">
                                                <label className="block text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Exercise Name</label>
                                                <input name="name" type="text" placeholder="e.g., Incline Dumbbell Press" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow text-sm md:text-base text-gray-900 bg-white" />
                                            </div>
                                            
                                            <div>
                                                <label className="block text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Target Muscle</label>
                                                <input name="targetMuscle" type="text" placeholder="e.g., Chest" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow text-sm md:text-base text-gray-900 bg-white" />
                                            </div>
                                            <div>
                                                <label className="block text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Sets</label>
                                                <input name="sets" type="number" placeholder="3" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow text-sm md:text-base text-gray-900 bg-white" />
                                            </div>
                                            <div>
                                                <label className="block text-xs md:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Reps</label>
                                                <input name="reps" type="text" placeholder="8-12" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow text-sm md:text-base text-gray-900 bg-white" />
                                            </div>
                                            <div className="flex flex-col md:flex-row justify-end items-center gap-3 pt-2 md:pt-4">
                                                <button onClick={() => setExpandedId(null)} className="w-full md:w-auto px-4 py-2 text-gray-600 hover:bg-gray-100 font-medium rounded-lg transition-colors text-sm md:text-base">Cancel</button>
                                                <button 
                                                    type="submit"
                                                    className="w-full md:w-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm md:text-base shadow-sm"
                                                >Add to Workout</button>
                                            </div>
                                        </form>
                                    </div>                                
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                )}
                <button 
                    className="w-full md:w-auto px-6 py-3 md:py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors text-base md:text-lg"
                    onClick={() => saveClicked()}
                >
                    Save Training Day
                </button>
            </div>
        </div>
    );
}