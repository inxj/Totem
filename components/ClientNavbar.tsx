import React from 'react';

const ClientNavbar: React.FC = () => {
  const navLinks = [
    { label: 'Our Promise', href: '#promise' },
    { label: 'Quoteless', href: '#quoteless' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-transparent mix-blend-difference text-white">
      <a href="/" className="text-2xl font-serif tracking-tight">
        Totem
      </a>

      <div style={{paddingLeft: '50px'}} className="hidden md:flex items-center space-x-12 text-xs font-medium tracking-[0.2em] uppercase">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="hover:opacity-60 transition-opacity">
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="/partner.html"
        className="px-6 py-2 border border-current text-xs font-medium tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
      >
        For Builders
      </a>
    </nav>
  );
};

export default ClientNavbar;
