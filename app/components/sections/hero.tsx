'use client';
import { BlurIn } from "@/components/ui/blur-in";

export default function Hero() {
    return (
        <section className="bg-transparent h-screen flex items-center justify-center">
            <BlurIn>Piotr<br /> <span className="font-bold text-fuchsia-800">Rzadkowolski</span></BlurIn>
        </section>
    );
}
