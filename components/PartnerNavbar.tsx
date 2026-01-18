import React from 'react';

const PartnerNavbar: React.FC = () => {
  const navLinks = [
    { label: 'Value', href: '#value' },
    { label: 'Partnership', href: '#model' },
    { label: 'Process', href: '#process' },
    { label: 'Apply', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-transparent mix-blend-difference text-white">
      <a href="/partner.html" className="text-2xl font-display tracking-tight">
        Totem
      </a>

      <div className="hidden md:flex items-center space-x-12 text-xs font-medium tracking-[0.2em] uppercase">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="hover:opacity-60 transition-opacity">
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="/"
        className="px-6 py-2 border border-current text-xs font-medium tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
      >
        Client Site
      </a>
    </nav>
  );
};

export default PartnerNavbar;
