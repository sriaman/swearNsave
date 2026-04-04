import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Dumbbell, TrendingUp, Heart, ChevronRight, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const featuredSections = [
  {
    label: 'Fitness',
    path: '/fitness',
    color: 'orange',
    borderColor: 'border-orange-500',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-500',
    icon: Dumbbell,
    headline: 'Train Like a Champion',
    desc: 'Workout plans, HIIT routines, and fitness challenges designed to push your limits — no gym required.',
    image: 'https://images.unsplash.com/photo-1758966071975-b58c681f05e0?w=600&q=80',
  },
  {
    label: 'Finance',
    path: '/finance',
    color: 'emerald',
    borderColor: 'border-emerald-500',
    bgColor: 'bg-emerald-500',
    textColor: 'text-emerald-500',
    icon: TrendingUp,
    headline: 'Build Your Wealth',
    desc: 'Budgeting hacks, saving strategies, and beginner investing guides to grow your money systematically.',
    image: 'https://images.pexels.com/photos/259091/pexels-photo-259091.jpeg?w=600&q=80',
  },
  {
    label: 'Wellness',
    path: '/wellness',
    color: 'blue',
    borderColor: 'border-blue-600',
    bgColor: 'bg-blue-600',
    textColor: 'text-blue-600',
    icon: Heart,
    headline: 'Nourish Your Body',
    desc: 'Nutrition advice, healthy recipes, and mental health strategies to optimize your daily performance.',
    image: 'https://images.unsplash.com/photo-1770761070158-33f939b42799?w=600&q=80',
  },
];

