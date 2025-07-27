"use client"

import React, { useState } from 'react';
import Computer3D from './Computer3D';
import Phone3D from './Phone3D';

const projects = [
  {
    title: 'Car Rental Web App',
    description1: 'A modern car rental platform powered by Laravel (PHP), MySQL, and Bootstrap. The application features secure user authentication, dynamic car listings, and a streamlined booking system for easy reservations.',
    description2: 'Built with Vite for fast asset bundling, the platform offers a responsive user interface to ensure a seamless experience across all devices.',
    icons: [
      '/languages/php.svg',
      '/languages/devicon--laravel.svg',
      '/languages/devicon--mysql-wordmark.svg',
      '/languages/skill-icons--javascript.svg',
      '/languages/devicon--html5.svg',
      '/languages/devicon--css3.svg',
      '/languages/devicon--bootstrap.svg',
      '/languages/vscode-icons--file-type-vite.svg',
    ],
    image: '/projects/rentcarhere.mp4',
    usePhone: false,
    icon: '/images/icon_project_1.png',
    spotlight: '/images/spotlight_project_1.png',
    live: '#',
  },
  {
    title: 'Image Search App',
    description1: 'A dynamic image search application built with React and the Unsplash API. Features a modern, responsive grid layout that showcases stunning visuals based on user queries.',
    description2: 'Leverages asynchronous requests to fetch data from the Unsplash API, providing users with a seamless and interactive browsing experience. The clean UI ensures that the focus remains on the beautiful imagery.',
    icons: [
      '/languages/skill-icons--javascript.svg',
      '/languages/devicon--html5.svg',
      '/languages/devicon--css3.svg',
      '/languages/hugeicons--unsplash.svg',
    ],
    image: '/projects/image-search-app.mp4',
    usePhone: true,
    icon: '/images/icon_project_1.png',
    spotlight: '/images/spotlight_project_1.png',
    live: '#',
  },
  {
    title: 'Headphones Landing Page',
    description1: 'A visually engaging, responsive landing page designed to showcase premium headphones. This project features smooth scroll-based animations, interactive navigation, and a modern product display section, all crafted for an immersive user experience.',
    description2: 'Built using semantic HTML5, modular CSS, and vanilla JavaScript, the landing page leverages ScrollReveal.js for dynamic animations and Remix Icons for crisp, scalable icons. The design is fully responsive, ensuring optimal viewing on desktops, tablets, and mobile devices.',
    icons: [
      '/languages/skill-icons--javascript.svg',
      '/languages/devicon--html5.svg',
      '/languages/devicon--css3.svg',
      '/languages/simple-icons--scrollreveal.svg',
    ],
    image: '/projects/headphones-website.mp4',
    usePhone: false,
    icon: '/images/icon_project_1.png',
    spotlight: '/images/spotlight_project_1.png',
    live: '#',
  },
  {
    title: 'Aim Training Game',
    description1: 'Aim Training Game is an interactive web application designed to help users improve their mouse accuracy and reaction speed. The game features a simple, engaging interface where players select a time limit and try to click as many randomly appearing circles as possible within the allotted time.',
    description2: 'Developed using vanilla JavaScript, HTML, and CSS, the project showcases dynamic DOM manipulation, responsive layouts, and smooth transitions for an enjoyable user experience. The application is lightweight, fast, and works seamlessly across modern browsers.',
    icons: [
      '/languages/skill-icons--javascript.svg',
      '/languages/devicon--html5.svg',
      '/languages/devicon--css3.svg',
    ],
    image: '/projects/aimtraining.mp4',
    usePhone: false,
    icon: '/images/icon_project_1.png',
    spotlight: '/images/spotlight_project_1.png',
    live: '#',
  },
  {
    title: 'To-Do List Web App',
    description1: 'A simple and elegant to-do list application built with vanilla JavaScript, HTML, and CSS. The app allows users to quickly add and remove tasks, providing a clean and intuitive interface for managing daily activities.',
    description2: 'The project features dynamic DOM manipulation for real-time task updates and a responsive design for usability across devices. Lightweight and dependency-free, it demonstrates core front-end development skills and interactive UI techniques.',
    icons: [
      '/languages/skill-icons--javascript.svg',
      '/languages/devicon--html5.svg',
      '/languages/devicon--css3.svg',
    ],
    image: '/projects/to-do-list-app.mp4',
    usePhone: true,
    icon: '/images/icon_project_1.png',
    spotlight: '/images/spotlight_project_1.png',
    live: '#',
  },
  {
    title: 'Sushi Restaurant Landing Page',
    description1: 'A visually engaging landing page for a sushi restaurant, crafted with modern HTML, CSS, and JavaScript. The site features interactive sections such as a hero banner, popular menu highlights, trending dishes, and a subscription form, all designed to attract and engage visitors.',
    description2: 'Utilizing modular CSS for organized styling and Vite for efficient asset bundling, the project delivers a fast, responsive, and visually appealing user experience across devices. Carefully curated images and SVG icons enhance the sites aesthetic, making it ideal for portfolio presentation.',
    icons: [
      '/languages/skill-icons--javascript.svg',
      '/languages/devicon--html5.svg',
      '/languages/devicon--css3.svg',
      '/languages/vscode-icons--file-type-vite.svg',
    ],
    image: '/projects/sushi-website.mp4',
    usePhone: false,
    icon: '/images/icon_project_1.png',
    spotlight: '/images/spotlight_project_1.png',
    live: '#',
  },
  {
    title: 'Weather App',
    description1: 'A sleek and intuitive weather application that allows users to instantly check real-time weather conditions for any city. The app features a clean interface, dynamic weather icons, and detailed metrics such as temperature, humidity, wind speed, and "feels like" temperature.',
    description2: 'Developed using vanilla JavaScript for interactive data fetching and DOM updates, the project leverages semantic HTML5 and modern CSS3 for a responsive, mobile-friendly design. The codebase is lightweight, making it ideal for portfolio demonstration and rapid deployment.',
    icons: [
      '/languages/skill-icons--javascript.svg',
      '/languages/devicon--html5.svg',
      '/languages/devicon--css3.svg',
      '/languages/fluent-color--weather-sunny-low-20.svg',
    ],
    image: '/projects/weather-app.mp4',
    usePhone: true,
    icon: '/images/icon_project_1.png',
    spotlight: '/images/spotlight_project_1.png',
    live: '#',
  },
];

