"use client";
// import {Input} from "@/components/ui/input";
import {HoverBorderGradient} from "@/components/ui/button";
import dynamic from "next/dynamic";
const Input = dynamic(() => import("@/components/ui/input"), { ssr: false });

export default function Contact() {
    return (
        <section className="h-screen flex items-center justify-center" id="contact">
            <form className="relative p-8 max-w-2xl w-full mx-auto rounded-xl border border-[rgba(255,255,255,0.4)]
                          bg-gradient-to-b from-[rgba(51,65,85,0.6)] to-[rgba(15,23,42,0.6)]
                          shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm">
                <h2 className="text-fuchsia-500 text-4xl font-semibold text-center mb-8">
                    Get in Touch
                </h2>
                <fieldset className="space-y-8">
                    <Input
                        label="Your Name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full"
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="john.doe@example.com"
                        className="w-full"
                    />
                    <Input
                        label="Subject"
                        type="text"
                        placeholder="Let us know how we can help"
                        className="w-full"
                    />
                    <Input
                        label="Your Message"
                        textarea
                        rows={4}
                    />
                </fieldset>
                <HoverBorderGradient type="submit" containerClassName="w-full mt-8">
                    Send Message
                </HoverBorderGradient>
            </form>
        </section>
    );
}