import { motion } from 'framer-motion';
import { TrendingUp, PiggyBank, BarChart3, CheckCircle2 } from 'lucide-react';
import { financeTips } from '../data/blogData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const categoryIcons = {
  Saving: PiggyBank,
  Budgeting: BarChart3,
  Hacks: TrendingUp,
  Investing: TrendingUp,
};

const investingSteps = [
  { step: '01', title: 'Emergency Fund', desc: 'Save 3-6 months of expenses in a high-yield savings account first.' },
  { step: '02', title: 'Employer 401(k) Match', desc: "Contribute enough to get your full employer match — it's free money." },
  { step: '03', title: 'Pay Off High-Interest Debt', desc: 'Eliminate credit card debt (15-25% APR) before investing.' },
  { step: '04', title: 'Open a Roth IRA', desc: 'Tax-free growth for retirement. Max out annually if possible.' },
  { step: '05', title: 'Invest in Index Funds', desc: 'Buy the whole market via low-cost total market index funds.' },
  { step: '06', title: 'Automate & Stay the Course', desc: 'Set recurring investments. Stop watching the market daily.' },
];

export default function Finance() {
  return (
    <div>
      {/* ── PAGE HERO ── */}
      <section
        data-testid='finance-hero'
        className='relative py-24 bg-zinc-900 overflow-hidden'
      >
        <div className='absolute inset-0'>
          <img
            src='https://images.pexels.com/photos/259091/pexels-photo-259091.jpeg?w=1600&q=80'
            alt='Finance'
            className='w-full h-full object-cover opacity-20'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-zinc-900 to-zinc-900/60' />
        </div>
        <div className='relative max-w-7xl mx-auto px-6 md:px-12'>
          <div className='h-1 w-16 bg-emerald-500 mb-6' />
          <span className='text-xs font-bold uppercase tracking-[0.2em] text-emerald-500 block mb-3'>
            Finance
          </span>
          <h1 className='font-display font-black text-5xl sm:text-6xl text-white tracking-tighter leading-none mb-6'>
            Your Money,<br />
            <span className='text-emerald-400'>Your Rules.</span>
          </h1>
          <p className='text-zinc-300 text-lg max-w-xl leading-relaxed'>
            Simple, actionable strategies to budget better, save smarter, and start building real wealth — no finance degree required.
          </p>
        </div>
      </section>

      {/* ── BUDGETING & SAVING TIPS ── */}
      <section data-testid='finance-tips-section' className='py-24 max-w-7xl mx-auto px-6 md:px-12'>
        <div className='mb-12'>
          <span className='text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 block mb-3'>
            Tips & Hacks
          </span>
          <h2 className='font-display font-bold text-3xl sm:text-4xl text-zinc-900 tracking-tight'>
            Proven money moves
          </h2>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {financeTips.map((tip, i) => {
            const Icon = categoryIcons[tip.category] || TrendingUp;
            return (
              <motion.div
                key={tip.id}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, margin: '-40px' }}
                custom={i}
                variants={fadeUp}
                data-testid={`finance-tip-card-${tip.id}`}
                className='neo-card accent-emerald p-8 group'
              >
                <div className='bg-emerald-50 w-10 h-10 flex items-center justify-center mb-4'>
                  <Icon className='w-5 h-5 text-emerald-600' strokeWidth={2} />
                </div>
                <span className='text-xs font-bold uppercase tracking-[0.15em] text-emerald-600 block mb-2'>
                  {tip.category}
                </span>
                <h3 className='font-display font-bold text-lg text-zinc-900 mb-2'>{tip.title}</h3>
                <div className='text-emerald-600 font-bold text-sm mb-3'>{tip.amount}</div>
                <p className='text-zinc-500 text-sm leading-relaxed'>{tip.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── INVESTING ROADMAP ── */}
      <section
        data-testid='investing-roadmap-section'
        className='py-24 bg-white border-t border-zinc-200'
      >
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div className='grid grid-cols-1 md:grid-cols-12 gap-12 items-start'>
            <div className='md:col-span-4'>
              <span className='text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 block mb-3'>
                Beginner Investing
              </span>
              <h2 className='font-display font-bold text-3xl sm:text-4xl text-zinc-900 tracking-tight mb-4'>
                The 6-step investing roadmap
              </h2>
              <p className='text-zinc-500 leading-relaxed text-sm'>
                Follow these steps in order. Don't skip ahead. This sequence is optimized for maximum wealth-building safety.
              </p>
              <div className='mt-6 bg-emerald-500 p-5'>
                <p className='text-white font-bold text-sm'>
                  'Compound interest is the eighth wonder of the world.'
                </p>
                <p className='text-emerald-100 text-xs mt-2'>— Albert Einstein</p>
              </div>
            </div>

            <div className='md:col-span-8'>
              <div className='flex flex-col gap-0'>
                {investingSteps.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    custom={i}
                    variants={fadeUp}
                    data-testid={`investing-step-${i}`}
                    className='flex gap-6 p-6 border border-zinc-200 -mt-px hover:z-10 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-200 group'
                  >
                    <div className='flex-shrink-0 w-10 h-10 bg-zinc-900 group-hover:bg-emerald-500 flex items-center justify-center transition-colors duration-200'>
                      <span className='text-white text-xs font-black'>{step.step}</span>
                    </div>
                    <div>
                      <div className='flex items-center gap-2'>
                        <h3 className='font-display font-bold text-zinc-900'>{step.title}</h3>
                        <CheckCircle2 className='w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                      </div>
                      <p className='text-zinc-500 text-sm mt-1'>{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BUDGET CALCULATOR TEASER ── */}
      <section
        data-testid='budget-visual-section'
        className='py-24 bg-zinc-900'
      >
        <div className='max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          <div>
            <span className='text-xs font-bold uppercase tracking-[0.2em] text-emerald-500 block mb-4'>
              The 50/30/20 Rule
            </span>
            <h2 className='font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4'>
              Allocate your paycheck like a pro
            </h2>
            <p className='text-zinc-400 leading-relaxed mb-8'>
              This simple framework has transformed millions of people's finances. Apply it starting with your next paycheck.
            </p>
            <div className='flex flex-col gap-4'>
              {[
                { pct: '50%', label: 'Needs', sub: 'Rent, food, utilities, transport', color: 'bg-blue-600' },
                { pct: '30%', label: 'Wants', sub: 'Dining, entertainment, travel', color: 'bg-orange-500' },
                { pct: '20%', label: 'Savings & Investments', sub: 'Emergency fund, retirement, wealth', color: 'bg-emerald-500' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  data-testid={`budget-rule-${item.label.toLowerCase()}`}
                  className='flex items-center gap-4'
                >
                  <div className={`${item.color} px-4 py-2 min-w-[70px] text-center`}>
                    <span className='text-white font-black font-display text-lg'>{item.pct}</span>
                  </div>
                  <div>
                    <div className='text-white font-bold text-sm'>{item.label}</div>
                    <div className='text-zinc-500 text-xs'>{item.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className='bg-white/5 border border-white/10 p-8'>
            <h3 className='font-display font-bold text-white text-xl mb-6'>Quick Budget Check</h3>
            <div className='space-y-4'>
              {[
                { q: 'Do you have 3+ months of expenses saved?', good: true },
                { q: 'Are you contributing to a 401(k) or IRA?', good: true },
                { q: 'Do you track your spending monthly?', good: false },
                { q: 'Is your credit card balance zero each month?', good: false },
                { q: 'Are you investing at least 15% of income?', good: false },
              ].map((item, i) => (
                <div
                  key={i}
                  data-testid={`budget-check-item-${i}`}
                  className='flex items-start gap-3'
                >
                  <div className={`w-5 h-5 mt-0.5 flex-shrink-0 border-2 flex items-center justify-center ${item.good ? 'border-emerald-500 bg-emerald-500' : 'border-zinc-600'}`}>
                    {item.good && <CheckCircle2 className='w-3 h-3 text-white' />}
                  </div>
                  <p className={`text-sm ${item.good ? 'text-zinc-300' : 'text-zinc-500'}`}>{item.q}</p>
                </div>
              ))}
            </div>
            <p className='text-zinc-500 text-xs mt-6'>
              Ticking all five? You're ahead of 90% of people. Keep going.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}