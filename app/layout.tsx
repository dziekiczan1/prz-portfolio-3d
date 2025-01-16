import type {Metadata} from "next";
import {Roboto, Orbitron} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar";

// Load the fonts
const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-roboto",
});

const orbitron = Orbitron({
    weight: ["400", "600"],
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
            <body className={`${roboto.variable} ${roboto.className} ${orbitron.variable} antialiased`}>
                <Navbar />
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
