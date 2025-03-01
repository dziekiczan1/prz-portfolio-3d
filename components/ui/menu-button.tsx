import React from "react";
import {motion, Transition, SVGMotionProps} from "framer-motion";

interface LineProps {
    stroke: string;
    strokeWidth: number;
    vectorEffect: string;
    initial: string;
    animate: string;
    transition?: Transition;
}

interface Props extends SVGMotionProps<SVGElement> {
    width?: number | string;
    height?: number | string;
    isOpen?: boolean;
    color?: string;
    strokeWidth?: string | number;
    transition?: Transition;
    lineProps?: Partial<LineProps>;
}

export const MenuButton = ({
                        isOpen = false,
                        width = 24,
                        height = 24,
                        strokeWidth = 1,
                        color = "#f3f4f6",
                        transition = undefined,
                        lineProps = {},
                        ...props
                    }: Props) => {
    const variant = isOpen ? "opened" : "closed";
    const top = {
        closed: {
            rotate: 0,
            translateY: 0
        },
        opened: {
            rotate: 45,
            translateY: 2
        }
    };
    const center = {
        closed: {
            opacity: 1
        },
        opened: {
            opacity: 0
        }
    };
    const bottom = {
        closed: {
            rotate: 0,
            translateY: 0
        },
        opened: {
            rotate: -45,
            translateY: -2
        }
    };

    const resolvedLineProps: LineProps = {
        stroke: color,
        strokeWidth: strokeWidth as number,
        vectorEffect: "non-scaling-stroke",
        initial: "closed",
        animate: variant,
        transition,
        ...lineProps
    };

    const unitHeight = 6;
    const unitWidth = (unitHeight * (width as number)) / (height as number);

    return (
        <motion.svg
            viewBox={`0 0 ${unitWidth} ${unitHeight}`}
            overflow="visible"
            preserveAspectRatio="none"
            width={width}
            height={height}
            {...props}
        >
            <motion.line
                x1="0"
                x2={unitWidth}
                y1="1"
                y2="1"
                variants={top}
                {...resolvedLineProps}
            />
            <motion.line
                x1="0"
                x2={unitWidth}
                y1="3"
                y2="3"
                variants={center}
                {...resolvedLineProps}
            />
            <motion.line
                x1="0"
                x2={unitWidth}
                y1="5"
                y2="5"
                variants={bottom}
                {...resolvedLineProps}
            />
        </motion.svg>
    );
};