const Projects = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const project = projects[current];

  const handleChange = (newIndex: number) => {
    setAnimating(true);
    setLoading(false);
    setNextIndex(newIndex);
    setTimeout(() => {
      setLoading(true);
      setAnimating(false);
      setTimeout(() => {
        setCurrent(newIndex);
        setLoading(false);
        setNextIndex(null);
      }, 700); // loading duration
    }, 400); // fade out duration
  };

  const handlePrev = () => {
    const newIndex = current === 0 ? projects.length - 1 : current - 1;
    handleChange(newIndex);
  };
  const handleNext = () => {
    const newIndex = current === projects.length - 1 ? 0 : current + 1;
    handleChange(newIndex);
  };

  return (
    <section id="projects" className="bg-[url('/images/Container.png')] mt-32 lg:mt-40">
      <div className="min-h-screen scroll-mt-32 lg:mx-50 mx-4 bg-[url('/images/Container.png')]">
        <h2 className="text-3xl lg:text-[50px] font-bold text-center">A small selection of <span className="text-[#CBACF9]">recent projects</span></h2>
        {/* Carousel Projects */}
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 mt-10 lg:mt-20 h-auto lg:h-[700px]">
          {/* Description */}
          <div className={`relative bg-black p-6 lg:p-10 rounded-2xl w-full lg:w-1/2 h-auto lg:h-full transition-opacity duration-400 ${animating ? 'opacity-0' : 'opacity-100'}`}>
            <img src={project.icon} alt="icon 1" className="absolute left-0 top-0" />
            <img src={project.spotlight} alt="spotlight 1" className="absolute right-0 top-0"/>
            <h5 className="mt-25 lg:mt-30 font-bold text-2xl lg:text-3xl">{project.title}</h5>
            <p className="mt-4 lg:mt-5 text-[#E4ECFF]">{project.description1}</p>
            <p className="mt-4 lg:mt-5 text-[#E4ECFF]">{project.description2}</p>
            <div className="mt-8 lg:mt-15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0">
              {/* Used Frameworks/Languages */}
              <div className="flex gap-2">
                {project.icons.map((src, i) => (
                  <img key={i} className='h-10 w-10' src={src} alt="icon" />
                ))}
              </div>
              <div>
                { /*<a href={project.live} className="relative z-10 flex items-center gap-2">
                  Check Live Site
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500 lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                </a> */}
              </div>
            </div>
            {/* Left/Right Arrow */}
            <div className="flex items-center justify-between mt-8 lg:mt-15">
              <button onClick={animating || loading ? undefined : handlePrev} className="focus:outline-none" disabled={animating || loading}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 lg:w-15 lg:h-15 lucide lucide-arrow-left-icon lucide-arrow-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              </button>
              <button onClick={animating || loading ? undefined : handleNext} className="focus:outline-none" disabled={animating || loading}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 lg:w-15 lg:h-15 lucide lucide-arrow-right-icon lucide-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </div>
          </div>
          {/* Demo Project*/}
          <div className={`bg-[#1C1C21] rounded-2xl w-full lg:w-1/2 h-96 lg:h-full flex items-center justify-center transition-opacity duration-400 ${animating ? 'opacity-0' : 'opacity-100'}`} style={{ minHeight: '300px' }}>
            {loading ? (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <div className="animate-spin rounded-full h-12 w-12 lg:h-16 lg:w-16 border-t-4 border-b-4 border-[#CBACF9] mb-6"></div>
                <span className="text-[#CBACF9] text-lg lg:text-xl font-bold">Loading...</span>
              </div>
            ) : (
              project.usePhone ? (
                <div className="flex w-full justify-center items-center">
                  <Phone3D imageUrl={project.image}/>
                </div>
              ) : (
                <Computer3D imageUrl={project.image} />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;