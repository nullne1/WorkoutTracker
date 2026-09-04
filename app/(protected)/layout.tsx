"use client";

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

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
        <div className="p-12 h-screen bg-gray-50 font-sans">
            <div className="flex justify-end">
                <button onClick = {handleLogout} className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Sign Out
                </button>
            </div>
            {children}
        </div>
    )
}