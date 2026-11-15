"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import ScheduleList from "@/components/ScheduleList"
import DayList from "@/components/DayList"
import ExerciseList from "@/components/ExerciseList";

import { ScheduleRecord, type ScheduleUIProps } from "@/types/database";
import type { DayRecord } from "@/types/database";

export default function ScheduleUI({ scheduleRecords }: ScheduleUIProps) {
    const [viewingSchedules, setViewingSchedules] = useState(true);
    const [viewingDays, setViewingDays] = useState(false);
    const [viewingExercises, setViewingExercises] = useState(false);

    const [scheduleRecordsState, setScheduleRecordsState] = useState(scheduleRecords);
    const [scheduleEditing, setScheduleEditing] = useState<ScheduleRecord | null>(null); 
    const [creatingNewSchedule, setCreatingNewSchedule] = useState(true);
    const [dayEditing, setDayEditing] = useState<DayRecord | null>(null);
    const [backActive, setBackActive] = useState(false);
    const [hasSchedule, setHasSchedule] = useState(false);

    // portal button to layout
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    const { data: session, isPending, error, refetch } = authClient.useSession();

    const navSlot = mounted ? document.getElementById("top-nav-slot") : null;
    
    const backClicked = () => {
        if (viewingDays) {
            setBackActive(false);
            setViewingDays(false);
            setViewingSchedules(true);
        } else {
            setViewingExercises(false);
            setViewingDays(true);
        }
    }

    useEffect(() => {
        if (scheduleRecordsState.length > 0) {
            setHasSchedule(true);
        }
    });

    // modal
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12">
            {navSlot && backActive && createPortal(
                <button 
                    onClick={backClicked}
                    className="flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all duration-200 text-sm md:text-base font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-white group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back
                </button>,
                navSlot
            )}

            {session && (
                <>
                { viewingSchedules && (
                    <ScheduleList
                        scheduleRecordsState={scheduleRecordsState}
                        hasSchedule={hasSchedule}

                        setHasSchedule={setHasSchedule}
                        setScheduleRecordsState={setScheduleRecordsState}
                        setBackActive={setBackActive}                        
                        setScheduleEditing={setScheduleEditing}
                        setViewingSchedules={setViewingSchedules}
                        setViewingDays={setViewingDays}
                    />
                )}
                { viewingDays && (
                    <DayList
                        scheduleEditing={scheduleEditing}

                        setDayEditing={setDayEditing}
                        setViewingDays={setViewingDays}
                        setViewingExercises={setViewingExercises}
                    />
                )}
                { viewingExercises && (
                    <ExerciseList
                        dayEditing={dayEditing}
                        scheduleEditing={scheduleEditing}

                        setScheduleEditing={setScheduleEditing}
                    />
                )}

                </>
            )}
        </div>
    );
}