const latestPosts = [
  {
    title: 'How Fitness Discipline Helps You Save Money',
    path: '/blog',
    category: 'Finance & Fitness',
    date: 'Jan 15, 2026',
  },
  {
    title: 'The 50/30/20 Budget Rule: A Runner\'s Approach',
    path: '/blog',
    category: 'Finance',
    date: 'Jan 22, 2026',
  },
  {
    title: 'Meal Prep: Good for Your Body AND Your Wallet',
    path: '/blog',
    category: 'Wellness & Finance',
    date: 'Feb 1, 2026',
  },
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, openAuthModal } = useAuth();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleProtectedLink = (e, path) => {
    if (!isAuthenticated && (path === '/fitness' || path === '/finance' || path === '/wellness')) {
      e.preventDefault();
      openAuthModal('login');
    }
  };

  return (
    <div>
      {/* ── HERO ── */}
      <section
        data-testid='hero-section'
        className='relative min-h-[90vh] flex items-center overflow-hidden bg-zinc-900'
      >
        {/* Background Image */}
        <div className='absolute inset-0'>
          <img
            src='https://images.pexels.com/photos/36717053/pexels-photo-36717053.jpeg?w=1600&q=80'
            alt='Runner at sunrise'
            className='w-full h-full object-cover opacity-30'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/85 to-zinc-900/40' />
        </div>

        {/* Content */}
        <div className='relative max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full'>
          <div className='md:col-span-8'>
            <motion.div
              initial='hidden'
              animate='visible'
              custom={0}
              variants={fadeUp}
            >
              <span className='text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-4 block'>
                Where Fitness Meets Finance
              </span>
            </motion.div>

            <motion.h1
              initial='hidden'
              animate='visible'
              custom={1}
              variants={fadeUp}
              className='font-display font-black text-white text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-none mb-6'
            >
              Build Strength.<br />
              <span className='text-orange-500'>Build Wealth.</span>
            </motion.h1>

            <motion.p
              initial='hidden'
              animate='visible'
              custom={2}
              variants={fadeUp}
              className='text-zinc-300 text-lg leading-relaxed max-w-xl mb-8'
            >
              The only community that helps you crush your fitness goals and your financial ones — at the same time.
            </motion.p>

            <motion.div
              initial='hidden'
              animate='visible'
              custom={3}
              variants={fadeUp}
              className='flex flex-col sm:flex-row gap-4'
            >
              <Link
                to='/contact'
                data-testid='hero-cta-btn'
                className='inline-flex items-center gap-2 bg-orange-500 text-white font-bold px-8 py-4 hover:bg-orange-600 transition-colors duration-300 text-base'
              >
                Join the Community <ArrowRight className='w-5 h-5' />
              </Link>
              <Link
                to='/blog'
                data-testid='hero-blog-btn'
                className='inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-8 py-4 hover:bg-white/20 transition-colors duration-300 text-base'
              >
                Read Our Blog
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial='hidden'
            animate='visible'
            custom={4}
            variants={fadeUp}
            className='md:col-span-4 grid grid-cols-2 gap-4'
          >
            {[
              { val: '10K+', label: 'Community Members' },
              { val: '200+', label: 'Articles Published' },
              { val: '$0', label: 'Cost to Join' },
              { val: '5 min', label: 'Avg. Read Time' },
            ].map((stat) => (
              <div
                key={stat.label}
                className='bg-white/10 border border-white/20 p-5 backdrop-blur-sm'
              >
                <div className='font-display font-black text-2xl text-orange-500'>
                  {stat.val}
                </div>
                <div className='text-zinc-400 text-xs mt-1'>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2'>
          <span className='text-zinc-500 text-xs tracking-widest uppercase'>Scroll</span>
          <div className='w-px h-8 bg-gradient-to-b from-zinc-500 to-transparent animate-pulse' />
        </div>
      </section>

      {/* ── TICKER STRIP ── */}
      <div className='bg-orange-500 py-3 overflow-hidden'>
        <div className='flex gap-12 animate-marquee whitespace-nowrap'>
          {Array(4).fill(['Build Strength', 'Build Wealth', 'Eat Clean', 'Invest Smart', 'Train Hard', 'Save More']).flat().map((item, i) => (
            <span key={i} className='text-white font-bold text-sm uppercase tracking-widest'>
              {item} &nbsp;&nbsp;—
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURED SECTIONS ── */}
      <section data-testid='featured-sections' className='py-24 max-w-7xl mx-auto px-6 md:px-12'>
        <div className='mb-12'>
          <span className='text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 block mb-3'>
            What We Cover
          </span>
          <h2 className='font-display font-bold text-3xl sm:text-4xl text-zinc-900 tracking-tight'>
            Three pillars. One lifestyle.
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {featuredSections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.label}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: '-50px' }}
                custom={i}
                variants={fadeUp}
              >
                <Link
                  to={section.path}
                  onClick={(e) => handleProtectedLink(e, section.path)}
                  data-testid={`home-section-${section.label.toLowerCase()}`}
                  className='block neo-card group overflow-hidden relative'
                >
                  {!isAuthenticated && (section.path === '/fitness' || section.path === '/finance' || section.path === '/wellness') && (
                    <div className='absolute top-2 right-2 z-10 bg-zinc-900/80 backdrop-blur-sm p-2 rounded-full'>
                      <Lock className='w-4 h-4 text-white' />
                    </div>
                  )}
                  <div className={`h-1 ${section.bgColor} w-full`} />
                  <div className='relative h-48 overflow-hidden'>
                    <img
                      src={section.image}
                      alt={section.label}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                    />
                    <div className='absolute inset-0 bg-zinc-900/40' />
                    <div className={`absolute top-4 left-4 ${section.bgColor} p-2`}>
                      <Icon className='w-5 h-5 text-white' strokeWidth={2} />
                    </div>
                  </div>
                  <div className='p-6'>
                    <span className={`text-xs font-bold uppercase tracking-[0.2em] ${section.textColor}`}>
                      {section.label}
                    </span>
                    <h3 className='font-display font-bold text-xl text-zinc-900 mt-2 mb-2'>
                      {section.headline}
                    </h3>
                    <p className='text-zinc-500 text-sm leading-relaxed'>{section.desc}</p>
                    <div className={`mt-4 flex items-center gap-1 ${section.textColor} text-sm font-bold group-hover:gap-2 transition-all duration-300`}>
                      {!isAuthenticated && (section.path === '/fitness' || section.path === '/finance' || section.path === '/wellness') ? 'Sign up to access' : 'Explore'} <ChevronRight className='w-4 h-4' />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── LATEST BLOG ── */}
      <section data-testid='latest-blog-section' className='py-20 bg-white border-t border-b border-zinc-200'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div className='flex items-end justify-between mb-10'>
            <div>
              <span className='text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 block mb-3'>
                Latest Articles
              </span>
              <h2 className='font-display font-bold text-3xl sm:text-4xl text-zinc-900 tracking-tight'>
                From the blog
              </h2>
            </div>
            <Link
              to='/blog'
              data-testid='home-view-all-blog'
              className='hidden sm:flex items-center gap-2 text-sm font-bold text-zinc-900 hover:text-orange-500 transition-colors duration-200'
            >
              View all <ArrowRight className='w-4 h-4' />
            </Link>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {latestPosts.map((post, i) => (
              <motion.div
                key={post.title}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <Link
                  to={post.path}
                  data-testid={`home-blog-post-${i}`}
                  className='block neo-card p-6 border-t-4 border-orange-500 group'
                >
                  <span className='text-xs font-bold uppercase tracking-[0.15em] text-orange-500'>
                    {post.category}
                  </span>
                  <h3 className='font-display font-bold text-lg text-zinc-900 mt-2 mb-3 group-hover:text-orange-500 transition-colors duration-200'>
                    {post.title}
                  </h3>
                  <p className='text-zinc-400 text-xs'>{post.date}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section data-testid='newsletter-section' className='py-24 bg-zinc-900'>
        <div className='max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          <div>
            <span className='text-xs font-bold uppercase tracking-[0.2em] text-orange-500 block mb-4'>
              Join the Community
            </span>
            <h2 className='font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4'>
              Weekly insights on fitness & finance.
            </h2>
            <p className='text-zinc-400 leading-relaxed'>
              No spam. No BS. Just actionable tips delivered every Sunday morning to help you start the week stronger — financially and physically.
            </p>
          </div>

          <div>
            {status === 'success' ? (
              <div
                data-testid='newsletter-success'
                className='bg-emerald-500/20 border border-emerald-500 p-6 text-center'
              >
                <div className='font-display font-bold text-xl text-emerald-400 mb-2'>You're in!</div>
                <p className='text-zinc-400 text-sm'>
                  Check your inbox for a welcome email. Let's get to work.
                </p>
              </div>
            ) : (
              <form
                data-testid='home-newsletter-form'
                onSubmit={handleNewsletterSubmit}
                className='flex flex-col sm:flex-row gap-0'
              >
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email address'
                  required
                  data-testid='home-newsletter-email-input'
                  className='flex-1 bg-white/10 border border-white/20 text-white placeholder:text-zinc-500 px-5 py-4 text-sm focus:outline-none focus:border-orange-500 transition-colors duration-200'
                />
                <button
                  type='submit'
                  disabled={loading}
                  data-testid='home-newsletter-submit-btn'
                  className='bg-orange-500 text-white font-bold px-8 py-4 hover:bg-orange-600 transition-colors duration-300 text-sm whitespace-nowrap disabled:opacity-60'
                >
                  {loading ? 'Subscribing...' : 'Subscribe Free'}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p
                data-testid='newsletter-error'
                className='text-red-400 text-sm mt-3'
              >
                Something went wrong. Please try again.
              </p>
            )}
            <p className='text-zinc-600 text-xs mt-3'>
              Join 10,000+ subscribers. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}