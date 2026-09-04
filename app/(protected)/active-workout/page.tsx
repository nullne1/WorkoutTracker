"use client";

import { useState } from "react";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

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
        <div>
            <Link href="/dashboard">
                <span className="w-30 p-2 hover:bg-gray-200 rounded-lg border text-center text-black transition-colors bg-white">←Dashboard</span>
            </Link>
            {session && (
                <div className="p-20 mx-40 text-black border rounded-2xl bg-white">
                    <div className="flex justify-end text-center -mt-18 -mr-18">
                        <div className="p-6 w-3xs border rounded-lg text-4xl text-center tabular-nums">
                            <h1>Total Time</h1>
                            {minutes}:<span className="">{(`${seconds}` + "." + `${displayMilliseconds}`)}</span>
                        </div>
                    </div>
                    <div className="flex justify-center text-center">
                        <div className="p-6 w-xs border rounded-lg text-4xl text-center tabular-nums">
                            <h1>Rest Time</h1>
                            {restMinutes}:<span className="">{(`${restSeconds}` + "." + `${restMilliseconds}`)}</span>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center text-center">
                        {isRunning ? (
                            <button className="w-3xs p-6 m-2 bg-gray-500 rounded-lg border"></button>
                        ) : (
                            <button className="w-3xs p-6 m-2 bg-green-600 hover:bg-green-700 rounded-lg border text-xl transition-colors" 
                                    onClick={() => startClicked()}>
                                {startTime === 0 ? "Start Workout" : "Resume Workout" }
                            </button>
                        )}

                        {isRunning ? (
                            <button className="w-3xs p-6 m-2 bg-purple-600 hover:bg-purple-700 rounded-lg border text-xl transition-colors" 
                                    onClick={() => restClicked()}>
                                {`Start Rest ${totalRest}`}
                            </button>
                        ) : (
                            <button className="w-3xs p-6 m-2 bg-gray-500 rounded-lg border"></button>
                        )}
                        {isRunning ? (
                            <button className="w-3xs p-6 m-2 bg-red-600 hover:bg-red-700 rounded-lg border text-center text-xl transition-colors" 
                                    onClick={() => stopClicked()}>
                                Pause Workout
                            </button>
                        ) : (
                            <button className="w-3xs p-6 m-2 bg-gray-500 rounded-lg border"></button>
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