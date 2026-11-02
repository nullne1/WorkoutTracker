// types/database.ts

export type ScheduleUIProps = {
    scheduleRecords: ScheduleRecord[];
}

export type ExerciseRecord = {
    id: string;
    name: string;
    sets: number;
    reps: number;
    dayId: string;
};

export type DayRecord = {
    id?: string;
    name?: string;
    routine?: string;
    scheduleId?: string;
    exercises?: ExerciseRecord[];
};

export type ScheduleRecord = {
    id?: string;
    name?: string;
    userId?: string;
    days?: DayRecord[]; 
};