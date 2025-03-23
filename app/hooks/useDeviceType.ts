import { useEffect, useState } from 'react';

interface Breakpoints {
    mobile: number;
}

interface DeviceType {
    isMobile: boolean;
    isDesktop: boolean;
}

export const useDeviceType = (breakpoints: Breakpoints = { mobile: 1024 }): DeviceType => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isDesktop, setIsDesktop] = useState<boolean>(false);

    useEffect(() => {
        const checkDeviceType = () => {
            const width = window.innerWidth;

            setIsMobile(width < breakpoints.mobile);
            setIsDesktop(width >= breakpoints.mobile);
        };

        // Initial check
        checkDeviceType();

        // Update on window resize
        window.addEventListener('resize', checkDeviceType);
        return () => window.removeEventListener('resize', checkDeviceType);
    }, [breakpoints.mobile]);

    return { isMobile, isDesktop };
};
