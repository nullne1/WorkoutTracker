"use client";

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
    console.log("dashboard")
    const { data: session, isPending, error, refetch } = authClient.useSession();

    return (
        <div>
        { session && (
            <div className="p-20 mx-50 text-black border rounded-2xl">
                <div className="flex p-4 bg-gray-50 text-black justify-center">
                <div className="w-full max-w-200 bg-white p-8 rounded-lg shadow-md border text-center space-y-6 top-1">
                    <h1 className="text-4xl font-bold">Welcome back, {session.user.name}!</h1>
                </div>
                </div>

                <div className="flex flex-row items-center p-4 bg-gray-50 text-black justify-center">
                <div className="w-3xs p-10 m-2 hover:bg-gray-500 rounded-lg border text-center">
                    <button>
                        Start Workout
                    </button>
                </div>

                <div className = "w-3xs p-10 m-2 hover:bg-gray-500 rounded-lg border text-center">
                    <button>
                        Edit Workout Split
                    </button>
                </div>
                </div>
            </div>
        )};
        </div>
    )
}