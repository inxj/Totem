import React from 'react';

const PartnerHero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8">
          <p className="text-primary font-medium tracking-[0.25em] uppercase text-xs mb-8">
            For Builders & Craftsmen
          </p>
          <h1 className="font-display text-4xl md:text-7xl lg:text-[80px] leading-[0.95] mb-10">
            Increase Profitability, <br />
            <span className="italic">Resilience</span>, and Focus.
          </h1>
          <p className="text-sm md:text-base max-w-xl leading-relaxed font-light text-neutral-400">
            Join the Totem Collective to streamline your operations. We provide the infrastructure, technology, and lead generation so you can retain autonomy over your craft.
          </p>
          <div className="mt-14 flex flex-col sm:flex-row gap-5">
            <a
              href="#value"
              className="border px-10 py-4 text-xs font-semibold tracking-widest uppercase transition-all border-totem-white text-totem-white hover:bg-totem-white hover:text-totem-black"
            >
              Discover the Value
            </a>
            <a
              href="#model"
              className="px-10 py-4 text-xs font-semibold tracking-widest uppercase underline underline-offset-8 decoration-primary transition-all hover:translate-x-1"
            >
              The Operating Model
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerHero;
