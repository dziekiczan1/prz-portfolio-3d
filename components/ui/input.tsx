"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label?: string;
    textarea?: boolean;
    rows?: number;
    name: string;
    required?: boolean;
    pattern?: string;
    errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
    ({ className, type, label, name, textarea = false, rows, required, pattern, errorMessage, ...props }, ref) => {
        const radius = 250;
        const [visible, setVisible] = React.useState(false);
        const [isFocused, setIsFocused] = React.useState(false);
        const [hasValue, setHasValue] = React.useState(false);
        const [isValid, setIsValid] = React.useState(true);

        const mouseX = useMotionValue(0);
        const mouseY = useMotionValue(0);

        function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
            const { left, top } = currentTarget.getBoundingClientRect();
            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }

        const handleFocus = () => setIsFocused(true);
        const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setIsFocused(false);
            validateInput(e.target);
        };
        const handleChange = (
            e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
        ) => {
            setHasValue(!!e.target.value);
            validateInput(e.target);
            if (props.onChange) props.onChange(e);
        };

        const validateInput = (target: HTMLInputElement | HTMLTextAreaElement) => {
            if (required && !target.value) {
                setIsValid(false);
                return;
            }
            if (pattern && !new RegExp(pattern).test(target.value)) {
                setIsValid(false);
                return;
            }
            setIsValid(true);
        };

        return (
            <motion.div
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
                            var(--fuchsia-700),
                            transparent 80%
                        )
                    `,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                className="p-[2px] rounded-lg transition duration-300 group/input relative"
            >
                {label && (
                    <motion.label
                        className={cn(
                            `absolute left-3 transition-all duration-200 pointer-events-none
                             ${
                                isFocused || hasValue
                                    ? "top-2 lg:-top-5 text-xs text-gray-400 font-semibold"
                                    : !textarea
                                        ? "top-1/2 -translate-y-1/2 text-sm text-gray-400"
                                        : "top-3.5 text-sm text-gray-400"
                            }`
                        )}
                    >
                        {label}
                        {required && <span className="text-fuchsia-500 ml-1">*</span>}
                    </motion.label>
                )}
                {textarea ? (
                    <textarea
                        className={cn(
                            `flex w-full rounded-md border border-[rgba(255,255,255,0.4)] bg-slate-900
                             shadow-input px-3 pt-8 pb-2 lg:pt-2 text-gray-100 text-sm placeholder:text-transparent 
                             focus-visible:outline-none focus-visible:ring-[1px] dark:focus-visible:ring-fuchsia-700
                             disabled:cursor-not-allowed disabled:opacity-50 transition duration-400
                             resize-none`,
                            className
                        )}
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        rows={rows}
                        name={name}
                        required={required}
                        {...props}
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        className={cn(
                            `flex lg:h-12 w-full rounded-md border border-[rgba(255,255,255,0.4)] bg-slate-900
                             shadow-input px-3 pt-8 pb-2 lg:pt-2 text-gray-100 text-sm placeholder:text-transparent 
                             focus-visible:outline-none focus-visible:ring-[1px] dark:focus-visible:ring-fuchsia-700
                             disabled:cursor-not-allowed disabled:opacity-50 transition duration-400`,
                            className
                        )}
                        ref={ref as React.Ref<HTMLInputElement>}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required={required}
                        pattern={pattern}
                        {...props}
                    />
                )}
                {!isValid && errorMessage && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute text-fuchsia-500 -bottom-4 left-3 text-xs !mt-0"
                    >
                        {errorMessage}
                    </motion.p>
                )}
            </motion.div>
        );
    }
);

Input.displayName = "Input";

export default Input;