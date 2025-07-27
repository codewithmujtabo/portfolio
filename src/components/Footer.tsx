const Footer = () => {
    return (
        <section className="bg-[url('/images/Container.png')]">
            <div className="mx-4 lg:mx-30 mt-20 lg:mt-40 mb-10 lg:mb-20 flex flex-col items-center">
                <h2 className="text-2xl lg:text-[50px]/12 font-bold text-center w-full lg:w-200">Ready to take <span className="text-[#CBACF9]">your</span> digital presence to the next level?</h2>
                <p className="text-center mt-6 lg:mt-10 font-semibold">Reach out to me today and let's discuss how I can help you achieve your goals.</p>
                <a
                    href="https://wa.me/6282218865809"  // 👈 replace with your number
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 lg:mt-20 flex items-center justify-center gap-2 text-center px-6 lg:px-10 py-3 lg:py-4 rounded-xl font-bold text-white bg-slate-900/80 border border-slate-700 transition-all duration-200 hover:bg-slate-800 hover:-translate-y-1 focus:ring-2 focus:ring-[#CBACF9] focus:outline-none"
                >
                    <span className="text-base">Let's get in touch</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                </a>
                <div className="w-full max-w-full lg:max-w-7xl mx-auto mt-10 lg:mt-20 flex flex-col lg:flex-row justify-between items-center px-2 lg:px-4 gap-4 lg:gap-0">
                    <div className="font-semibold text-xs lg:text-base text-center lg:text-left">Copyright  ©  2025 Mujtabo Saidamirzoda</div>
                    <div className="flex gap-2 lg:gap-3">
                        <a href="https://github.com/codewithmujtabo" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/mujtabo-saidamirzoda-393b13258/" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                        </a>
                        <a href="https://www.instagram.com/mujtabosaidaliev?igsh=M2wyZ2s5c2VudXdv&utm_source=qr" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;