export type FormStatus = "idle" | "loading" | "success" | "error";

export type FormFieldConfig = {
    name: string;
    label: string;
    type?: string;
    placeholder: string;
    required?: boolean;
    errorMessage: string;
    textarea?: boolean;
    rows?: number;
    pattern?: string;
};