export const profile = {
  name: 'Mujtabo Saidamirzoda',
  firstName: 'Mujtabo',
  role: 'Full-Stack Developer',
  location: 'Bandung, Indonesia',
  timeZone: 'Asia/Jakarta',
  email: 's.mujtabo05@gmail.com',
  whatsapp: 'https://wa.me/6282218865809',
  socials: [
    { label: 'GitHub', href: 'https://github.com/codewithmujtabo' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mujtabo-saidamirzoda-393b13258/' },
    { label: 'Instagram', href: 'https://www.instagram.com/mujtabosaidaliev?igsh=M2wyZ2s5c2VudXdv&utm_source=qr' },
  ],
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const stack = [
  'Java', 'Spring', 'Spring Boot', 'GraphQL', 'C++', 'ReactJS', 'Next.js', 'TypeScript', 'React Native', 'Expo', 'Supabase',
  'JavaScript', 'PHP', 'Laravel', 'MySQL', 'Bootstrap', 'Vite', 'HTML5', 'CSS3',
];

export type Slide = { src: string; label: string };

/** What plays on the 3D device screen: a looping video, or a slideshow of screenshots. */
export type Media = { type: 'video'; src: string } | { type: 'slides'; slides: Slide[] };

export type Project = {
  title: string;
  kind: string;
  /** e.g. "In development" — shown as a badge */
  status?: string;
  link?: string;
  description1: string;
  description2: string;
  tech: { name: string; icon?: string }[];
  media: Media;
  device: 'laptop' | 'phone';
};

const t = {
  js: { name: 'JavaScript', icon: '/languages/skill-icons--javascript.svg' },
  html: { name: 'HTML5', icon: '/languages/devicon--html5.svg' },
  css: { name: 'CSS3', icon: '/languages/devicon--css3.svg' },
  vite: { name: 'Vite', icon: '/languages/vscode-icons--file-type-vite.svg' },
  scrollreveal: { name: 'ScrollReveal', icon: '/languages/simple-icons--scrollreveal.svg' },
  next: { name: 'Next.js' },
  react: { name: 'React' },
  ts: { name: 'TypeScript' },
  router: { name: 'React Router' },
  rest: { name: 'REST API' },
  expo: { name: 'Expo' },
  rn: { name: 'React Native' },
  nativewind: { name: 'NativeWind' },
  supabase: { name: 'Supabase' },
  zustand: { name: 'Zustand' },
  i18n: { name: 'i18next' },
};

const slides = (dir: string, items: [string, string][]): Media => ({
  type: 'slides',
  slides: items.map(([file, label]) => ({ src: `/projects/${dir}/${file}.webp`, label })),
});

export const projects: Project[] = [
  {
    title: 'Competzy',
    kind: 'Student competition platform',
    link: 'https://competzy.com',
    description1:
      'A competition platform for Indonesian students from elementary to senior high school, bringing national and international olympiads such as Komodo, Owlypia, EMC and ISPO under one roof. Students browse competitions by level, category and tier, and follow deadlines and results in one place.',
    description2:
      'Its companion portal, Arena, signs users into every competition with a single account, with separate onboarding for students, teachers and school admins, a personal dashboard for registrations, certificates and scores, plus bilingual (ID/EN) and dark-mode support.',
    tech: [t.next, t.react],
    media: slides('competzy', [
      ['home', 'Homepage'],
      ['register', 'Arena · Sign up'],
      ['dashboard', 'Arena · Dashboard'],
    ]),
    device: 'laptop',
  },
  {
    title: 'Music UPI Records',
    kind: 'Record label site + CMS',
    link: 'https://musikupirecords.com',
    description1:
      'The official website of Music UPI Records, a label that publishes and distributes music by talent from Universitas Pendidikan Indonesia. Visitors can explore the label’s story, listen to tracks, watch music videos and read the latest news.',
    description2:
      'Behind it is a custom admin dashboard where the team manages every part of the site (hero, carousel slides, tracks with audio uploads, playlists, videos, news, drops and the About page) through a REST API, with Spotify and YouTube integration.',
    tech: [t.react, t.vite, t.router, t.rest],
    media: slides('musikupi', [
      ['homepage', 'Homepage'],
      ['about_us', 'About us'],
      ['tracks', 'Tracks'],
      ['videos', 'Videos'],
      ['news', 'News'],
      ['admin_dashboard', 'Admin · Dashboard'],
      ['manage_tracks', 'Admin · Manage tracks'],
    ]),
    device: 'laptop',
  },
  {
    title: 'AnbiyaGo',
    kind: 'Mobile learning app',
    status: 'In development',
    description1:
      'A mobile app for learning about the 25 prophets through stories and quizzes, in English, Russian, Arabic and Turkish. Reading and quizzes work fully offline, with XP, levels, streaks, badges and a leaderboard to keep learners coming back.',
    description2:
      'Built with Expo and React Native using Expo Router, NativeWind and Zustand. Optional anonymous Supabase accounts power the friends feature, and the bundled content holds 498 quiz questions per language, now in editorial review ahead of the App Store and Google Play release.',
    tech: [t.expo, t.rn, t.ts, t.nativewind, t.supabase, t.zustand, t.i18n],
    media: slides('anbiyago', [
      ['home_page', 'Home'],
      ['learn_page', 'Learn'],
      ['main_prophet_page', 'Prophets'],
      ['prophet_story_page', 'Prophet story'],
      ['quiz_page', 'Quiz'],
      ['inside_quiz_page', 'In a quiz'],
      ['leaderboard_page', 'Leaderboard'],
      ['profile_page', 'Profile'],
    ]),
    device: 'phone',
  },
  {
    title: 'Headphones Landing Page',
    kind: 'Product landing page',
    description1:
      'A visually engaging, responsive landing page designed to showcase premium headphones, with smooth scroll-based animations, interactive navigation, and a modern product display section.',
    description2:
      'Built using semantic HTML5, modular CSS, and vanilla JavaScript, leveraging ScrollReveal.js for dynamic animations and Remix Icons for crisp, scalable icons. Fully responsive across desktops, tablets, and mobile.',
    tech: [t.js, t.html, t.css, t.scrollreveal],
    media: { type: 'video', src: '/projects/headphones-website.mp4' },
    device: 'laptop',
  },
  {
    title: 'To-Do List Web App',
    kind: 'Productivity tool',
    description1:
      'A simple and elegant to-do list application built with vanilla JavaScript, HTML, and CSS. Users can quickly add and remove tasks through a clean, intuitive interface.',
    description2:
      'Features dynamic DOM manipulation for real-time task updates and a responsive design for usability across devices. Lightweight and dependency-free.',
    tech: [t.js, t.html, t.css],
    media: { type: 'video', src: '/projects/to-do-list-app.mp4' },
    device: 'phone',
  },
  {
    title: 'Sushi Restaurant Landing Page',
    kind: 'Restaurant website',
    description1:
      'A visually engaging landing page for a sushi restaurant with a hero banner, popular menu highlights, trending dishes, and a subscription form designed to attract and engage visitors.',
    description2:
      'Modular CSS for organized styling and Vite for efficient bundling deliver a fast, responsive experience. Curated images and SVG icons enhance the aesthetic.',
    tech: [t.js, t.html, t.css, t.vite],
    media: { type: 'video', src: '/projects/sushi-website.mp4' },
    device: 'laptop',
  },
];

export const experience = [
  {
    tag: 'Internship',
    role: 'Full Stack Developer Intern',
    org: 'Tryidol Technologies',
    desc: 'Built a CRM application for vehicle rental services, streamlining processes for efficient bill generation and client management.',
  },
  {
    tag: 'Internship',
    role: 'Full Stack Developer Intern',
    org: 'Droit',
    desc: 'Engineered consultancy software using Curable to optimize online consultations and enhance digital healthcare services.',
  },
  {
    tag: 'Award',
    role: 'Hackhazards Hackathon — Winner',
    org: '1st place of 150 participants',
    desc: 'Secured first place by combining hardware and software into a single working solution under hackathon time pressure.',
    highlight: '1st / 150',
  },
  {
    tag: 'Challenge',
    role: 'Shiksha Arpan Web Development Challenge',
    org: 'UI design & development',
    desc: 'Designed and developed the UI for the Enhanced Tutor Matching Algorithm feature, making tutor recommendations easy to use and clear to read.',
  },
];
