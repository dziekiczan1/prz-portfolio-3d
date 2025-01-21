"use client";
import * as React from "react";
import {cn} from "@/lib/utils";
import {useMotionTemplate, useMotionValue, motion} from "framer-motion";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, label, ...props}, ref) => {
        const radius = 250;
        const [visible, setVisible] = React.useState(false);
        const [isFocused, setIsFocused] = React.useState(false);
        const [hasValue, setHasValue] = React.useState(false);

        let mouseX = useMotionValue(0);
        let mouseY = useMotionValue(0);

        function handleMouseMove({currentTarget, clientX, clientY}: any) {
            let {left, top} = currentTarget.getBoundingClientRect();

            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
        }

        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setHasValue(!!e.target.value);
            if (props.onChange) props.onChange(e);
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
                                    ? "-top-4 text-xs text-gray-100"
                                    : "top-1/2 -translate-y-1/2 text-sm text-gray-400"
                            }`
                        )}
                    >
                        {label}
                    </motion.label>
                )}
                <input
                    type={type}
                    className={cn(
                        `flex h-10 w-full rounded-md border border-[rgba(255,255,255,0.4)] bg-slate-900
                         shadow-input px-3 py-2 text-gray-100 text-sm placeholder:text-transparent 
                         focus-visible:outline-none focus-visible:ring-[1px] dark:focus-visible:ring-fuchsia-700
                         disabled:cursor-not-allowed disabled:opacity-50 transition duration-400`,
                        className
                    )}
                    ref={ref}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    {...props}
                />
            </motion.div>
        );
    }
);
Input.displayName = "Input";

export {Input};
