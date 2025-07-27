"use client"

import { useEffect, useRef, useState } from 'react';
import SpaceAnimationBackground from './SpaceAnimationBackground';

const About = () => {
    const [copied, setCopied] = useState(false);

    return (
        <section className="bg-[url('/images/Container.png')]">
            <div id="about" className="scroll-mt-32 lg:mx-30 mx-4 min-h-screen bg-[url('/images/Container.png')]">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
                    {/* About 1 */}
                    <div className="lg:col-span-3 bg-[url('/images/about_1.png')] bg-no-repeat bg-center bg-cover rounded-3xl p-6 lg:p-10 flex flex-col justify-end items-start h-72 lg:h-[550px] border border-slate-700">
                        <p className="font-bold text-2xl lg:text-3xl w-full lg:w-100">I prioritize client collaboration, fostering open communication</p>
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-4 lg:gap-6 mt-4 lg:mt-0">
                        {/* About 2 - With Space Animation Background */}
                        <div className="relative bg-[#04071D] rounded-3xl p-6 lg:p-10 flex-1 border border-slate-700 overflow-hidden">
                            <SpaceAnimationBackground />
                            <div className="relative z-10">
                                <p className="font-bold text-2xl lg:text-3xl text-white">I'm very flexible with time zone communications</p>
                            </div>
                        </div>

                        {/* About 3 */}
                        <div className="relative bg-[#04071D] rounded-3xl px-6 py-16 lg:p-10 flex-1 flex flex-col justify-center items-start border border-slate-700 overflow-hidden mt-4 lg:mt-0">
                            <div>
                                <p className="text-[#E4ECFF] text-base lg:text-lg w-full lg:w-40">I constantly try to improve</p>
                                <p className="font-bold text-2xl lg:text-3xl">My tech stack</p>
                            </div>
                            <div>
                                <span className="absolute w-22 lg:w-30 -top-0 right-22 lg:right-30 bg-[#181C2A] rounded-xl px-0 py-2 lg:py-3 text-white text-sm lg:text-lg text-center">Java</span>
                                <span className="absolute w-22 lg:w-30 top-16 lg:top-22 right-22 lg:right-30 bg-[#181C2A] rounded-xl px-0 py-2 lg:py-3 text-white text-sm lg:text-lg text-center">ReactJS</span>
                                <span className="absolute w-22 lg:w-30 top-32 lg:top-46 right-22 lg:right-30 bg-[#181C2A] rounded-xl px-0 py-2 lg:py-3 text-white text-sm lg:text-lg text-center">Spring</span>
                                <span className="absolute w-22 lg:w-30 top-8 lg:top-12 -right-1 bg-[#181C2A] rounded-xl px-0 py-2 lg:py-3 text-white text-sm lg:text-lg text-center">Springboot</span>
                                <span className="absolute w-22 lg:w-30 top-24 lg:top-36 -right-1 bg-[#181C2A] rounded-xl px-0 py-2 lg:py-3 text-white text-sm lg:text-lg text-center">GraphSQL</span>
                                <span className="absolute w-22 lg:w-30 top-42 lg:top-60 -right-1 bg-[#181C2A] rounded-xl px-0 py-2 lg:py-3 text-white text-sm lg:text-lg text-center">C++</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 mt-8 lg:mt-10">
                    <div className="lg:col-span-2 flex flex-col gap-4 lg:gap-6">
                        {/* About 4 */}
                        <div className="relative bg-[#04071D] rounded-3xl p-8 lg:p-12 flex-1 flex flex-col justify-center items-start border border-slate-700 overflow-hidden">
                            <p className="font-bold text-2xl lg:text-3xl w-full lg:w-110">Tech enthusiast with a passion for development.</p>
                            <span className="absolute bottom-0 h-24 lg:h-100 bottom-0">
                                <img src="/images/Container.png" alt="Container" className="w-full" />
                            </span>
                            <span className="absolute right-2 bottom-0">
                                <img src="/images/about_4.png" alt="about 2" />
                            </span>
                        </div>

                        {/* About 5 */}
                        <div className="bg-animated-gradient bg-gradient-size animate-gradient-x rounded-3xl p-4 lg:p-6 flex-1 flex flex-col items-center py-8 lg:py-16 border border-slate-700 mt-4 lg:mt-0">
                            <p className="font-bold text-2xl lg:text-3xl text-center w-full lg:w-90">Do you want to start a project together?</p>
                            <button
                                className="relative px-6 lg:px-10 py-3 lg:py-4 rounded-xl font-bold text-white bg-slate-900/80 border border-slate-700 overflow-hidden group mt-6 lg:mt-8"
                                onClick={() => {
                                    navigator.clipboard.writeText('s.mujtabo05@gmail.com');
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 1500);
                                }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {/* Copy icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                    {copied ? 'Copied!' : 'Copy my email address'}
                                </span>
                                {/* Animated gradient border */}
                                <span className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-[#a78bfa] via-[#000000] bg-[length:200%_200%] animate-gradient-border" aria-hidden="true"></span>
                                {/* Overlay to create the border effect */}
                                <span className="absolute inset-0 rounded-xl bg-[#070c1f] group-hover:bg-transparent transition-colors duration-300"></span>
                            </button>
                        </div>
                    </div>
                    
                    {/* About 6 */}
                    <div className="relative lg:col-span-3 bg-[#04071D] flex flex-col justify-center rounded-3xl p-8 lg:p-12 border border-slate-700 h-72 lg:h-[530px] mt-4 lg:mt-0">
                        <p className="text-[#E4ECFF] text-base lg:text-lg w-full lg:w-40">The Inside Scoop</p>
                        <p className="font-bold text-xl lg:text-2xl w-full lg:w-130">I love solving problems and building things through code. Programming isn't just my profession—it's my passion. I enjoy exploring new technologies, and enhancing my skills.</p>
                        <span className="absolute right-0 bottom-0">
                            <img src="/images/about_6.png" alt="about 2" className="w-32 lg:w-120" />
                        </span>
                        <span className="absolute bottom-0 h-24 lg:h-100">
                            <img src="/images/Container.png" alt="Container" className="w-full" />
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;