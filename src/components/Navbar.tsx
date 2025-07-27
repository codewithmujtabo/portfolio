"use client"
import { useEffect, useState } from "react";

const Navbar = () => {
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY < 200) {
                setShow(true);
            } else if(window.scrollY > lastScrollY) {
                setShow(false); // scrolling down
            } else {
                setShow(true); // scrolling up
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`fixed top-4 lg:top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} bg-slate-900/80 backdrop-blur-md border border-slate-700 w-full max-w-xs sm:max-w-md md:max-w-lg lg:w-fit px-4 sm:px-8 lg:px-10 py-3 lg:py-4 rounded-xl flex justify-center gap-4 sm:gap-6 lg:gap-8 shadow text-xs sm:text-sm font-semibold mt-7`}>
            <a href="#about" className="cursor-pointer">About</a>
            <a href="#projects" className="cursor-pointer">Projects</a>
            <a href="#testimonials" className="cursor-pointer">Testimonials</a>
            <a href="#contact" className="cursor-pointer">Contact</a>
        </nav>
    );
}

 export default Navbar;