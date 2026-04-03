import { motion } from 'framer-motion';
import { Heart, Droplets, Moon, Wind, Apple, Sunset } from 'lucide-react';
import { wellnessTips } from '../data/blogData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const iconMap = {
  utensils: Heart,
  droplets: Droplets,
  moon: Moon,
  wind: Wind,
  apple: Apple,
  sunset: Sunset,
};

const recipes = [
  {
    name: 'High-Protein Overnight Oats',
    tags: ['Breakfast', 'Prep: 5 min'],
    macros: { protein: '32g', carbs: '58g', fat: '12g', calories: '480' },
    ingredients: ['1 cup rolled oats', '1 scoop vanilla protein powder', '1 cup almond milk', '1 tbsp chia seeds', '1/2 banana sliced', '1 tbsp peanut butter'],
    color: 'blue',
  },
  {
    name: 'Sheet Pan Chicken & Veggies',
    tags: ['Dinner', 'Prep: 10 min'],
    macros: { protein: '45g', carbs: '28g', fat: '14g', calories: '420' },
    ingredients: ['4 chicken thighs', '2 cups broccoli', '1 bell pepper', '1 tbsp olive oil', 'Garlic powder, paprika, salt', '1 cup brown rice (side)'],
    color: 'blue',
  },
  {
    name: 'Green Power Smoothie',
    tags: ['Post-Workout', 'Prep: 3 min'],
    macros: { protein: '22g', carbs: '35g', fat: '6g', calories: '280' },
    ingredients: ['2 cups spinach', '1 banana', '1 scoop protein powder', '1 cup coconut water', '1/2 avocado', 'Ice cubes'],
    color: 'blue',
  },
];

const mentalHealthTips = [
  {
    title: 'Morning Journaling',
    desc: "Write 3 things you're grateful for and 1 intention for the day. Takes 5 minutes. Rewires your brain toward positivity over 30 days.",
  },
  {
    title: 'The 2-Minute Rule',
    desc: 'If it takes less than 2 minutes, do it now. This reduces mental clutter, decision fatigue, and the anxiety of mounting tasks.',
  },
  {
    title: 'Weekly Review',
    desc: "Every Sunday, review last week's wins/losses in fitness and finance. Plan next week's actions. Stay ahead of your goals.",
  },
  {
    title: "Social Media Detox",
    desc: "Designate one full day per week as screen-free. Replace scrolling with reading, walking, cooking, or connecting in person."
  }
];

