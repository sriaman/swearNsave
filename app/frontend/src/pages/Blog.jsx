import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, X } from 'lucide-react';
import { blogPosts } from '../data/blogData';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const categoryColors = {
  orange: {
    tag: 'bg-orange-50 text-orange-700',
    border: 'border-orange-500',
    dot: 'bg-orange-500',
  },
  emerald: {
    tag: 'bg-emerald-50 text-emerald-700',
    border: 'border-emerald-500',
    dot: 'bg-emerald-500',
  },
  blue: {
    tag: 'bg-blue-50 text-blue-700',
    border: 'border-blue-600',
    dot: 'bg-blue-600',
  },
};

function ArticleModal({ post, onClose }) {
  if (!post) return null;
  const colors = categoryColors[post.categoryColor] || categoryColors.orange;

  const paragraphs = post.content.split('\n').filter(Boolean);

  return (
    <div
      data-testid='article-modal'
      className='fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-12'
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className='bg-white w-full max-w-2xl relative'>
        {/* Close btn */}
        <button
          data-testid='article-modal-close'
          onClick={onClose}
          className='absolute top-4 right-4 z-10 w-9 h-9 bg-zinc-900 text-white flex items-center justify-center hover:bg-orange-500 transition-colors duration-200'
        >
          <X className='w-4 h-4' />
        </button>

        {/* Image */}
        <div className='h-56 overflow-hidden'>
          <img src={post.image} alt={post.title} className='w-full h-full object-cover' />
        </div>

        <div className='p-8'>
          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 ${colors.tag}`}>
            {post.category}
          </span>
          <h2 className='font-display font-black text-2xl sm:text-3xl text-zinc-900 mt-4 mb-2 tracking-tight'>
            {post.title}
          </h2>
          <div className='flex items-center gap-4 text-zinc-400 text-sm mb-6 pb-6 border-b border-zinc-100'>
            <span>{post.date}</span>
            <div className='flex items-center gap-1'>
              <Clock className='w-3.5 h-3.5' />
              {post.readTime}
            </div>
          </div>

          <div className='prose prose-zinc max-w-none'>
            {paragraphs.map((para, i) => {
              if (para.startsWith('**') && para.endsWith('**')) {
                return (
                  <h3 key={i} className='font-display font-bold text-lg text-zinc-900 mt-6 mb-2'>
                    {para.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              if (para.match(/^\*\*.+\*\*/)) {
                const parts = para.split(/\*\*(.+?)\*\*/g);
                return (
                  <p key={i} className='text-zinc-600 text-sm leading-relaxed mb-4'>
                    {parts.map((part, j) =>
                      j % 2 === 1 ? (
                        <strong key={j} className='text-zinc-900 font-bold'>
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </p>
                );
              }
              if (para.match(/^\d+\./)) {
                const items = para.split('\n').filter(Boolean);
                return (
                  <ol key={i} className='list-decimal pl-5 text-zinc-600 text-sm leading-relaxed mb-4 space-y-1'>
                    {items.map((item, j) => (
                      <li key={j}>{item.replace(/^\d+\.\s*/, '')}</li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={i} className='text-zinc-600 text-sm leading-relaxed mb-4'>
                  {para}
                </p>
              );
            })}
          </div>

          <div className='flex flex-wrap gap-2 mt-6 pt-6 border-t border-zinc-100'>
            {post.tags.map((tag) => (
              <span key={tag} className='bg-zinc-100 text-zinc-600 text-xs px-3 py-1 font-medium'>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [activePost, setActivePost] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Finance', 'Fitness', 'Wellness', 'Finance & Fitness', 'Wellness & Finance'];

  const filtered =
    filter === 'All'
      ? blogPosts
      : blogPosts.filter(
          (p) =>
            p.category === filter ||
            p.category.includes(filter.replace('Finance & Fitness', '').replace('Wellness & Finance', ''))
        );

  const actualFiltered =
    filter === 'All'
      ? blogPosts
      : blogPosts.filter((p) =>
          filter === 'Finance & Fitness'
            ? p.category === 'Finance & Fitness'
            : filter === 'Wellness & Finance'
            ? p.category === 'Wellness & Finance'
            : p.category.includes(filter)
        );

  return (
    <div>
      {/* ── PAGE HERO ── */}
      <section data-testid='blog-hero' className='py-20 border-b border-zinc-200 bg-white'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <span className='text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 block mb-3'>
            The Blog
          </span>
          <h1 className='font-display font-black text-5xl sm:text-6xl text-zinc-900 tracking-tighter leading-none mb-6'>
            Insights where<br />
            <span className='text-orange-500'>sweat meets savings.</span>
          </h1>
          <p className='text-zinc-500 text-lg max-w-xl leading-relaxed'>
            Real talk on building better bodies and better balance sheets — from people who do both.
          </p>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <div className='bg-white border-b border-zinc-200 sticky top-16 z-40'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div
            data-testid='blog-filter-tabs'
            className='flex gap-0 overflow-x-auto'
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-testid={`blog-filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
                className={`px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200 ${
                  filter === cat
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── BLOG GRID ── */}
      <section
        data-testid='blog-grid'
        className='py-16 max-w-7xl mx-auto px-6 md:px-12'
      >
        {/* Featured first post */}
        {filter === 'All' && blogPosts[0] && (
          <motion.div
            initial='hidden'
            animate='visible'
            variants={fadeUp}
            className='mb-12'
          >
            <button
              data-testid='blog-featured-post'
              onClick={() => setActivePost(blogPosts[0])}
              className='w-full text-left neo-card overflow-hidden group'
            >
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='relative h-64 md:h-full overflow-hidden min-h-[260px]'>
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                  />
                  <div className='absolute inset-0 bg-zinc-900/30' />
                  <div className='absolute top-4 left-4 bg-orange-500 px-3 py-1'>
                    <span className='text-white text-xs font-bold uppercase tracking-wider'>Featured</span>
                  </div>
                </div>
                <div className='p-8 md:p-10 flex flex-col justify-center'>
                  <span className={`text-xs font-bold uppercase tracking-wider ${categoryColors[blogPosts[0].categoryColor]?.tag || 'bg-orange-50 text-orange-700'} inline-block px-2 py-1 mb-4`}>
                    {blogPosts[0].category}
                  </span>
                  <h2 className='font-display font-black text-2xl sm:text-3xl text-zinc-900 mb-4 tracking-tight group-hover:text-orange-500 transition-colors duration-200'>
                    {blogPosts[0].title}
                  </h2>
                  <p className='text-zinc-500 text-sm leading-relaxed mb-6'>{blogPosts[0].excerpt}</p>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3 text-zinc-400 text-xs'>
                      <span>{blogPosts[0].date}</span>
                      <span>·</span>
                      <Clock className='w-3.5 h-3.5' />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                    <div className='flex items-center gap-1 text-orange-500 text-sm font-bold'>
                      Read <ChevronRight className='w-4 h-4' />
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </motion.div>
        )}

        {/* Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {(filter === 'All' ? blogPosts.slice(1) : actualFiltered).map((post, i) => {
            const colors = categoryColors[post.categoryColor] || categoryColors.orange;
            return (
              <motion.div
                key={post.id}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
              >
                <button
                  data-testid={`blog-post-card-${post.id}`}
                  onClick={() => setActivePost(post)}
                  className={`w-full text-left neo-card border-t-4 ${colors.border} overflow-hidden group`}
                >
                  <div className='h-40 overflow-hidden'>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                    />
                  </div>
                  <div className='p-6'>
                    <span className={`text-xs font-bold uppercase tracking-wider inline-block px-2 py-1 mb-3 ${colors.tag}`}>
                      {post.category}
                    </span>
                    <h3 className='font-display font-bold text-lg text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors duration-200 leading-snug'>
                      {post.title}
                    </h3>
                    <p className='text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-2'>{post.excerpt}</p>
                    <div className='flex items-center justify-between text-xs text-zinc-400'>
                      <span>{post.date}</span>
                      <div className='flex items-center gap-1'>
                        <Clock className='w-3 h-3' />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Article Modal */}
      {activePost && (
        <ArticleModal post={activePost} onClose={() => setActivePost(null)} />
      )}
    </div>
  );
}