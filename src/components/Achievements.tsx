'use client'

const achievements = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#a78bfa"/><path d="M16 36V20M16 20L24 12L32 20M16 20H32M32 36V20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    title: 'Full Stack Developer Intern - Tryidol Technologies',
    desc: 'Build a CRM Application for vehicle rental services, streamlining processes for efficient bill generation and client management.'
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#818cf8"/><path d="M24 32V16M24 16L32 24M24 16L16 24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    title: 'Full Stack Developer Intern - Droit',
    desc: 'Engineered consultancy software using Curable to optimize online consultations and enhance digital healthcare services.'
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#fbbf24"/><path d="M24 16V32M24 32L32 24M24 32L16 24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    title: 'Hackhazards Hackathon Winner',
    desc: 'Secured 1st place out of 150 participants in a hackathon by employing a combination of hardware and software solutions.'
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#34d399"/><path d="M16 32L24 16L32 32" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    title: 'Shiksha Arpan Web Development Challenge',
    desc: 'Designed & Developed the UI for the Enhanced Tutor Matching Algorithm feature, ensuring ease of use and clarity in presenting tutor recommendations to users.'
  },
];

const Achievements = () => {
  return (
    <section className="bg-[url('/images/Container.png')] py-12 lg:py-24">
      <style jsx global>{`
        @property --border-angle {
          inherits: false;
          initial-value: 0deg;
          syntax: '<angle>';
        }
        @keyframes border {
          to { --border-angle: 360deg; }
        }
        .animated-border {
          background: linear-gradient(45deg, #172033, #1e293b 50%, #172033) padding-box,
            conic-gradient(from var(--border-angle), #3341557a 80%, #818cf8 86%, #a5b4fc 90%, #818cf8 94%, #3341557a) border-box;
          border-radius: 1rem;
          border: 2px solid transparent;
          animation: border 4s linear infinite;
        }
      `}</style>
      <div className="min-h-screen scroll-mt-32 mx-4 lg:mx-50 bg-[url('/images/Container.png')]">
        <h2 className="text-2xl lg:text-[50px] font-bold text-center mb-8 lg:mb-16">My <span className="text-[#CBACF9]">Achievements</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {achievements.map((a, i) => (
            <div
              key={i}
              className="w-full max-w-full lg:max-w-[600px] animated-border mx-auto"
            >
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 p-4 lg:p-8">
                <div className="flex-shrink-0">{a.icon}</div>
                <div>
                  <h5 className="text-white text-lg lg:text-xl font-bold mb-1 lg:mb-2">{a.title}</h5>
                  <p className="text-[#E4ECFF] text-sm lg:text-base font-medium">{a.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;