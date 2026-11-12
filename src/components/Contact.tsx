'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { profile } from '@/lib/data';
import { ArrowIcon, FadeUp, Magnetic, SectionLabel, SplitReveal } from './ui/motion';

type Status = 'idle' | 'sending' | 'sent' | 'error';

function Field({ id, label, type = 'text', textarea, autoComplete }: { id: string; label: string; type?: string; textarea?: boolean; autoComplete?: string }) {
  const cls =
    'peer w-full rounded-2xl border border-line bg-ink/60 px-5 pb-3 pt-7 text-bone outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-transparent focus:border-crimson focus:shadow-[0_0_0_4px_rgba(139,37,59,0.25)]';
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} name={id} rows={5} required placeholder={label} className={`${cls} resize-none`} />
      ) : (
        <input id={id} name={id} type={type} required placeholder={label} autoComplete={autoComplete} className={cls} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-5 top-5 origin-left text-mute transition-all duration-300 peer-focus:top-2.5 peer-focus:scale-75 peer-focus:text-rose peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:scale-75"
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _captcha: 'false', _subject: 'New message from your portfolio' }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-6">
          <SectionLabel index="04">Contact</SectionLabel>
          <h2 className="mt-6 font-display text-5xl font-bold leading-[0.98] tracking-tight md:text-7xl">
            <SplitReveal text="Let's talk." wordClassName={(w) => (w === 'talk.' ? 'text-rose' : '')} />
          </h2>
          <FadeUp delay={0.15}>
            <p className="mt-6 max-w-md leading-relaxed text-mute">
              Whether you&apos;re looking to build a new website, improve your existing platform, or bring a unique project to
              life, I&apos;m here to help.
            </p>
          </FadeUp>

          <FadeUp delay={0.25} className="mt-12 space-y-px overflow-hidden rounded-3xl border border-line">
            {[
              { k: 'Email', v: profile.email, href: `mailto:${profile.email}` },
              { k: 'WhatsApp', v: 'Message me directly', href: profile.whatsapp },
              ...profile.socials.map((s) => ({ k: s.label, v: s.href.replace(/^https:\/\/(www\.)?/, '').split('?')[0], href: s.href })),
            ].map((row) => (
              <a
                key={row.k}
                href={row.href}
                target={row.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 bg-ink-2/70 px-6 py-5 transition-colors hover:bg-crimson"
              >
                <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-mute group-hover:text-bone/80">{row.k}</span>
                <span className="min-w-0 flex-1 truncate text-sm md:text-base">{row.v}</span>
                <ArrowIcon className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
              </a>
            ))}
          </FadeUp>
        </div>

        <FadeUp delay={0.1} className="min-w-0 lg:col-span-6">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-2/80 backdrop-blur">
            {/* terminal-style header */}
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-crimson" />
                <span className="h-3 w-3 rounded-full bg-bone/20" />
                <span className="h-3 w-3 rounded-full bg-bone/10" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">~/new-message</span>
            </div>

            <form onSubmit={onSubmit} className="relative space-y-4 p-6 md:p-8">
              <Field id="name" label="Full name" autoComplete="name" />
              <Field id="email" label="Email address" type="email" autoComplete="email" />
              <Field id="message" label="Tell me about your project" textarea />

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute" aria-live="polite">
                  {status === 'sending' && 'Transmitting…'}
                  {status === 'error' && <span className="text-rose">Couldn&apos;t send. Email me directly.</span>}
                  {status === 'idle' && 'Usually replies within 24h'}
                </p>
                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-crimson px-7 py-4 font-semibold disabled:opacity-60"
                  >
                    <span className="absolute inset-0 translate-y-full bg-rose transition-transform duration-500 group-hover:translate-y-0" />
                    <span className="relative">{status === 'sending' ? 'Sending' : 'Send message'}</span>
                    <ArrowIcon className="relative h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                  </button>
                </Magnetic>
              </div>

              <AnimatePresence>
                {status === 'sent' && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink-2 p-8 text-center"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.span
                      className="grid h-16 w-16 place-items-center rounded-full bg-crimson"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.1 }}
                    >
                      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </motion.span>
                    <p className="font-display text-2xl font-semibold">Message received.</p>
                    <p className="text-mute">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                    <button type="button" onClick={() => setStatus('idle')} className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-rose">
                      Send another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
