export const technologyData: {
    name: string;
    originPosition: [number, number, number];
    mobileOriginPosition: [number, number, number];
    finalPosition: [number, number, number];
    mobileFinalPosition: [number, number, number];
    scale: number;
    rotation: [number, number, number];
    texturePath: string;
}[] = [
    {
        name: 'Next.JS',
        originPosition: [-15, 0, 0],
        mobileOriginPosition: [0, 0, 0],
        finalPosition: [0, 0, -3],
        mobileFinalPosition: [0, 0, -3],
        scale: 1,
        rotation: [0, 0, 0],
        texturePath: './technologies/next.svg'
    },
    {
        name: 'Magento',
        originPosition: [15, -2, 0],
        mobileOriginPosition: [0, 0, 0],
        finalPosition: [3, 0, -15],
        mobileFinalPosition: [0, 0, -3],
        scale: 0.5,
        rotation: [0, -Math.PI / 6, 0],
        texturePath: './technologies/magento.svg'
    },
    {
        name: 'Linux',
        originPosition: [0, 15, 0],
        mobileOriginPosition: [0, 0, 0],
        finalPosition: [-3, 0, -3],
        mobileFinalPosition: [0, 0, -3],
        scale: 0.5,
        rotation: [Math.PI / 12, Math.PI / 6, 0],
        texturePath: './technologies/linux.svg'
    },
];