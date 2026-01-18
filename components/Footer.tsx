
import React from 'react';
import { ViewMode } from '../types';

interface FooterProps {
  viewMode: ViewMode;
}

const Footer: React.FC<FooterProps> = ({ viewMode }) => {
  const isPartner = viewMode === 'partner';
  const portalLink = isPartner ? '/' : '/partner.html';
  const portalLabel = isPartner ? 'Client Site' : 'Builder Login';

  return (
    <footer className="w-full bg-[#1a1a1a] text-white pt-32 pb-16 px-12 md:px-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
        <div className="space-y-6">
          <h2 className="text-3xl font-serif">Totem</h2>
          <div className="text-xs text-gray-500 space-y-2 leading-relaxed tracking-wide">
            <p>South East Queensland + Northern NSW</p>
            <p>hello@buildtotem.com.au</p>
            <p>+61 400 000 000</p>
          </div>
        </div>

        <div className="lg:col-start-3">
          <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] font-bold">
            <li><a href="#" className="hover:text-gray-400 transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-gray-400 transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-gray-400 transition-colors">Pinterest</a></li>
          </ul>
        </div>

        <div>
          <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] font-bold">
            <li><a href="#" className="hover:text-gray-400 transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-gray-400 transition-colors">Terms</a></li>
            <li><a href={portalLink} className="hover:text-gray-400 transition-colors">{portalLabel}</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.1em] text-gray-600 font-medium">
        <p>© 2024 Totem Collective.</p>
        <p>Designed for longevity.</p>
      </div>
    </footer>
  );
};

export default Footer;
