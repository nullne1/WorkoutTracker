"use client";

import { authClient } from "@/lib/auth-client";

import Link from "next/link";

export default function DashboardPage() {
    const { data: session, isPending, error, refetch } = authClient.useSession();
    
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12">
            {session && (
                <div className="mx-auto max-w-4xl p-6 md:p-10 lg:p-12 border rounded-2xl bg-white shadow-sm flex flex-col gap-8 md:gap-12">
                    
                    {/* Welcome Box */}
                    <div className="w-full p-6 md:p-8 rounded-xl shadow-sm border bg-blue-50 border-blue-100 flex items-center gap-4 md:gap-6">
                        <div className="hidden md:flex items-center justify-center h-16 w-16 bg-blue-100 text-blue-600 rounded-full shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                                Welcome back, {session.user.name}!
                            </h1>
                            <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
                                Select an option below to manage your training.
                            </p>
                        </div>
                    </div>

                    {/* Action Cards (Buttons) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <Link href="/active-workout" className="group block h-full">
                            <div className="h-full flex flex-col items-center justify-center p-8 md:p-10 rounded-xl border-2 border-gray-100 bg-white hover:border-green-500 hover:bg-green-50 hover:shadow-md transition-all duration-200">
                                {/* Icon Box */}
                                <div className="mb-4 p-4 bg-green-100 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-xl md:text-2xl font-bold text-gray-900">Start Workout</span>
                                <span className="text-sm md:text-base text-gray-500 mt-2 text-center">Launch the timer and track your rest</span>
                            </div>
                        </Link>

                        <Link href="/edit-schedule" className="group block h-full">
                            <div className="h-full flex flex-col items-center justify-center p-8 md:p-10 rounded-xl border-2 border-gray-100 bg-white hover:border-blue-500 hover:bg-blue-50 hover:shadow-md transition-all duration-200">
                                {/* Icon Box */}
                                <div className="mb-4 p-4 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-xl md:text-2xl font-bold text-gray-900">Edit Schedule</span>
                                <span className="text-sm md:text-base text-gray-500 mt-2 text-center">Manage your weekly training split</span>
                            </div>
                        </Link>
                    </div>
                    
                </div>
            )}
        </div>
    )
}