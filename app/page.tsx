"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link"

export default function HomePage() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  // 1. Show a loading state while Better Auth checks the session
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-black">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50 text-black">
      {session ? (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 text-black">
          <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md border text-center space-y-6">
            <h1 className="text-4xl font-bold">Welcome back, {session.user.name}!</h1>
            <p className="text-gray-600">You are securely logged in.</p>
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 text-black">
          <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md border text-center space-y-6">
            <h1 className="text-4xl font-bold">You are not logged in</h1>
            <Link href="/authenticate">Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  )
}