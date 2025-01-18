'use client';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';

export const BlurIn = ({ children }: { children: React.ReactNode }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: false });
    return (
        <motion.h1
            ref={ref}
            initial={{ filter: 'blur(20px)', opacity: 0 }}
            animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
            transition={{ duration: 1.2 }}
            className="text-9xl font-medium tracking-tighter"
        >
            {children}
        </motion.h1>
    );
};