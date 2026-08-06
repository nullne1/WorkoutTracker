"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter();
  const { data: session, isPending, error, refetch } = authClient.useSession();
  
  // 1. Show a loading state while Better Auth checks the session
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-black">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  }

  return (
    <div className="p-10 h-screen bg-gray-50">
      {session ? (
        <div>
          <div className="flex justify-end">
            <button onClick = {handleLogout} className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Sign Out
            </button>
          </div>
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
        </div>
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 text-black">
          <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md border text-center space-y-6">
            <h1 className="text-4xl font-bold">About this site</h1>
            <Link href="/auth">Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  )
}