export default function Wellness() {
  return (
    <div>
      {/* ── PAGE HERO ── */}
      <section
        data-testid='wellness-hero'
        className='relative py-24 bg-zinc-900 overflow-hidden'
      >
        <div className='absolute inset-0'>
          <img
            src='https://images.unsplash.com/photo-1770761070158-33f939b42799?w=1600&q=80'
            alt='Wellness'
            className='w-full h-full object-cover opacity-25'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-zinc-900 to-zinc-900/60' />
        </div>
        <div className='relative max-w-7xl mx-auto px-6 md:px-12'>
          <div className='h-1 w-16 bg-blue-600 mb-6' />
          <span className='text-xs font-bold uppercase tracking-[0.2em] text-blue-400 block mb-3'>
            Health & Wellness
          </span>
          <h1 className='font-display font-black text-5xl sm:text-6xl text-white tracking-tighter leading-none mb-6'>
            Nourish Your Body.<br />
            <span className='text-blue-400'>Sharpen Your Mind.</span>
          </h1>
          <p className='text-zinc-300 text-lg max-w-xl leading-relaxed'>
            Evidence-based nutrition advice, simple healthy recipes, and mental health strategies for peak daily performance.
          </p>
        </div>
      </section>

      {/* ── WELLNESS TIPS GRID ── */}
      <section data-testid='wellness-tips-section' className='py-24 max-w-7xl mx-auto px-6 md:px-12'>
        <div className='mb-12'>
          <span className='text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 block mb-3'>
            Daily Habits
          </span>
          <h2 className='font-display font-bold text-3xl sm:text-4xl text-zinc-900 tracking-tight'>
            Science-backed wellness tips
          </h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {wellnessTips.map((tip, i) => {
            const Icon = iconMap[tip.icon] || Heart;
            return (
              <motion.div
                key={tip.id}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: '-40px' }}
                custom={i}
                variants={fadeUp}
                data-testid={`wellness-tip-card-${tip.id}`}
                className='neo-card accent-blue p-8'
              >
                <div className='bg-blue-50 w-10 h-10 flex items-center justify-center mb-4'>
                  <Icon className='w-5 h-5 text-blue-600' strokeWidth={2} />
                </div>
                <span className='text-xs font-bold uppercase tracking-[0.15em] text-blue-600 block mb-2'>
                  {tip.category}
                </span>
                <h3 className='font-display font-bold text-lg text-zinc-900 mb-3'>{tip.title}</h3>
                <p className='text-zinc-500 text-sm leading-relaxed'>{tip.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── HEALTHY RECIPES ── */}
      <section
        data-testid='recipes-section'
        className='py-24 bg-white border-t border-zinc-200'
      >
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div className='mb-12'>
            <span className='text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 block mb-3'>
              Healthy Recipes
            </span>
            <h2 className='font-display font-bold text-3xl sm:text-4xl text-zinc-900 tracking-tight'>
              Fuel your performance
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {recipes.map((recipe, i) => (
              <motion.div
                key={recipe.name}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                data-testid={`recipe-card-${i}`}
                className='neo-card accent-blue overflow-hidden'
              >
                <div className='p-6'>
                  <div className='flex gap-2 mb-4'>
                    {recipe.tags.map((tag) => (
                      <span key={tag} className='bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1'>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className='font-display font-bold text-xl text-zinc-900 mb-4'>{recipe.name}</h3>

                  {/* Macros */}
                  <div className='grid grid-cols-4 gap-2 mb-5'>
                    {Object.entries(recipe.macros).map(([key, val]) => (
                      <div key={key} className='text-center bg-zinc-50 py-2'>
                        <div className='text-zinc-900 font-black text-sm font-display'>{val}</div>
                        <div className='text-zinc-400 text-xs capitalize'>{key}</div>
                      </div>
                    ))}
                  </div>

                  <div className='border-t border-zinc-100 pt-4'>
                    <p className='text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3'>
                      Ingredients
                    </p>
                    <ul className='flex flex-col gap-1'>
                      {recipe.ingredients.map((ing) => (
                        <li key={ing} className='text-zinc-500 text-sm flex items-center gap-2'>
                          <span className='w-1 h-1 bg-blue-600 rounded-full flex-shrink-0' />
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENTAL HEALTH ── */}
      <section
        data-testid='mental-health-section'
        className='py-24 bg-zinc-900'
      >
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div className='grid grid-cols-1 md:grid-cols-12 gap-12 items-start'>
            <div className='md:col-span-4'>
              <span className='text-xs font-bold uppercase tracking-[0.2em] text-blue-400 block mb-3'>
                Mental Health
              </span>
              <h2 className='font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4'>
                Protect your mental game
              </h2>
              <p className='text-zinc-400 leading-relaxed text-sm'>
                Stress is the silent destroyer of both athletic performance and financial decisions. These practices keep you sharp.
              </p>
            </div>

            <div className='md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {mentalHealthTips.map((tip, i) => (
                <motion.div
                  key={tip.title}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  data-testid={`mental-health-tip-${i}`}
                  className='bg-white/5 border border-white/10 p-6 hover:border-blue-500 hover:bg-white/10 transition-all duration-300'
                >
                  <div className='w-8 h-1 bg-blue-600 mb-4' />
                  <h3 className='font-display font-bold text-white mb-2'>{tip.title}</h3>
                  <p className='text-zinc-400 text-sm leading-relaxed'>{tip.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}