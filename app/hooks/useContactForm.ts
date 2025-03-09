import {FormEvent, useRef, useState} from "react";
import {FormStatus} from "@/types/form";
import emailjs from "@emailjs/browser";

export const useContactForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<FormStatus>("idle");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        console.log(formData);
        const email = formData.get("user_email") as string;

        console.log(email, typeof email);

        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        if (!emailRegex.test(email)) {
            console.log('Invalid email');
            return;
        }

        const serviceID = process.env.NEXT_PUBLIC_CONTACT_SERVICE;
        const publicKey = process.env.NEXT_PUBLIC_CONTACT_KEY;

        if (!serviceID || !publicKey) {
            console.error("Missing EmailJS credentials");
            setStatus("error");
            return;
        }

        try {
            setStatus("loading");
            await emailjs.sendForm(serviceID, "contact_form", formRef.current, publicKey);
            setStatus("success");
            formRef.current.reset();
        } catch (error) {
            console.error("Email sending failed:", error);
            setStatus("error");
        } finally {
            setTimeout(() => setStatus("idle"), 2000);
        }
    };

    return { formRef, status, handleSubmit };
};