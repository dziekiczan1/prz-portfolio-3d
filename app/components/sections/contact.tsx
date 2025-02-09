"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import { HoverBorderGradient } from "@/components/ui/button";
import { BlurIn } from "@/components/ui/blur-in";

import { StatusIndicator } from "@/components/ui/status-indicator";
import { useContactForm } from "@/app/hooks/useContactForm";
import { contactSection } from "@/constants/sections";
import { formFields } from "@/constants/contact";

const Input = dynamic(() => import("@/components/ui/input"), { ssr: false });

const FormField = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-10 w-4/5 mx-auto"
    >
        {children}
    </motion.div>
);

export default function Contact() {
    const { formRef, status, handleSubmit } = useContactForm();

    return (
        <section className="h-screen flex items-center justify-center" id="contact">
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="relative p-8 max-w-5xl w-full glass-card"
            >
                <BlurIn className="section-heading">
                    {contactSection.heading}
                </BlurIn>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-lg font-normal text-gray-300 leading-relaxed mb-8"
                >
                    {contactSection.paragraph}
                </motion.p>

                <FormField>
                    {formFields.map((field) => (
                        <Input
                            key={field.name}
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            placeholder={field.placeholder}
                            required={field.required}
                            errorMessage={field.errorMessage}
                            pattern={field.pattern}
                            textarea={field.textarea}
                            rows={field.rows}
                        />
                    ))}
                </FormField>

                <div className="flex justify-center mt-8">
                    {status === "idle" ? (
                        <HoverBorderGradient type="submit" containerClassName="w-2/5">
                            Send Message
                        </HoverBorderGradient>
                    ) : (
                        <StatusIndicator status={status} />
                    )}
                </div>
            </form>
        </section>
    );
}