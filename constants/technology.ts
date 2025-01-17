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
        name: 'Asana',
        originPosition: [-1.5, -1.5, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [-0.4, 0.4, 3],
        mobileFinalPosition: [0.4, 0.4, -0.3],
        scale: 0.1,
        rotation: [0, 0.3, 0],
        texturePath: './technologies/asana.svg'
    },
    {
        name: 'Docker',
        originPosition: [15, -15, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [4, -4, -3],
        mobileFinalPosition: [-4, 4, -3],
        scale: 0.4,
        rotation: [-0.2, 0.5, 0],
        texturePath: './technologies/docker.svg'
    },
    {
        name: 'Framer Motion',
        originPosition: [-15, 15, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [-4, 4, -3],
        mobileFinalPosition: [4, -4, -3],
        scale: 0.5,
        rotation: [0.2, -0.5, 0],
        texturePath: './technologies/framer2.svg'
    },
    {
        name: 'GIT',
        originPosition: [15, 15, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [4, 4, -3],
        mobileFinalPosition: [-4, -4, -3],
        scale: 0.5,
        rotation: [-0.2, -0.5, 0],
        texturePath: './technologies/git.svg'
    },
    {
        name: 'Javascript',
        originPosition: [-15.5, 0, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [-4, 0, -3],
        mobileFinalPosition: [4, 0, -3],
        scale: 0.8,
        rotation: [0.2, 0, 0],
        texturePath: './technologies/javascript.svg'
    },
    {
        name: 'Linux',
        originPosition: [15.5, 0, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [4, 0, -3],
        mobileFinalPosition: [-4, 0, -3],
        scale: 0.4,
        rotation: [-0.2, 0, 0],
        texturePath: './technologies/linux.svg'
    },
    {
        name: 'Magento',
        originPosition: [0, -15.5, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [0, -4, -3],
        mobileFinalPosition: [0, 4, -3],
        scale: 0.8,
        rotation: [0, 0.5, 0],
        texturePath: './technologies/magento.svg'
    },
    {
        name: 'MongoDB',
        originPosition: [0, 15.5, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [0, 4, -3],
        mobileFinalPosition: [0, -4, -3],
        scale: 0.6,
        rotation: [0, -0.5, 0],
        texturePath: './technologies/mongo.svg'
    },
    {
        name: 'Next.JS',
        originPosition: [-16, -16, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [-5, -5, -3],
        mobileFinalPosition: [5, 5, -3],
        scale: 1,
        rotation: [0.3, 0.6, 0],
        texturePath: './technologies/next.svg'
    },
    {
        name: 'Node.JS',
        originPosition: [16, -16, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [5, -5, -3],
        mobileFinalPosition: [-5, 5, -3],
        scale: 0.6,
        rotation: [-0.3, 0.6, 0],
        texturePath: './technologies/nodejs2.svg'
    },
    {
        name: 'NPM',
        originPosition: [-16, 16, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [-5, 5, -3],
        mobileFinalPosition: [5, -5, -3],
        scale: 0.4,
        rotation: [0.3, -0.6, 0],
        texturePath: './technologies/npm.svg'
    },
    {
        name: 'React',
        originPosition: [16, 16, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [9, 4.2, -3],
        mobileFinalPosition: [-5, -5, -3],
        scale: 1,
        rotation: [0.4, -0.7, 0],
        texturePath: './technologies/react.svg'
    },
    {
        name: 'Redux',
        originPosition: [-16.5, 0, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [-5, 0, -3],
        mobileFinalPosition: [5, 0, -3],
        scale: 0.6,
        rotation: [0.3, 0, 0],
        texturePath: './technologies/redux.svg'
    },
    {
        name: 'Sass',
        originPosition: [16.5, 0, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [5, 0, -3],
        mobileFinalPosition: [-5, 0, -3],
        scale: 0.6,
        rotation: [-0.3, 0, 0],
        texturePath: './technologies/sass.svg'
    },
    {
        name: 'Tailwind CSS',
        originPosition: [0, -16.5, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [0, -5, -3],
        mobileFinalPosition: [0, 5, -3],
        scale: 1,
        rotation: [0, 0.6, 0],
        texturePath: './technologies/tailwind.svg'
    },
    {
        name: 'Three.JS',
        originPosition: [0, 16.5, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [0, 5, -3],
        mobileFinalPosition: [0, -5, -3],
        scale: 1,
        rotation: [0, -0.6, 0],
        texturePath: './technologies/threejs.svg'
    },
    {
        name: 'Typescript',
        originPosition: [-17, -17, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [-6, -6, -3],
        mobileFinalPosition: [6, 6, -3],
        scale: 1,
        rotation: [0.4, 0.7, 0],
        texturePath: './technologies/typescript.svg'
    },
    {
        name: 'VSCode',
        originPosition: [17, -17, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [6, -4, -3],
        mobileFinalPosition: [-6, 4, -3],
        scale: 0.4,
        rotation: [-0.4, 0.7, 0],
        texturePath: './technologies/vsc.svg'
    },
    {
        name: 'Webstorm',
        originPosition: [-17, 17, -17],
        mobileOriginPosition: [0, 0, -17],
        finalPosition: [-6, 6, -3],
        mobileFinalPosition: [6, -6, -3],
        scale: 0.4,
        rotation: [0.4, -0.7, 0],
        texturePath: './technologies/webstorm.svg'
    },
];