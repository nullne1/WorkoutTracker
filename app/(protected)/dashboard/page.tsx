"use client";

import { authClient } from "@/lib/auth-client"

import Link from "next/link"

export default function DashboardPage() {
    console.log("dashboard")
    const { data: session, isPending, error, refetch } = authClient.useSession();

    return (
        <div>
        {session && (
            <div className="p-20 mx-40 text-black border rounded-2xl">
                <div className="flex justify-center">
                    <div className="w-full max-w-200 p-8 rounded-lg shadow-md border text-center">
                        <h1 className="text-4xl font-bold">Welcome back, {session.user.name}!</h1>
                    </div>
                </div>

                <div className="flex flex-row items-center p-4 bg-gray-50 text-black justify-center text-xl">
                    <div className="w-3xs p-8 m-2 hover:bg-gray-500 rounded-lg border text-center">
                        <Link href="/active-workout">Start Workout</Link>
                    </div>

                    <div className = "w-3xs p-8 m-2 hover:bg-gray-500 rounded-lg border text-center">
                        <Link href="/active-workout">Edit Schedule</Link>
                    </div>
                </div>
            </div>
        )};
        </div>
    )
}