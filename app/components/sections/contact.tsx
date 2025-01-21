"use client";
import {Input} from "@/components/ui/input";
import {HoverBorderGradient} from "@/components/ui/button";

export default function Contact() {
    return (
        <section className="h-screen flex items-center justify-center" id="contact">
            <div
                className="relative p-8 max-w-xl w-full mx-auto rounded-xl border border-[rgba(255,255,255,0.4)]
                          bg-gradient-to-b from-[rgba(51,65,85,0.6)] to-[rgba(15,23,42,0.6)]
                          shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm"
            >
                <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
                    Get in Touch
                </h2>
                <form className="space-y-6">
                    <div>
                        <Input
                            label="Your Name"
                            type="text"
                            placeholder="John Doe"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="john.doe@example.com"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Input
                            label="Subject"
                            type="text"
                            placeholder="Let us know how we can help"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <textarea
                            id="message"
                            rows={4}
                            className="w-full rounded-md border border-[rgba(255,255,255,0.4)] bg-[rgba(15,23,42,0.6)]
                                      text-gray-100 text-sm placeholder:text-gray-400 px-3 py-2
                                      focus-visible:outline-none focus-visible:ring-[1px] focus-visible:ring-fuchsia-500
                                      transition duration-200"
                            placeholder="Write your message here..."
                        />
                    </div>
                    <div className="flex justify-center">
                        <HoverBorderGradient type="submit" containerClassName="w-full">
                            Send Message
                        </HoverBorderGradient>
                    </div>
                </form>
            </div>
        </section>
    );
}