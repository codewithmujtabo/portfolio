const Contacts = () => {
    return (
        <section id="contact" className="bg-[url('/images/Container.png')]">
            <div className="min-h-[80vh] lg:min-h-screen scroll-mt-32 mx-4 lg:mx-50 rounded-3xl border-1 border-gray-500 bg-[url('/images/bg_contact.png')] bg-center">
                <header className="h-12 lg:h-14 flex items-center justify-between px-4 lg:px-6 bg-gradient-to-r from-zinc-900 via-zinc-500 to-zinc-900 rounded-t-3xl relative">
                    {/* Left: Three colored circles */}
                    <div className="flex items-center gap-2 lg:gap-3">
                        <span className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-red-500 shadow-[0_0_8px_2px_rgba(239,68,68,0.5)]" style={{ filter: 'blur(0.5px)' }} />
                        <span className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-yellow-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.5)]" style={{ filter: 'blur(0.5px)' }} />
                        <span className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.5)]" style={{ filter: 'blur(0.5px)' }} />
                    </div>
                    {/* Right: Plus icon */}
                    <div className="flex items-center">
                        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-8 lg:h-8">
                            <path d="M16 8V24" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" />
                            <path d="M8 16H24" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                    </div>
                </header>
                <div className="flex flex-col items-center justify-center py-8 lg:py-16 mx-10 lg:mx-0">
                    <h5 className="text-white text-lg lg:text-xl font-semibold mb-2 w-full max-w-lg text-left">Let's talk</h5>
                    <p className="text-[#E4ECFF] text-sm lg:text-base mb-6 lg:mb-8 w-full max-w-lg text-left">Whether you're looking to build a new website, improve your existing platform, or bring a unique project to life, I'm here to help.</p>
                    <form 
                        action={'https://formsubmit.co/s.mujtabo05@gmail.com'}
                        method="POST"
                        className="w-full max-w-lg flex flex-col gap-4 lg:gap-6"
                        >
                        <input type="hidden" name="_captcha" value="false" />
                        <div>
                            <label htmlFor="name" className="block mb-1 lg:mb-2 text-sm lg:text-base font-medium text-white">Full Name</label>
                            <input type="text" id="name" className="w-full rounded-xl bg-[#23232a] border-none focus:ring-2 focus:ring-[#CBACF9] text-white placeholder:text-slate-400 px-4 lg:px-5 py-3 lg:py-4 text-sm lg:text-base transition-all duration-200" placeholder="ex., John Doe" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1 lg:mb-2 text-sm lg:text-base font-medium text-white">Email address</label>
                            <input type="email" id="email" className="w-full rounded-xl bg-[#23232a] border-none focus:ring-2 focus:ring-[#CBACF9] text-white placeholder:text-slate-400 px-4 lg:px-5 py-3 lg:py-4 text-sm lg:text-base transition-all duration-200" placeholder="ex., johndoe@gmail.com" required />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-1 lg:mb-2 text-sm lg:text-base font-medium text-white">Your message</label>
                            <textarea id="message" rows={5} className="w-full rounded-xl bg-[#23232a] border-none focus:ring-2 focus:ring-[#CBACF9] text-white placeholder:text-slate-400 px-4 lg:px-5 py-3 lg:py-4 text-sm lg:text-base transition-all duration-200 resize-none" placeholder="Share your thoughts or inquiries..." required />
                        </div>
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 text-center px-6 lg:px-10 py-3 lg:py-4 rounded-xl font-bold text-white bg-slate-900/80 border border-slate-700 mt-3 lg:mt-4 transition-all duration-200 hover:bg-slate-800 hover:-translate-y-1 focus:ring-2 focus:ring-[#CBACF9] focus:outline-none"
                        >
                            <span className="text-sm lg:text-base">Send Message</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contacts;