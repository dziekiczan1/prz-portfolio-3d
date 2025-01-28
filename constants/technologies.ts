export const technologiesData: {
    name: string;
    originPosition: [number, number, number];
    mobileOriginPosition: [number, number, number];
    finalPosition: [number, number, number];
    mobileFinalPosition: [number, number, number];
    scale: number;
    rotation: [number, number, number];
    decalScale?: number;
    decalPosition?: [number, number, number];
    texturePath: string;
}[] = [
    {
        name: 'Asana',
        originPosition: [-1.5, -2.5, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [-1, -0.65, 3],
        mobileFinalPosition: [0.4, 0.4, -0.3],
        scale: 0.08,
        rotation: [0, -0.2, 0],
        texturePath: './technologies/asana.svg'
    },
    {
        name: 'Docker',
        originPosition: [-2.5, -1.5, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [-1.25, -0.35, -3],
        mobileFinalPosition: [-4, 4, -3],
        scale: 0.08,
        rotation: [-0.2, 0.3, 0],
        texturePath: './technologies/docker.svg'
    },
    {
        name: 'Framer Motion',
        originPosition: [-1.4, -2.4, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [-0.4, -0.65, -3],
        mobileFinalPosition: [4, -4, -3],
        scale: 0.08,
        rotation: [0.2, 0.2, 0],
        texturePath: './technologies/framer.svg'
    },
    {
        name: 'GIT',
        originPosition: [-1.5, -0.5, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [-1.3, 0.2, -3],
        mobileFinalPosition: [-4, -4, -3],
        scale: 0.12,
        rotation: [0.1, 0.3, 0],
        texturePath: './technologies/git.svg'
    },
    {
        name: 'Javascript',
        originPosition: [-1, 1.3, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [-0.85, 0.8, -3],
        mobileFinalPosition: [4, 0, -3],
        scale: 0.12,
        rotation: [0.2, 0.1, 0],
        decalScale: 1.2,
        texturePath: './technologies/javascript.svg'
    },
    {
        name: 'Linux',
        originPosition: [2.4, -1.5, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [1.65, -0.35, 3],
        mobileFinalPosition: [-4, 0, -3],
        scale: 0.1,
        rotation: [-0.2, -0.2, 0],
        texturePath: './technologies/linux.svg'
    },
    {
        name: 'Magento',
        originPosition: [1.3, -1.5, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [1.3, -0.5, -3],
        mobileFinalPosition: [0, 4, -3],
        scale: 0.15,
        rotation: [-0.1, -0.2, 0],
        decalScale: 1.2,
        texturePath: './technologies/magento.svg'
    },
    {
        name: 'MongoDB',
        originPosition: [-1.2, -1.5, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [-1.7, -0.7, -3],
        mobileFinalPosition: [0, -4, -3],
        scale: 0.12,
        rotation: [0, 0.3, 0],
        texturePath: './technologies/mongo.svg'
    },
    {
        name: 'Next.JS',
        originPosition: [-2.6, 1.6, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [-1.6, -0.35, -3],
        mobileFinalPosition: [5, 5, -3],
        scale: 0.2,
        rotation: [0.1, 0.3, 0],
        texturePath: './technologies/next.svg'
    },
    {
        name: 'Node.JS',
        originPosition: [-0.5, 1.6, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [-0.25, 0.75, -3],
        mobileFinalPosition: [-5, 5, -3],
        scale: 0.1,
        rotation: [0.2, 0.3, 0],
        texturePath: './technologies/nodejs.svg'
    },
    {
        name: 'Figma',
        originPosition: [1.6, -2.4, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [0.85, -0.65, -3],
        mobileFinalPosition: [5, -5, -3],
        scale: 0.08,
        rotation: [0.2, -0.2, 0],
        decalScale: 1,
        texturePath: './technologies/figma.svg'
    },
    {
        name: 'React',
        originPosition: [1.6, 1.6, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [0.2, 0.75, 3],
        mobileFinalPosition: [-5, -5, -3],
        scale: 0.15,
        rotation: [0, 0, 0],
        decalScale: 1,
        texturePath: './technologies/react.svg'
    },
    {
        name: 'Redux',
        originPosition: [1.5, 1.2, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [0.75, 0.75, 3],
        mobileFinalPosition: [5, 0, -3],
        scale: 0.1,
        rotation: [0.1, 0, 0],
        texturePath: './technologies/redux.svg'
    },
    {
        name: 'Sass',
        originPosition: [2.5, 0, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [1.82, -0.15, 3],
        mobileFinalPosition: [-5, 0, -3],
        scale: 0.08,
        rotation: [-0.3, 0, 0],
        texturePath: './technologies/sass.svg'
    },
    {
        name: 'Tailwind CSS',
        originPosition: [1, -1.5, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [1.45, 0.3, 3],
        mobileFinalPosition: [0, 5, -3],
        scale: 0.18,
        rotation: [0, -0.2, 0],
        decalScale: 0.9,
        texturePath: './technologies/tailwind.svg'
    },
    {
        name: 'GraphQL',
        originPosition: [0, -2.5, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [0.6, -0.65, 3],
        mobileFinalPosition: [0, 5, -3],
        scale: 0.1,
        rotation: [0, -0.2, 0],
        decalScale: 0.9,
        texturePath: './technologies/graphql.svg'
    },
    {
        name: 'Jira',
        originPosition: [0, -2.4, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [0.1, -0.65, 3],
        mobileFinalPosition: [0, 5, -3],
        scale: 0.07,
        rotation: [0, -0.2, 0],
        decalScale: 0.8,
        texturePath: './technologies/jira.svg'
    },
    {
        name: 'Three.JS',
        originPosition: [1.3, 1.5, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [1.2, 0.5, 3],
        mobileFinalPosition: [0, -5, -3],
        scale: 0.15,
        rotation: [0, -0.1, 0],
        texturePath: './technologies/threejs.svg'
    },
    {
        name: 'Typescript',
        originPosition: [-1.7, 1.7, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [-1.4, 0.6, -3],
        mobileFinalPosition: [6, 6, -3],
        scale: 0.2,
        rotation: [0.2, 0.2, 0],
        texturePath: './technologies/typescript.svg'
    },
    {
        name: 'VSCode',
        originPosition: [-2.5, 1.7, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [-1.8, 0.25, -3],
        mobileFinalPosition: [-6, 4, -3],
        scale: 0.1,
        rotation: [0.1, 0.3, 0],
        decalScale: 1.2,
        texturePath: './technologies/vsc.svg'
    },
    {
        name: 'Webstorm',
        originPosition: [1.7, 1.7, -1.7],
        mobileOriginPosition: [0, 0, -1.7],
        finalPosition: [1.9, 0.4, 3],
        mobileFinalPosition: [6, -6, -3],
        scale: 0.09,
        rotation: [0.2, -0.1, 0],
        decalScale: 1,
        texturePath: './technologies/webstorm.svg'
    },
];