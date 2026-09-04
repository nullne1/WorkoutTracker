"use client";

import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="p-10 bg-gray-50">
        <div className="flex h-screen flex-col items-center justify-center p-4 text-black">
          <div className="w-full p-8 rounded-lg shadow-md border text-center space-y-6 bg-white">
            <h1 className="text-4xl font-bold">About this site</h1>
            <Link href="/auth?signUp=true">Sign Up</Link>
            <div></div>
            <Link href="/auth?signUp=false">Log in</Link>
          </div>
        </div>
    </div>
  )
}