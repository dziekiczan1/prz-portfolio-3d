"use client";
import React, {useState, useEffect, useCallback} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";
type Variant = "primary" | "secondary";

export function HoverBorderGradient({
                                        children,
                                        containerClassName,
                                        className,
                                        variant = "primary",
                                        as: Tag = "button",
                                        duration = 1,
                                        clockwise = true,
                                        ...props
                                    }: React.PropsWithChildren<
    {
        as?: React.ElementType;
        containerClassName?: string;
        className?: string;
        variant?: Variant;
        duration?: number;
        clockwise?: boolean;
        type?: "button" | "submit" | "reset";
    } & React.HTMLAttributes<HTMLElement>
>) {
    const [hovered, setHovered] = useState<boolean>(false);
    const [direction, setDirection] = useState<Direction>("TOP");
    const [gradientAngle, setGradientAngle] = useState<number>(45);

    const rotateDirection = useCallback((currentDirection: Direction): Direction => {
        const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
        const currentIndex = directions.indexOf(currentDirection);
        const nextIndex = clockwise
            ? (currentIndex - 1 + directions.length) % directions.length
            : (currentIndex + 1) % directions.length;
        return directions[nextIndex];
    }, [clockwise]);

    const movingMap: Record<Direction, string> = {
        TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
        LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
        BOTTOM:
            "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
        RIGHT:
            "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    };

    const primaryHighlight = "radial-gradient(75% 181.2% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";
    const secondaryHighlight = "radial-gradient(75% 181.2% at 50% 50%, #86198F 0%, rgba(255, 255, 255, 0) 100%)";

    useEffect(() => {
        if (!hovered) {
            const interval = setInterval(() => {
                setDirection((prevState) => rotateDirection(prevState));
            }, duration * 1000);
            return () => clearInterval(interval);
        }
    }, [hovered, duration, rotateDirection]);

    useEffect(() => {
        if (hovered) {
            const interval = setInterval(() => {
                setGradientAngle((prevAngle) => (prevAngle + 1) % 360);
            }, 20);
            return () => clearInterval(interval);
        } else {
            setGradientAngle(45);
        }
    }, [hovered]);

    return (
        <Tag
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(
                "relative flex rounded-full border-2 transition duration-500 items-center " +
                "flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
                variant === "primary" ? "border-fuchsia-800 hover:bg-slate-800" : "border-slate-400 hover:bg-fuchsia-800",
                containerClassName
            )}
            {...props}
        >
            <div
                className={cn(
                    "w-auto text-gray-100 z-10 px-4 py-2 rounded-[inherit]",
                    className
                )}
            >
                {children}
            </div>

            <motion.div
                className="absolute inset-0 overflow-hidden z-0 rounded-[inherit]"
                style={{
                    filter: "blur(2px)",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                }}
                initial={{ background: movingMap[direction] }}
                animate={{
                    background: hovered
                        ? [movingMap[direction], variant === "primary" ? primaryHighlight : secondaryHighlight]
                        : movingMap[direction],
                }}
                transition={{ ease: "linear", duration: duration ?? 1 }}
            />

            <motion.div
                className="absolute inset-0 z-1 rounded-[inherit]"
                initial={{
                    background: variant === "primary"
                        ? "linear-gradient(45deg, hsl(215, 16%, 35%), hsl(222, 47%, 11%))"
                        : "linear-gradient(45deg, #86198F, hsl(270, 50%, 60%)",
                }}
                animate={{
                    background: `linear-gradient(${gradientAngle}deg, ${
                        variant === "primary" ? "hsl(215, 16%, 35%), hsl(222, 47%, 11%)" : "#86198F, hsl(270, 70%, 60%)"
                    })`,
                }}
                transition={{ ease: "linear", duration: 0.5 }}
            />
        </Tag>
    );
}
