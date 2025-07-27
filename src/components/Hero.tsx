const Hero = () => {
    return (
        <section className="bg-[url('/images/Container.png')]">
            <div className="min-h-screen lg:mx-60 mx-4 flex flex-col justify-center items-center bg-[url('/images/Container.png')]">
                <p className="text-sm tracking-wide text-[#E4ECFF] uppercase">Dynamic Web Magic with Next.js</p>
                <h1 className="text-4xl lg:text-[60px] font-bold text-center mt-8 lg:mt-10">Transforming Concepts into Seamless <span className="text-[#CBACF9]">User Experiences</span></h1>
                <p className="text-base lg:text-xl font-normal mt-4 lg:mt-5 text-center">Hi! I'm Mujtabo, a Developer based in Bandung, Indonesia.</p>
                <button className="relative px-6 lg:px-10 py-3 lg:py-4 rounded-xl font-bold text-white bg-slate-900/80 border border-slate-700 overflow-hidden group mt-10 lg:mt-15">
                    <a href="#about" className="relative z-10 flex items-center gap-2 text-sm">
                        Show my work
                        {/* Simple arrow icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                    </a>
                    {/* Animated gradient border */}
                    <span className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-[#a78bfa] via-[#000000] bg-[length:200%_200%] animate-gradient-border" aria-hidden="true"></span>
                    {/* Overlay to create the border effect */}
                    <span className="absolute inset-0 rounded-xl bg-[#070c1f] group-hover:bg-transparent transition-colors duration-300"></span>
                </button>
            </div>
        </section>
    );
}

export default Hero;