import { Link } from 'react-router-dom';
import { Zap, Instagram, Twitter, Youtube, Facebook } from 'lucide-react';

const footerLinks = {
  Pages: [
    { label: 'Home', path: '/' },
    { label: 'Fitness', path: '/fitness' },
    { label: 'Finance', path: '/finance' },
    { label: 'Wellness', path: '/wellness' },
  ],
  Resources: [
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ],
};

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter / X', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
];

export default function Footer() {
  return (
    <footer className='bg-zinc-900 text-white border-t border-zinc-800'>
      <div className='max-w-7xl mx-auto px-6 md:px-12 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12'>
          {/* Brand */}
          <div className='md:col-span-2'>
            <Link to='/' className='flex items-center gap-2 mb-4'>
              <div className='w-8 h-8 bg-orange-500 flex items-center justify-center'>
                <Zap className='w-4 h-4 text-white' strokeWidth={2.5} />
              </div>
              <span className='font-display font-black text-white text-xl tracking-tight'>
                Sweat<span className='text-orange-500'>&</span>Save
              </span>
            </Link>
            <p className='text-zinc-400 text-sm leading-relaxed max-w-sm'>
              Where fitness meets finance. Build your strongest body and your smartest wallet — simultaneously.
            </p>
            <div className='flex gap-3 mt-6'>
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  data-testid={`footer-social-${label.toLowerCase().replace(/\s|\//g, '-')}`}
                  aria-label={label}
                  className='w-9 h-9 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-orange-500 hover:bg-orange-500 transition-all duration-300'
                >
                  <Icon className='w-4 h-4' />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className='text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4'>
                {group}
              </h4>
              <ul className='flex flex-col gap-3'>
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className='text-zinc-400 text-sm hover:text-white transition-colors duration-200'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className='border-t border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-zinc-500 text-sm'>
            &copy; {new Date().getFullYear()} Sweat & Save. All rights reserved.
          </p>
          <p className='text-zinc-600 text-xs'>
            Built for those who sweat and save simultaneously.
          </p>
        </div>
      </div>
    </footer>
  );
}