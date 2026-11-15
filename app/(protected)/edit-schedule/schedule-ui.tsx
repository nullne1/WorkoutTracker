"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

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

    const { data: session, isPending, error, refetch } = authClient.useSession();

    var hasSchedule = false;

    if (scheduleRecords.length > 0) {
        hasSchedule = true;
    }
    console.log(scheduleRecordsState)
    // modal
    return (
        
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12">
            {session && (
                <>
                { viewingSchedules && (
                    <ScheduleList
                        scheduleEditing={scheduleEditing}
                        scheduleRecordsState={scheduleRecordsState}
                        hasSchedule={hasSchedule}
                        viewingSchedules={viewingSchedules}
                        viewingDays={viewingDays}
                        creatingNewSchedule={creatingNewSchedule}
                        setScheduleEditing={setScheduleEditing}
                        setScheduleRecordsState={setScheduleRecordsState}
                        setViewingSchedules={setViewingSchedules}
                        setViewingDays={setViewingDays}
                        setCreatingNewSchedule={setCreatingNewSchedule}
                    />
                )}
                { viewingDays && (
                    <DayList
                        dayEditing={dayEditing}
                        scheduleEditing={scheduleEditing}
                        viewingDays={viewingDays}
                        viewingExercises={viewingExercises}
                        creatingNewSchedule={creatingNewSchedule}
                        setDayEditing={setDayEditing}
                        setScheduleEditing={setScheduleEditing}
                        setViewingDays={setViewingDays}
                        setViewingExercises={setViewingExercises}
                        setCreatingNewSchedule={setCreatingNewSchedule}
                    />
                )}
                { viewingExercises && (
                    <ExerciseList
                        dayEditing={dayEditing}
                        scheduleEditing={scheduleEditing}
                        viewingExercises={viewingExercises}
                        setDayEditing={setDayEditing}
                        setScheduleEditing={setScheduleEditing}
                        setViewingExercises={setViewingExercises}/>
                )}

                </>
            )}
        </div>
    );
}