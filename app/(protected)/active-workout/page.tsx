"use client";

import { useState } from "react";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client"
import { sec } from "better-auth/plugins";

export default function activeWorkout() {
    const [startTime, setStartTime] = useState(0);
    const [restTime, setRestTime] = useState(0);
    const [totalMilliseconds, setTotalMilliseconds] = useState(0);
    const [restTotalMilliseconds, setRestTotalMilliseconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isResting, setIsResting] = useState(false);

    let timeElapsed = 0
    let displayMilliseconds = '0'
    let seconds = 0
    let minutes = 0

    let restMilliseconds = '0'
    let restSeconds = 0
    let restMinutes = 0

    const { data: session, isPending, error, refetch } = authClient.useSession();

    useEffect(() => {
        if (isRunning) {
            const intervalId = setInterval(async () => {
                // formats the time display
                setTotalMilliseconds((Date.now() - startTime) + timeElapsed)
                if (isResting) {
                    setRestTotalMilliseconds(Date.now() - restTime)
                }
            }, 10);
            return () => clearInterval(intervalId);
        }

    }, [isRunning, isResting, totalMilliseconds])

    const startClicked = () => {
        if (!isRunning) {
            setStartTime(Date.now())
            setIsRunning(true)
        }
    }

    const restClicked = () => {
        if (isRunning) {
            setIsResting(true)
            setRestTime(Date.now())
        }
    }
    
    const stopClicked = () => {
        if (isRunning) {
            timeElapsed += Date.now() - startTime
            setIsRunning(false)
        }
    }

    [displayMilliseconds, seconds, minutes] = updateTime(totalMilliseconds, displayMilliseconds, seconds, minutes);
    [restMilliseconds, restSeconds, restMinutes] = updateTime(restTotalMilliseconds, restMilliseconds, restSeconds, restMinutes);

    return (
        <div>
            {session && (
                <div className="p-20 mx-40 text-black border rounded-2xl">
                    <div className="flex justify-end text-center -mt-18 -mr-18">
                        <div className="p-8 w-3xs border rounded-lg text-4xl text-center tabular-nums">
                            {minutes}:<span className="">{(`${seconds}` + "." + `${displayMilliseconds}`)}</span>
                        </div>
                    </div>
                    <div className="flex justify-center text-center">
                        <div className="p-8 w-3xs border rounded-lg text-4xl text-center tabular-nums">
                            {restMinutes}:<span className="">{(`${restSeconds}` + "." + `${restMilliseconds}`)}</span>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center text-center">
                        <button className="w-3xs p-8 m-2 bg-green-600 hover:bg-green-700 rounded-lg border text-xl" 
                                onClick={() => startClicked()}>
                            Start
                        </button>
                        <button className="w-3xs p-8 m-2 bg-purple-600 hover:bg-purple-700 rounded-lg border text-xl" 
                                onClick={() => restClicked()}>
                            Start Rest
                        </button>
                        <button className="w-3xs p-8 m-2 bg-red-600 hover:bg-red-700 rounded-lg border text-center text-xl" 
                                onClick={() => stopClicked()}>
                            Stop
                        </button>
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