"use client";

import { useState } from "react";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function activeWorkout() {
    const [startTime, setStartTime] = useState(0);
    const [restTime, setRestTime] = useState(0);
    const [totalMilliseconds, setTotalMilliseconds] = useState(0);
    const [restTotalMilliseconds, setRestTotalMilliseconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isResting, setIsResting] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [restTimeElapsed, setRestTimeElapsed] = useState(0);
    const [totalRest, setTotalRest] = useState(1)
    
    let displayMilliseconds = '0';
    let seconds = 0;
    let minutes = 0;
    
    let restMilliseconds = '0';
    let restSeconds = 0;
    let restMinutes = 0;
    
    const { data: session, isPending, error, refetch } = authClient.useSession();

    useEffect(() => {
        if (isRunning) {
            const intervalId = setInterval(async () => {
                // formats the time display
                setTotalMilliseconds((Date.now() - startTime) + timeElapsed);
                if (isResting) {
                    setRestTotalMilliseconds(Date.now() - restTime + restTimeElapsed);
                }
            }, 10);
            return () => clearInterval(intervalId);
        }

    }, [isRunning, isResting, totalMilliseconds])

    const startClicked = () => {
        if (!isRunning && restTime === 0) {
            setIsRunning(true);
            setStartTime(Date.now());
        } else if (!isRunning) {
            setIsResting(true);
            setRestTime(Date.now())
            setIsRunning(true);
            setStartTime(Date.now());
        }
    }

    const restClicked = () => {
        if (isRunning && !isResting) {
            setIsResting(true);
            setRestTime(Date.now());
            setRestTimeElapsed(0)
        } else if (isRunning && isResting) {
            setRestTime(Date.now());
            setRestTimeElapsed(0);
        }
        setTotalRest(prevTotalRest => prevTotalRest + 1)
    }
    
    const stopClicked = () => {
        if (isRunning) {
            setTimeElapsed(prevTimeElapsed => prevTimeElapsed + Date.now() - startTime);
            setRestTimeElapsed(prevRestTimeElapsed => prevRestTimeElapsed + Date.now() - restTime);
            setIsRunning(false);
            setIsResting(false);
        }
    }

    [displayMilliseconds, seconds, minutes] = updateTime(totalMilliseconds, displayMilliseconds, seconds, minutes);
    [restMilliseconds, restSeconds, restMinutes] = updateTime(restTotalMilliseconds, restMilliseconds, restSeconds, restMinutes);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12">
            {/* Main Workout Container */}
            {session && (
                <div className="relative mx-auto max-w-4xl text-black border border-gray-200 rounded-2xl bg-white shadow-sm flex flex-col p-6 md:p-12 gap-8 md:gap-12">
                    
                    {/* Total Time: Stacks on mobile, breaks out to top-right corner on desktop */}
                    <div className="flex justify-center md:absolute md:-top-8 md:-right-8">
                        <div className="p-4 md:p-6 w-full max-w-xs md:w-56 border border-gray-200 rounded-xl text-3xl md:text-4xl text-center tabular-nums bg-white shadow-md">
                            <h1 className="text-sm md:text-base font-medium text-gray-500 uppercase tracking-wider mb-1">Total Time</h1>
                            <div className="text-gray-900">
                                {minutes}:<span>{`${seconds}.${displayMilliseconds}`}</span>
                            </div>
                        </div>
                    </div>

                    {/* Rest Time: Centered main display */}
                    <div className="flex justify-center mt-2 md:mt-12 lg:mt-16">
                        <div className="p-6 md:p-8 w-full max-w-sm md:w-72 border border-gray-200 rounded-xl text-4xl md:text-5xl text-center tabular-nums bg-gray-50">
                            <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Rest Time</h1>
                            <div className="text-gray-900">
                                {restMinutes}:<span>{`${restSeconds}.${restMilliseconds}`}</span>
                            </div>
                        </div>
                    </div>

                    {/* Controls: Stack vertically on mobile, row on desktop */}
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full">
                        {isRunning ? (
                            <button disabled className="w-full md:w-48 p-4 md:p-6 bg-gray-50 rounded-xl border border-gray-200 cursor-not-allowed text-gray-400 font-medium hidden md:block"></button>
                        ) : (
                            <button 
                                className="w-full md:w-48 p-4 md:p-6 bg-green-600 hover:bg-green-700 text-white rounded-xl border border-green-700 text-lg md:text-xl font-bold shadow-sm transition-all focus:ring-4 focus:ring-green-100"
                                onClick={() => startClicked()}
                            >
                                {startTime === 0 ? "Start Workout" : "Resume"}
                            </button>
                        )}

                        {isRunning ? (
                            <button 
                                className="w-full md:w-48 p-4 md:p-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl border border-purple-700 text-lg md:text-xl font-bold shadow-sm transition-all focus:ring-4 focus:ring-purple-100"
                                onClick={() => restClicked()}
                            >
                                Start Rest {totalRest}
                            </button>
                        ) : (
                            <button disabled className="w-full md:w-48 p-4 md:p-6 bg-gray-50 rounded-xl border border-gray-200 cursor-not-allowed text-gray-400 font-medium hidden md:block"></button>
                        )}

                        {isRunning ? (
                            <button 
                                className="w-full md:w-48 p-4 md:p-6 bg-red-600 hover:bg-red-700 text-white rounded-xl border border-red-700 text-lg md:text-xl font-bold shadow-sm transition-all focus:ring-4 focus:ring-red-100"
                                onClick={() => stopClicked()}
                            >
                                Pause
                            </button>
                        ) : (
                            <button disabled className="w-full md:w-48 p-4 md:p-6 bg-gray-50 rounded-xl border border-gray-200 cursor-not-allowed text-gray-400 font-medium hidden md:block"></button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

function updateTime(totalMilliseconds: number, milliseconds: string, seconds: number, minutes: number) {
    if ((totalMilliseconds % 1000).toString().length < 3) {
            milliseconds = (totalMilliseconds % 1000).toString().padStart(3, '0');
    } else {
        milliseconds = ((totalMilliseconds % 1000).toString());
    }
    seconds = Math.trunc((totalMilliseconds / 1000) % 60);
    minutes = Math.trunc(totalMilliseconds / 60000);

    return [milliseconds, seconds, minutes] as const;
}