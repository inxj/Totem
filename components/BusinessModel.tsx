
import React from 'react';

const BusinessModel: React.FC = () => {
  return (
    <section className="py-32 bg-totem-black text-totem-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl mb-10">The Partnership Model</h2>
            <p className="text-neutral-400 font-light mb-12 leading-relaxed">
              Imagine having a full back-office behind you—scheduling, administration, materials procurement, legal, insurance, and access to expert tradespersons—all working to ensure your projects succeed. That's what Totem delivers. You keep your license and your identity. We give you the infrastructure to build with confidence.
            </p>
            
            <div className="space-y-10 mt-4">
              <div className="flex gap-6 items-stretch">
                <div className="w-px bg-primary shrink-0"></div>
                <div>
                  <h4 className="font-display text-xl mb-3">Keep Your Existing License and Company</h4>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest leading-loose">
                    You retain your builder's license and corporate entity. Simply add a trading name and establish a partnership agreement—your business stays yours.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-stretch">
                <div className="w-px bg-neutral-700 shrink-0"></div>
                <div>
                  <h4 className="font-display text-xl mb-3">Become Part of Totem</h4>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest leading-loose">
                    Access scheduling, administration, materials, legal, insurance, and expert trades. Our partners protect and support each other through whatever comes.
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
                <h3 className="font-display text-3xl mb-4 italic">Built to Support You</h3>
                <p className="text-sm text-neutral-500 max-w-xs mx-auto font-light leading-relaxed">
                  Your license. Your business. Our infrastructure, our network, and our commitment to your success.
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
