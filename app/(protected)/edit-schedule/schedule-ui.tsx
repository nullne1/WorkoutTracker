"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

import ScheduleList from "@/components/ScheduleList"
import DayList from "@/components/DayList"
import ExerciseList from "@/components/ExerciseList";

import type { ScheduleUIProps } from "@/types/database";
import type { DayRecord } from "@/types/database";

export default function ScheduleUI({ scheduleRecords }: ScheduleUIProps) {
    const [viewingSchedules, setViewingSchedules] = useState(true);
    const [viewingDays, setViewingDays] = useState("");
    const [viewingExercises, setViewingExercises] = useState<DayRecord | null>(null);
    const [scheduleRecordsState, setScheduleRecordsState] = useState(scheduleRecords)

    const [creatingNewSchedule, setCreatingNewSchedule] = useState(true);

    const { data: session, isPending, error, refetch } = authClient.useSession();

    var hasSchedule = false;

    if (scheduleRecords.length > 0) {
        hasSchedule = true;
    }
    // modal
    return (
        
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12">
            {session && (
                <>
                { viewingSchedules && (
                    <ScheduleList
                        scheduleRecordsState={scheduleRecordsState}
                        hasSchedule={hasSchedule}
                        viewingSchedules={viewingSchedules}
                        viewingDays={viewingDays}
                        creatingNewSchedule={creatingNewSchedule}
                        setScheduleRecordsState={setScheduleRecordsState}
                        setViewingSchedules={setViewingSchedules}
                        setViewingDays={setViewingDays}
                        setCreatingNewSchedule={setCreatingNewSchedule}
                    />
                )}
                { viewingDays !== "" && (
                    <DayList
                        scheduleRecordsState={scheduleRecordsState}
                        viewingDays={viewingDays}
                        viewingExercises={viewingExercises}
                        creatingNewSchedule={creatingNewSchedule}
                        setScheduleRecordsState={setScheduleRecordsState}
                        setViewingDays={setViewingDays}
                        setViewingExercises={setViewingExercises}
                        setCreatingNewSchedule={setCreatingNewSchedule}
                    />
                )}
                { viewingExercises !== null && (
                    <ExerciseList
                        scheduleRecordsState={scheduleRecordsState}
                        viewingExercises={viewingExercises}
                        setScheduleRecordsState={setScheduleRecordsState}
                        setViewingExercises={setViewingExercises}/>
                )}

                </>
            )}
        </div>
    );
}