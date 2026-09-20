"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import ScheduleUI from "./schedule-ui";

export default async function scheduleUI() {
    const session = await auth.api.getSession({ headers: await headers() });   
    const records = await prisma.schedule.findMany({
        where: { userId: session?.user?.id },
    });
    return (
        <ScheduleUI></ScheduleUI>
    )
}