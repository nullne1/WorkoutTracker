"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function saveExercise(name: string, sets: number, reps: number, day: string) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("Not logged in");

    const newRecord = prisma.exercise.create({
        data: {
            id: session.user.id,
            name: name,
            sets: sets,
            reps: reps,
            dayId: day
        }
    })
}