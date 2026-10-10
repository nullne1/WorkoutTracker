"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

import ScheduleList from "@/components/ScheduleList"
import DayList from "@/components/DayList"
import ExerciseList from "@/components/ExerciseList";

type ScheduleRecord = {
    id: string,
    name: string;
}

type ScheduleUIProps = {
    scheduleRecords: ScheduleRecord[];
}

export default function ScheduleUI({ scheduleRecords }: ScheduleUIProps) {
    const [viewingSchedules, setViewingSchedules] = useState(true);
    const [viewingDays, setViewingDays] = useState("");
    const [editingDay, setEditingDay] = useState("");

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
                        hasSchedule={hasSchedule}
                        viewingSchedules={viewingSchedules}
                        viewingDays={viewingDays}
                        creatingNewSchedule={creatingNewSchedule}
                        setViewingSchedules={setViewingSchedules}
                        setViewingDays={setViewingDays}
                        setCreatingNewSchedule={setCreatingNewSchedule}
                    />
                )}
                { viewingDays !== "" && (
                    <DayList
                        viewingDays={viewingDays}
                        editingDay={editingDay}
                        creatingNewSchedule={creatingNewSchedule}
                        setViewingDays={setViewingDays}
                        setEditingDay={setEditingDay}
                        setCreatingNewSchedule={setCreatingNewSchedule}
                    />
                )}
                { editingDay !== "" && (
                    <ExerciseList
                        editingDay={editingDay}
                        setEditingDay={setEditingDay}/>
                )}

                </>
            )}
        </div>
    );
}