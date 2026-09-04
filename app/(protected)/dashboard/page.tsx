"use client";

import { authClient } from "@/lib/auth-client";

import Link from "next/link";

export default function DashboardPage() {
    const { data: session, isPending, error, refetch } = authClient.useSession();

    return (
        <div>
        {session && (
            <div className="p-20 mx-40 text-black border rounded-2xl bg-white">
                <div className="flex justify-center">
                    <div className="w-full max-w-200 p-8 rounded-lg shadow-md border text-center">
                        <h1 className="text-4xl font-bold">Welcome back, {session.user.name}!</h1>
                    </div>
                </div>

                <div className="flex flex-row items-center p-4 text-black justify-center text-xl">
                    <Link href="/active-workout">
                        <div className="w-3xs p-8 m-2 hover:bg-gray-200 rounded-lg border text-center">Start Workout</div>
                    </Link>

                    <Link href="/">
                        <div className = "w-3xs p-8 m-2 hover:bg-gray-200 rounded-lg border text-center">Edit Schedule</div>
                    </Link>
                </div>
            </div>
        )};
        </div>
    )
}