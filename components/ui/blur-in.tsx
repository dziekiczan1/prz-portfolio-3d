'use client';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';

interface BlurInProps {
    children: React.ReactNode;
    className?: string;
}

export const BlurIn = ({ children, className }: BlurInProps) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false });

    return (
        <motion.h1
            ref={ref}
            initial={{ filter: 'blur(20px)', opacity: 0 }}
            animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
            transition={{ duration: 1.2 }}
            className={className}
        >
            {children}
        </motion.h1>
    );
};