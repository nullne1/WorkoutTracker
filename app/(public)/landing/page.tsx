"use client";

import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md md:max-w-lg p-8 md:p-12 rounded-2xl shadow-md border text-center bg-white text-black">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">About this site</h1>
            
            <div className="flex flex-col md:flex-row justify-center gap-4">
                <Link href="/auth?signUp=true" className="w-full md:w-auto">
                    <div className="w-full md:w-40 p-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer">
                        Sign Up
                    </div>
                </Link>
                
                <Link href="/auth?signUp=false" className="w-full md:w-auto">
                    <div className="w-full md:w-40 p-4 bg-gray-100 hover:bg-gray-200 text-black font-medium rounded-lg border transition-colors cursor-pointer">
                        Log In
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}