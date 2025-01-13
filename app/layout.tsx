import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar";

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Piotr Rzadkowolski",
    description: "Piotr Rzadkowolski Portfolio",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={`${roboto.className} antialiased`}>
                <Navbar />
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
