"use client";

import { useState } from "react";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client"

export default function activeWorkout() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const { data: session, isPending, error, refetch } = authClient.useSession();
    const [minutes, setMinutes] = useState(0);
    useEffect(() => {
        if (isRunning) {
            const intervalId = setInterval(async () => {
                if (time > 59 && Number.parseFloat((time).toFixed(2)) % 60 === 0) {
                    setMinutes(prevMin => prevMin + 1)
                }
                setTime(prevTime => prevTime + 0.01);
            }, 10);

            return () => clearInterval(intervalId)
        }
    }, [isRunning, time, minutes])

    const displayTime = () => {
    }

    return (
        <div>
            {session && (
                <div className="p-20 mx-40 text-black border rounded-2xl">
                    <div className="flex justify-center text-center">
                        <div className="p-8 w-3xs border rounded-lg text-4xl text-center tabular-nums">
                            {minutes}:<span className="">{((time % 60).toFixed(2))}</span>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center text-center">
                        <button className="w-3xs p-8 m-2 bg-green-600 hover:bg-green-500 rounded-lg border text-xl" 
                                onClick={() => setIsRunning(true)}>
                            Start
                        </button>
                        <button className="w-3xs p-8 m-2 bg-red-600 hover:bg-red-500 rounded-lg border text-center text-xl" 
                                onClick={() => setIsRunning(false)}>
                            Stop
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}