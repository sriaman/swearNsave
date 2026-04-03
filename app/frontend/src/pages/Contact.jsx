import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Facebook, Mail, MapPin, Send } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const socials = [
  {
    icon: Instagram,
    label: 'Instagram',
    handle: '@sweatasave',
    href: '#',
    color: 'hover:bg-pink-600',
  },
  {
    icon: Twitter,
    label: 'Twitter / X',
    handle: '@sweatasave',
    href: '#',
    color: 'hover:bg-zinc-800',
  },
  {
    icon: Youtube,
    label: 'YouTube',
    handle: 'Sweat & Save',
    href: '#',
    color: 'hover:bg-red-600',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    handle: 'Sweat & Save',
    href: '#',
    color: 'hover:bg-blue-700',
  },
];

export default function Contact() {
  // Newsletter form
  const [nlEmail, setNlEmail] = useState('');
  const [nlStatus, setNlStatus] = useState(null);
  const [nlLoading, setNlLoading] = useState(false);

  // Contact form
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactStatus, setContactStatus] = useState(null);
  const [contactLoading, setContactLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNlLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email: nlEmail });
      setNlStatus('success');
      setNlEmail('');
    } catch {
      setNlStatus('error');
    } finally {
      setNlLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      await axios.post(`${API}/contact`, contactForm);
      setContactStatus('success');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setContactStatus('error');
    } finally {
      setContactLoading(false);
    }
  };

  const inputClass =
    'w-full bg-zinc-50 border border-zinc-300 text-zinc-900 placeholder:text-zinc-400 px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 transition-colors duration-200 rounded-none';

  return (
    <div>
      {/* ── PAGE HERO ── */}
      <section data-testid='contact-hero' className='py-20 border-b border-zinc-200 bg-white'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <span className='text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 block mb-3'>
            Contact
          </span>
          <h1 className='font-display font-black text-5xl sm:text-6xl text-zinc-900 tracking-tighter leading-none mb-4'>
            Let's connect.
          </h1>
          <p className='text-zinc-500 text-lg max-w-xl leading-relaxed'>
            Questions, feedback, or just want to say hello? We read every message.
          </p>
        </div>
      </section>

      <div className='max-w-7xl mx-auto px-6 md:px-12 py-20'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-12'>
          {/* Left column */}
          <div className='md:col-span-5 flex flex-col gap-10'>
            {/* Newsletter Signup */}
            <motion.div
              initial='hidden'
              animate='visible'
              variants={fadeUp}
              custom={0}
              data-testid='newsletter-signup-section'
              className='bg-zinc-900 p-8'
            >
              <div className='h-1 w-12 bg-orange-500 mb-6' />
              <h2 className='font-display font-bold text-2xl text-white mb-3'>
                Join the newsletter
              </h2>
              <p className='text-zinc-400 text-sm leading-relaxed mb-6'>
                Weekly tips on fitness, finance, and wellness. Every Sunday morning. Free forever.
              </p>

              {nlStatus === 'success' ? (
                <div
                  data-testid='contact-newsletter-success'
                  className='bg-emerald-500/20 border border-emerald-500 p-5 text-center'
                >
                  <p className='text-emerald-400 font-bold'>You're subscribed!</p>
                  <p className='text-zinc-500 text-xs mt-1'>Check your inbox for a welcome email.</p>
                </div>
              ) : (
                <form
                  data-testid='contact-newsletter-form'
                  onSubmit={handleNewsletterSubmit}
                  className='flex flex-col gap-3'
                >
                  <input
                    type='email'
                    value={nlEmail}
                    onChange={(e) => setNlEmail(e.target.value)}
                    placeholder='your@email.com'
                    required
                    data-testid='contact-newsletter-email-input'
                    className='bg-white/10 border border-white/20 text-white placeholder:text-zinc-500 px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors duration-200'
                  />
                  <button
                    type='submit'
                    disabled={nlLoading}
                    data-testid='contact-newsletter-submit-btn'
                    className='bg-orange-500 text-white font-bold px-6 py-3 hover:bg-orange-600 transition-colors duration-300 text-sm disabled:opacity-60 flex items-center justify-center gap-2'
                  >
                    <Send className='w-4 h-4' />
                    {nlLoading ? 'Subscribing...' : 'Subscribe Free'}
                  </button>
                </form>
              )}
              {nlStatus === 'error' && (
                <p
                  data-testid='contact-newsletter-error'
                  className='text-red-400 text-xs mt-2'
                >
                  Something went wrong. Try again.
                </p>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial='hidden'
              animate='visible'
              variants={fadeUp}
              custom={1}
              data-testid='social-links-section'
            >
              <h3 className='font-display font-bold text-xl text-zinc-900 mb-5'>
                Find us on social
              </h3>
              <div className='flex flex-col gap-3'>
                {socials.map(({ icon: Icon, label, handle, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    data-testid={`social-link-${label.toLowerCase().replace(/\s|\//g, '-')}`}
                    className={`flex items-center gap-4 p-4 border border-zinc-200 hover:border-zinc-900 bg-white hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)] transition-all duration-200 group`}
                  >
                    <div className={`w-10 h-10 bg-zinc-100 group-hover:bg-zinc-900 ${color} flex items-center justify-center transition-all duration-200`}>
                      <Icon className='w-5 h-5 text-zinc-600 group-hover:text-white transition-colors duration-200' />
                    </div>
                    <div>
                      <div className='text-zinc-900 font-bold text-sm'>{label}</div>
                      <div className='text-zinc-400 text-xs'>{handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial='hidden'
              animate='visible'
              variants={fadeUp}
              custom={2}
              className='flex flex-col gap-4'
            >
              <div className='flex items-center gap-3 text-zinc-600 text-sm'>
                <Mail className='w-4 h-4 text-orange-500' />
                hello@sweatasave.com
              </div>
              <div className='flex items-center gap-3 text-zinc-600 text-sm'>
                <MapPin className='w-4 h-4 text-orange-500' />
                The internet — everywhere you sweat and save.
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial='hidden'
            animate='visible'
            variants={fadeUp}
            custom={1}
            className='md:col-span-7'
          >
            <div className='bg-white border border-zinc-200 p-8 md:p-10'>
              <div className='h-1 w-12 bg-emerald-500 mb-6' />
              <h2 className='font-display font-bold text-2xl text-zinc-900 mb-6'>
                Send us a message
              </h2>

              {contactStatus === 'success' ? (
                <div
                  data-testid='contact-form-success'
                  className='bg-emerald-50 border border-emerald-300 p-8 text-center'
                >
                  <div className='font-display font-bold text-xl text-emerald-700 mb-2'>Message sent!</div>
                  <p className='text-zinc-500 text-sm'>
                    We'll get back to you within 24-48 hours. Thanks for reaching out!
                  </p>
                  <button
                    onClick={() => setContactStatus(null)}
                    className='mt-4 text-sm font-bold text-emerald-600 hover:text-emerald-800'
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  data-testid='contact-form'
                  onSubmit={handleContactSubmit}
                  className='flex flex-col gap-4'
                >
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label className='text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2'>
                        Your Name *
                      </label>
                      <input
                        type='text'
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, name: e.target.value })
                        }
                        placeholder='Jane Doe'
                        required
                        data-testid='contact-form-name'
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className='text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2'>
                        Email Address *
                      </label>
                      <input
                        type='email'
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, email: e.target.value })
                        }
                        placeholder='jane@email.com'
                        required
                        data-testid='contact-form-email'
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className='text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2'>
                      Subject *
                    </label>
                    <input
                      type='text'
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, subject: e.target.value })
                      }
                      placeholder="What's on your mind?"
                      required
                      data-testid='contact-form-subject'
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className='text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2'>
                      Message *
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, message: e.target.value })
                      }
                      placeholder="Tell us what's on your mind..."
                      required
                      rows={6}
                      data-testid='contact-form-message'
                      className={inputClass + ' resize-none'}
                    />
                  </div>

                  <button
                    type='submit'
                    disabled={contactLoading}
                    data-testid='contact-form-submit-btn'
                    className='bg-zinc-900 text-white font-bold px-8 py-4 hover:bg-orange-500 transition-colors duration-300 text-sm flex items-center justify-center gap-2 disabled:opacity-60'
                  >
                    <Send className='w-4 h-4' />
                    {contactLoading ? 'Sending...' : 'Send Message'}
                  </button>

                  {contactStatus === 'error' && (
                    <p
                      data-testid='contact-form-error'
                      className='text-red-500 text-sm text-center'
                    >
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}