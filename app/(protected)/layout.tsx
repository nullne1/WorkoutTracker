"use server";

import { Navbar } from "./navbar";

export default async function NavbarLayout({ children }: LayoutProps<"/">) {
    return (
        <div>
            <Navbar/>
            {children}
        </div>
    )
}