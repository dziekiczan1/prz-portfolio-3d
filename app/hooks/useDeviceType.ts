import { useEffect, useState } from 'react';

interface Breakpoints {
    mobile: number;
    tablet: number;
}

interface DeviceType {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

export const useDeviceType = (breakpoints: Breakpoints = { mobile: 768, tablet: 1024 }): DeviceType => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isTablet, setIsTablet] = useState<boolean>(false);
    const [isDesktop, setIsDesktop] = useState<boolean>(false);

    useEffect(() => {
        const checkDeviceType = () => {
            const width = window.innerWidth;

            setIsMobile(width < breakpoints.mobile);
            setIsTablet(width >= breakpoints.mobile && width < breakpoints.tablet);
            setIsDesktop(width >= breakpoints.tablet);
        };

        // Initial check
        checkDeviceType();

        // Update on window resize
        window.addEventListener('resize', checkDeviceType);
        return () => window.removeEventListener('resize', checkDeviceType);
    }, [breakpoints.mobile, breakpoints.tablet]);

    return { isMobile, isTablet, isDesktop };
};