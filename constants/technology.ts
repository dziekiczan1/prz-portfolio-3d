export const technologyData: {
    originPosition: [number, number, number];
    finalPosition: [number, number, number];
    scale: number;
    rotation: [number, number, number];
    texturePath: string;
}[] = [
    { originPosition: [-15, 0, 0], finalPosition: [0, 0, 0], scale: 1, rotation: [0, 0, 0], texturePath: './technologies/next.svg' },
    { originPosition: [15, -2, 0], finalPosition: [3, 0, 0], scale: 1, rotation: [0.3, 0.2, 0], texturePath: './technologies/magento.svg'  },
    { originPosition: [0, 15, -2], finalPosition: [-3, 0, 0], scale: 1, rotation: [0, Math.PI / 4, 0], texturePath: './technologies/linux.svg'  },
];