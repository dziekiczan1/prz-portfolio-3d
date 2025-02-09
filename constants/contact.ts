import {FormFieldConfig} from "@/types/form";

export const formFields: FormFieldConfig[] = [
    {
        name: "user_name",
        label: "Your Name",
        type: "text",
        placeholder: "John Doe",
        required: true,
        errorMessage: "Please enter your name.",
    },
    {
        name: "user_email",
        label: "Email Address",
        type: "email",
        placeholder: "john.doe@example.com",
        required: true,
        pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
        errorMessage: "Please enter a valid email address.",
    },
    {
        name: "user_subject",
        label: "Subject",
        type: "text",
        placeholder: "Let us know how we can help",
        required: true,
        errorMessage: "Please enter a subject.",
    },
    {
        name: "message",
        label: "Your Message",
        placeholder: "Write your message here...",
        required: true,
        errorMessage: "Please enter a message.",
        textarea: true,
        rows: 4,
    },
];