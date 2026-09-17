"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

import ScheduleList from "@/components/ScheduleList"
import DayList from "@/components/DayList"
import ExerciseList from "@/components/ExerciseList";

// type ScheduleRecord = {
//     id: string,
//     name: string;
// }

export default function ScheduleUI() {
    const [viewingSchedules, setViewingSchedules] = useState(true);
    const [editingSchedule, setEditingSchedule] = useState("");
    const [editingDay, setEditingDay] = useState("");
    const [editingExercise, setEditingExercise] = useState("");

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
    
    return (
        
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12">
            {session && (
                <>
                { viewingSchedules && (
                    <ScheduleList
                        viewingSchedules={viewingSchedules}
                        editingSchedule={editingSchedule}
                        setViewingSchedules={setViewingSchedules}
                        setEditingSchedule={setEditingSchedule}
                    />
                )}
                { editingSchedule !== "" && (
                    <DayList
                        editingSchedule={editingSchedule}
                        editingDay={editingDay}
                        setEditingSchedule={setEditingSchedule}
                        setEditingDay={setEditingDay}
                    />
                )}
                { editingDay !== "" && (
                    <ExerciseList/>
                )}

                { editingExercise !== "" && (
                    <></>
                )}
                </>
            )}
        </div>
    );
}