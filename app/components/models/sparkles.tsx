import { useScrollAnimation } from '@/app/hooks/useScrollAnimation';
import { Sparkles } from '@react-three/drei';

export default function SparklesBackground() {
    const scrollOffset = useScrollAnimation();

    const sparkleSize = 5;
    const sparkleCount = 100;
    const sparkleSpeed = 1;

    let normalizedOffset;
    if (scrollOffset < 0.32) {
        normalizedOffset = 0;
    } else if (scrollOffset >= 0.32 && scrollOffset <= 0.41) {
        normalizedOffset = (scrollOffset - 0.32) / (0.41 - 0.32);
    } else if (scrollOffset > 0.41 && scrollOffset <= 0.56) {
        normalizedOffset = 1 - (scrollOffset - 0.41) / (0.56 - 0.41);
    } else {
        normalizedOffset = 0;
    }

    return (
        <Sparkles
            count={sparkleCount}
            size={sparkleSize}
            speed={sparkleSpeed}
            opacity={normalizedOffset}
            position={[0, 0, 0]}
            scale={5}
        />
    );
}
