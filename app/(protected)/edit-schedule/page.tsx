import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ScheduleUI } from "./schedule-ui";

export default async function scheduleUI() {
    const session = await auth.api.getSession({ headers: await headers() });   

    if (session) {
        const records = await prisma.schedules.findMany({ where: { userId: session.user.id } });
    }

    return (
        <ScheduleUI />
        
    )
}