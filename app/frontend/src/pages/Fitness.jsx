import { motion } from 'framer-motion';
import { Dumbbell, Clock, Flame, ChevronRight, Zap, Target, Users } from 'lucide-react';
import { fitnessWorkouts } from '../data/blogData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const challenges = [
  {
    name: '30-Day Push-Up Challenge',
    desc: 'Go from 10 to 100 push-ups in 30 days. Progressive overload at its simplest.',
    participants: '3,241',
    icon: Zap,
  },
  {
    name: '10K Steps Daily',
    desc: 'Walk 10,000 steps every day for a month. Track it, own it, transform your energy.',
    participants: '5,890',
    icon: Target,
  },
  {
    name: 'Sweat & Save 5K',
    desc: 'Train for and complete a 5K run. Every mile you run, save $5.',
    participants: '1,102',
    icon: Users,
  },
];

const quotes = [
  { text: 'The body achieves what the mind believes.', author: 'Napoleon Hill' },
  {
    text: 'Success usually comes to those who are too busy to be looking for it.',
    author: 'Henry David Thoreau',
  },
  {
    text: "The difference between try and triumph is just a little 'umph'.",
    author: 'Marvin Phillips',
  },
];

export default function Fitness() {
  return (
    <div>
      {/* ── PAGE HERO ── */}
      <section
        data-testid='fitness-hero'
        className='relative py-24 bg-zinc-900 overflow-hidden'
      >
        <div className='absolute inset-0'>
          <img
            src='https://images.unsplash.com/photo-1758966071975-b58c681f05e0?w=1600&q=80'
            alt='Fitness'
            className='w-full h-full object-cover opacity-25'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-zinc-900 to-zinc-900/60' />
        </div>
        <div className='relative max-w-7xl mx-auto px-6 md:px-12'>
          <div className='h-1 w-16 bg-orange-500 mb-6' />
          <span className='text-xs font-bold uppercase tracking-[0.2em] text-orange-500 block mb-3'>
            Fitness
          </span>
          <h1 className='font-display font-black text-5xl sm:text-6xl text-white tracking-tighter leading-none mb-6'>
            Train Harder.<br />
            <span className='text-orange-500'>Live Stronger.</span>
          </h1>
          <p className='text-zinc-300 text-lg max-w-xl leading-relaxed'>
            Expert workout routines, challenging programs, and the motivation to keep going — even on days you don't feel like it.
          </p>
        </div>
      </section>

      {/* ── WORKOUT ROUTINES ── */}
      <section data-testid='workout-routines-section' className='py-24 max-w-7xl mx-auto px-6 md:px-12'>
        <div className='mb-12'>
          <span className='text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 block mb-3'>
            Workout Library
          </span>
          <h2 className='font-display font-bold text-3xl sm:text-4xl text-zinc-900 tracking-tight'>
            Pick your program
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {fitnessWorkouts.map((workout, i) => (
            <motion.div
              key={workout.id}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-40px' }}
              custom={i}
              variants={fadeUp}
              className='neo-card accent-orange overflow-hidden group'
              data-testid={`workout-card-${workout.id}`}
            >
              <div className='p-8'>
                <div className='flex items-start justify-between mb-4'>
                  <div>
                    <div className='flex items-center gap-3 mb-2'>
                      <Dumbbell className='w-5 h-5 text-orange-500' strokeWidth={2} />
                      <span className='text-xs font-bold uppercase tracking-[0.15em] text-orange-500'>
                        {workout.level}
                      </span>
                    </div>
                    <h3 className='font-display font-bold text-xl text-zinc-900'>{workout.title}</h3>
                  </div>
                </div>

                <p className='text-zinc-500 text-sm leading-relaxed mb-6'>{workout.description}</p>

                <div className='flex gap-6 mb-6'>
                  <div className='flex items-center gap-2 text-zinc-500 text-sm'>
                    <Clock className='w-4 h-4' />
                    {workout.duration}
                  </div>
                  <div className='flex items-center gap-2 text-zinc-500 text-sm'>
                    <Flame className='w-4 h-4 text-orange-500' />
                    {workout.calories}
                  </div>
                </div>

                <div className='border-t border-zinc-100 pt-4'>
                  <p className='text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3'>
                    Exercises
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {workout.exercises.slice(0, 3).map((ex) => (
                      <span key={ex} className='bg-zinc-100 text-zinc-700 text-xs px-3 py-1 font-medium'>
                        {ex}
                      </span>
                    ))}
                    {workout.exercises.length > 3 && (
                      <span className='bg-orange-50 text-orange-600 text-xs px-3 py-1 font-medium'>
                        +{workout.exercises.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <button
                  data-testid={`workout-start-btn-${workout.id}`}
                  className='mt-6 flex items-center gap-2 bg-zinc-900 text-white font-bold text-sm px-6 py-3 hover:bg-orange-500 transition-colors duration-300'
                >
                  Start Workout <ChevronRight className='w-4 h-4' />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CHALLENGES ── */}
      <section
        data-testid='fitness-challenges-section'
        className='py-24 bg-zinc-900'
      >
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div className='mb-12'>
            <span className='text-xs font-bold uppercase tracking-[0.2em] text-orange-500 block mb-3'>
              Community Challenges
            </span>
            <h2 className='font-display font-bold text-3xl sm:text-4xl text-white tracking-tight'>
              Join the challenge.
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {challenges.map((challenge, i) => {
              const Icon = challenge.icon;
              return (
                <motion.div
                  key={challenge.name}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  data-testid={`challenge-card-${i}`}
                  className='bg-white/5 border border-white/10 p-8 hover:border-orange-500 hover:bg-white/10 transition-all duration-300 group'
                >
                  <div className='bg-orange-500 w-12 h-12 flex items-center justify-center mb-5'>
                    <Icon className='w-6 h-6 text-white' strokeWidth={2} />
                  </div>
                  <h3 className='font-display font-bold text-lg text-white mb-3'>{challenge.name}</h3>
                  <p className='text-zinc-400 text-sm leading-relaxed mb-5'>{challenge.desc}</p>
                  <div className='flex items-center justify-between'>
                    <span className='text-orange-500 text-xs font-bold'>
                      {challenge.participants} joined
                    </span>
                    <button
                      data-testid={`challenge-join-btn-${i}`}
                      className='text-white border border-white/30 text-xs font-bold px-4 py-2 hover:bg-orange-500 hover:border-orange-500 transition-all duration-200'
                    >
                      Join
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MOTIVATION QUOTES ── */}
      <section data-testid='motivation-section' className='py-24 bg-white border-t border-zinc-200'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <span className='text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 block mb-12 text-center'>
            Motivation
          </span>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {quotes.map((quote, i) => (
              <motion.div
                key={i}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                data-testid={`quote-card-${i}`}
                className='neo-card p-8 border-l-4 border-orange-500'
              >
                <p className='text-zinc-700 text-lg leading-relaxed font-medium mb-6 italic'>
                  '{quote.text}'
                </p>
                <p className='text-zinc-400 text-sm font-bold'>— {quote.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}