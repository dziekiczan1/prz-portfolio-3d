import type {Metadata} from "next";
import {Orbitron, DM_Sans} from "next/font/google";
import "./globals.css";

import Navbar from "@/app/components/navbar";
import SocialMedia from "@/app/components/social";

const dmSans = DM_Sans({
    weight: ["400", "600"],
    subsets: ["latin"],
    variable: "--font-dmSans",
});

const orbitron = Orbitron({
    weight: ["400", "600", "700"],
    subsets: ["latin"],
    variable: "--font-orbitron",
});

export const metadata: Metadata = {
    title: "Piotr Rzadkowolski",
    description: "Piotr Rzadkowolski Portfolio",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={`${dmSans.variable} ${dmSans.className} ${orbitron.variable} antialiased`}>
            <Navbar/>
            <main className="main-class">
                {children}
            </main>
            <SocialMedia/>
        </body>
        </html>
    );
}
