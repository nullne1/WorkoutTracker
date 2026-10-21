"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

// export async function saveExercise(formData: FormData) { // name: string, sets: number, reps: number, day: string
//     const session = await auth.api.getSession({ headers: await headers() });
//     if (!session) throw new Error("Not logged in");

//     const name = formData.get("name") as string;
//     const sets = Number(formData.get("sets") as string);
//     const reps = Number(formData.get("sets") as string);

//     console.log(name)

//     const newExercise = prisma.exercise.create({
//         data: {
//             id: session.user.id,
//             name: name,
//             sets: sets,
//             reps: reps,
//             dayId: day
//         }
//     })
// }

export async function createSchedule(name: string) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not logged in");

    const newSchedule = prisma.schedule.create({
        data: { 
            name: name,
            userId: session.user.id
        }
    })
    
    return newSchedule;
}

export async function createDay(name: string, routine: string, scheduleId: string) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not logged in");

    const newSchedule = prisma.day.create({
        data: { 
            name: name,
            routine: routine,
            scheduleId: scheduleId
        }
    })
    return newSchedule;
}

export async function nukeDatabase() {
    // 1. Delete children first to prevent foreign key constraint errors
    await prisma.exercise.deleteMany({});
    await prisma.day.deleteMany({});
    
    // 2. Delete the parent schedules
    await prisma.schedule.deleteMany({});
    
    console.log("Database successfully wiped clean!");
}