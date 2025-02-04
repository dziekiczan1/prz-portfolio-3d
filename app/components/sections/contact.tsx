"use client";
import {HoverBorderGradient} from "@/components/ui/button";
import dynamic from "next/dynamic";
import {BlurIn} from "@/components/ui/blur-in";
import {motion} from "framer-motion";
import {FormEvent, useRef, useState} from "react";
import emailjs from "@emailjs/browser";

const Input = dynamic(() => import("@/components/ui/input"), {ssr: false});

export default function Contact() {
    const form = useRef<HTMLFormElement | null>(null);
    const [isSend, setIsSend] = useState(false);
    const [isError, setIsError] = useState(false);

    const sendEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.current) return;

        const serviceID = process.env.NEXT_PUBLIC_CONTACT_SERVICE;
        const publicKey = process.env.NEXT_PUBLIC_CONTACT_KEY;

        if (!serviceID || !publicKey) {
            console.error("Missing EmailJS credentials.");
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
            );
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
                {isSend ? (
                    <div className="contact-form-status">
                        Your message has been successfully sent!
                    </div>
                ) : isError ? (
                    <div className="contact-form-status error">
                        There was a problem with sending your message. Try again!
                    </div>
                ) : null}
                <fieldset className="space-y-8">
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
                <HoverBorderGradient type="submit" containerClassName="w-full mt-8">
                    Send Message
                </HoverBorderGradient>
            </form>
        </section>
    );
}