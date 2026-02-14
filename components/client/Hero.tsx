
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center bg-[#fafafa] px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 pointer-events-none">
        <span className="text-[40rem] font-serif text-gray-100 opacity-50 select-none">T</span>
      </div>

      <div className="relative z-10 max-w-2xl text-center space-y-12">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-serif tracking-tight leading-none mb-4">
            Totem
          </h1>
          <p className="text-xs tracking-[0.4em] uppercase font-medium text-gray-500">
            Build + Renovate + Repair
          </p>
        </div>

        <div className="max-w-lg mx-auto italic font-serif text-sm md:text-base text-gray-600 leading-relaxed">
          <span className="font-bold not-italic text-sm tracking-widest uppercase block mb-4 opacity-70">Noun:</span>
          An object, such as a residence or commercial property, which serves as the emblem of a family or clan and often a reminder of its ancestry.
        </div>
      </div>

      <div className="absolute bottom-12 left-12 text-[10px] tracking-widest uppercase opacity-40 font-medium">
        buildtotem.com.au
      </div>
    </div>
  );
};

export default Hero;
