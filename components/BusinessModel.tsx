
import React from 'react';

const BusinessModel: React.FC = () => {
  return (
    <section className="py-32 bg-totem-black text-totem-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl mb-10">The Operating Model</h2>
            <p className="text-neutral-400 font-light mb-12 leading-relaxed">
              Totem operates like a pseudo-partnership. You retain your license and corporate entity, while operating collectively as Totem Projects. We provide the leverage of a major firm with the autonomy of a boutique builder.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-px h-12 bg-primary"></div>
                <div>
                  <h4 className="font-display text-xl mb-2">Totem Group Pty Ltd</h4>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest leading-loose">
                    Owns brand, shared services, tools & group assets. Target 70 staff by Year 4.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-px h-12 bg-neutral-700"></div>
                <div>
                  <h4 className="font-display text-xl mb-2">Partner Builders</h4>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest leading-loose">
                    50 builders onboarded by Year 4. Bi-directional revenue and cost sharing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square border border-neutral-800 p-12 flex items-center justify-center group">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
              <div className="text-center relative z-10">
                <span className="material-icons-outlined text-6xl text-primary mb-6">handshake</span>
                <h3 className="font-display text-3xl mb-4 italic">Bi-Directional Services</h3>
                <p className="text-sm text-neutral-500 max-w-xs mx-auto font-light leading-relaxed">
                  Support, revenue, and cost sharing designed for mutual resilience and professional growth.
                </p>
              </div>
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/40"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/40"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/40"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModel;
