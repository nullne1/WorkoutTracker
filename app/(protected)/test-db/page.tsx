import { prisma } from "@/lib/prisma";

// No "use client" anywhere!
export default async function TestPage() {
    const records = await prisma.schedules.findMany();
    
    return (
        <div>
            <h1>Database Test</h1>
            <pre>{JSON.stringify(records, null, 2)}</pre>
        </div>
    );
}