"use client";
import {HoverBorderGradient} from "@/components/ui/button";
import dynamic from "next/dynamic";
import {BlurIn} from "@/components/ui/blur-in";
import {motion} from "framer-motion";
import {FormEvent, useRef, useState} from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";

const Input = dynamic(() => import("@/components/ui/input"), {ssr: false});

export default function Contact() {
    const form = useRef<HTMLFormElement | null>(null);
    const [isSend, setIsSend] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const sendEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.current) return;

        setIsLoading(true);

        const serviceID = process.env.NEXT_PUBLIC_CONTACT_SERVICE;
        const publicKey = process.env.NEXT_PUBLIC_CONTACT_KEY;

        if (!serviceID || !publicKey) {
            console.error("Missing EmailJS credentials.");
            setIsLoading(false);
            return;
        }

        emailjs
            .sendForm(
                serviceID,
                "contact_form",
                form.current,
                publicKey
            )
            .then(
                () => {
                    setIsSend(true);
                    form.current?.reset();
                },
                () => {
                    setIsError(true);
                }
            )
            .finally(() => {
                setIsLoading(false);

                setTimeout(() => {
                    setIsSend(false);
                    setIsError(false);
                }, 2000);
            });
    };

    return (
        <section className="h-screen flex items-center justify-center" id="contact">
            <form id="contact-form" ref={form} onSubmit={sendEmail}
                  className="relative p-8 max-w-5xl w-full mx-auto rounded-xl border border-[rgba(255,255,255,0.4)]
                          bg-gradient-to-b from-[rgba(51,65,85,0.6)] to-[rgba(15,23,42,0.6)]
                          shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm">
                <BlurIn className="text-fuchsia-500 text-4xl font-semibold text-center mb-8">
                    Let’s Connect
                </BlurIn>
                <motion.p initial={{opacity: 0, y: 20}}
                          whileInView={{opacity: 1, y: 0}}
                          transition={{duration: 0.6}}
                          className="text-lg font-normal text-gray-300 leading-relaxed mb-8">
                    Whether you have a project in mind, want to collaborate, or just want to say hello, I’d love to hear
                    from you.
                    Feel free to reach out, and I’ll get back to you as soon as possible. Let’s create something amazing
                    together!
                </motion.p>
                <fieldset className="space-y-8 w-4/5 mx-auto">
                    <Input
                        name="user_name"
                        label="Your Name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full"
                    />
                    <Input
                        name="user_email"
                        label="Email Address"
                        type="email"
                        placeholder="john.doe@example.com"
                        className="w-full"
                    />
                    <Input
                        name="user_subject"
                        label="Subject"
                        type="text"
                        placeholder="Let us know how we can help"
                        className="w-full"
                    />
                    <Input
                        name="message"
                        label="Your Message"
                        textarea
                        rows={4}
                    />
                </fieldset>
                <div className="flex justify-center mt-8">
                    {isLoading ? (
                        <motion.div
                            initial={{opacity: 0, scale: 0.5}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.3}}
                            className="flex flex-col items-center gap-2"
                        >
                            <Image
                                src="./icons/spinner.svg"
                                alt="Loading"
                                width={22}
                                height={22}
                                className="animate-spin"
                            />
                            <p className="text-gray-300 text-xs">Sending...</p>
                        </motion.div>
                    ) : isSend ? (
                        <motion.div
                            initial={{opacity: 0, scale: 0.5}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.3}}
                            className="flex flex-col items-center gap-2"
                        >
                            <Image
                                src="./icons/check.svg"
                                alt="Success"
                                width={22}
                                height={22}
                            />
                            <p className="text-green-500 text-xs">Message Sent!</p>
                        </motion.div>
                    ) : isError ? (
                        <motion.div
                            initial={{opacity: 0, scale: 0.5}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.3}}
                            className="flex flex-col items-center gap-2"
                        >
                            <Image
                                src="./icons/times.svg"
                                alt="Error"
                                width={22}
                                height={22}
                            />
                            <p className="text-red-500 text-xs">Failed to Send. Try Again.</p>
                        </motion.div>
                    ) : (
                        <HoverBorderGradient type="submit" containerClassName="w-2/5">
                            Send Message
                        </HoverBorderGradient>
                    )}
                </div>
            </form>
        </section>
    );
}