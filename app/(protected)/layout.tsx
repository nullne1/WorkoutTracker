"use client";

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link";

export default function NavbarLayout({ children }: LayoutProps<"/">) {
    const router = useRouter();

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
        <div className="p-4 md:p-8 bg-gray-50 font-sans">
            <div className="flex items-center justify-between w-full">
                <Link href="/dashboard" className="group">
                    <button className="flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm transition-all duration-200 text-gray-700 text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Home
                    </button>
                </Link>

                <button 
                    onClick={handleLogout} 
                    className="flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 bg-white hover:bg-red-50 border border-red-200 text-red-600 rounded-xl shadow-sm transition-all duration-200 text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Sign Out
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
            {children}  
        </div>
    )
}