
import { Project, NavItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'dream-engine',
    title: 'Dream Engine',
    category: 'Interactive Technology',
    year: '2024',
    image: 'https://picsum.photos/seed/dream/1200/800',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-loop-render-4351-large.mp4',
    gallery: [
      'https://picsum.photos/seed/engine1/1200/800',
      'https://picsum.photos/seed/engine2/1200/800'
    ],
    description: 'A proprietary web-based game engine pushing the boundaries of real-time 3D visuals.',
    tags: ['WebGL', 'Creative Tech', 'Engine'],
    tools: ['Figma', 'Blender', 'GLSL', 'Three.js', 'Typescript']
  },
  {
    id: 'coachella-verse',
    title: 'Coachellaverse',
    category: 'Immersive Experience',
    year: '2023',
    image: 'https://picsum.photos/seed/coachella/1200/800',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-blue-connection-4414-large.mp4',
    gallery: [
      'https://picsum.photos/seed/coachella1/1200/800',
      'https://picsum.photos/seed/coachella2/1200/800'
    ],
    description: 'An expansive digital twin of the Coachella festival, allowing fans to explore virtually.',
    tags: ['AR/VR', 'Metaverse', 'Events'],
    tools: ['8th Wall', 'Spline', 'React Three Fiber', 'Cinema 4D']
  },
  {
    id: 'spotify-wrapped',
    title: 'Spotify Wrapped',
    category: 'Data Visualization',
    year: '2023',
    image: 'https://picsum.photos/seed/spotify/1200/800',
    gallery: [
      'https://picsum.photos/seed/spotify1/1200/800',
      'https://picsum.photos/seed/spotify2/1200/800'
    ],
    description: 'Interactive year-in-review experience for millions of music lovers globally.',
    tags: ['Web Design', 'UI/UX', 'Data'],
    tools: ['Figma', 'After Effects', 'D3.js', 'Framer Motion']
  },
  {
    id: 'google-io',
    title: 'Google I/O Connect',
    category: 'Digital Event',
    year: '2024',
    image: 'https://picsum.photos/seed/google/1200/800',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-background-4402-large.mp4',
    gallery: [
      'https://picsum.photos/seed/google1/1200/800',
      'https://picsum.photos/seed/google2/1200/800'
    ],
    description: 'A global connected experience bridging physical and digital developers.',
    tags: ['Scalable', 'React', 'Experience'],
    tools: ['GCP', 'React', 'Tailwind', 'Figma']
  },
  {
    id: 'prism-ai',
    title: 'Prism AI',
    category: 'Artificial Intelligence',
    year: '2024',
    image: 'https://picsum.photos/seed/prism/1200/800',
    gallery: [
      'https://picsum.photos/seed/prism1/1200/800',
      'https://picsum.photos/seed/prism2/1200/800'
    ],
    description: 'A generative AI platform for visual artists to explore latent space.',
    tags: ['GenAI', 'Latent Space', 'Art'],
    tools: ['Python', 'PyTorch', 'React', 'FastAPI']
  },
  {
    id: 'liquid-motion',
    title: 'Liquid Motion',
    category: 'Motion Graphics',
    year: '2023',
    image: 'https://picsum.photos/seed/liquid/1200/800',
    gallery: [
      'https://picsum.photos/seed/liquid1/1200/800',
      'https://picsum.photos/seed/liquid2/1200/800'
    ],
    description: 'A study of fluid dynamics and organic motion in digital interfaces.',
    tags: ['Motion', 'Fluid', 'UX'],
    tools: ['After Effects', 'Lottie', 'Framer Motion']
  }
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'Projects', href: '#projects' },
  { label: 'Studio', href: '#studio' },
  { label: 'Labs', href: '#labs' },
  { label: 'Contact', href: '#contact' }
];
