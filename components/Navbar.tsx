
import React from 'react';
import { ViewMode } from '../types';

interface NavbarProps {
  viewMode: ViewMode;
}

const Navbar: React.FC<NavbarProps> = ({ viewMode }) => {
  const isPartner = viewMode === 'partner';

  const crossLink = isPartner
    ? { label: 'Client Site', href: '/' }
    : { label: 'Partner Portal', href: '/partner.html' };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-transparent mix-blend-difference text-white">
      <a href={isPartner ? '/partner.html' : '/'} className="text-2xl font-serif tracking-tight">
        Totem
      </a>
      
      <div className="hidden md:flex items-center space-x-12 text-xs font-medium tracking-[0.2em] uppercase">
        <a href="#promise" className="hover:opacity-60 transition-opacity">Our Promise</a>
        <a href="#quoteless" className="hover:opacity-60 transition-opacity">Quoteless</a>
        <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
      </div>
      
      <a 
        href={crossLink.href}
        className="px-6 py-2 border border-current text-xs font-medium tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
      >
        {crossLink.label}
      </a>
    </nav>
  );
};

export default Navbar;
