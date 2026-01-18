
import React from 'react';
import { ViewMode, ValueProp } from '../types';

interface Props {
  viewMode: ViewMode;
  props: ValueProp[];
}

const ValueProposition: React.FC<Props> = ({ viewMode, props }) => {
  const isDark = viewMode === 'partner';

  return (
    <section className={`py-24 md:py-32 transition-colors ${isDark ? 'bg-totem-gray' : 'bg-neutral-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              {isDark ? 'The Totem Value Proposition' : 'Why Clients Choose Totem'}
            </h2>
            <p className={`text-sm tracking-wide ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              {isDark ? 'Infrastructure designed for the modern builder.' : 'A new standard for residential and commercial delivery.'}
            </p>
          </div>
          <div className={`hidden md:block h-px flex-grow ml-12 mb-4 ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800">
          {props.map((prop, idx) => (
            <div 
              key={idx} 
              className={`group p-12 transition-all duration-500 ${isDark ? 'bg-totem-black hover:bg-neutral-900' : 'bg-totem-white hover:bg-neutral-50'}`}
            >
              <div className={`w-14 h-14 flex items-center justify-center mb-10 rounded-full transition-transform group-hover:scale-110 ${isDark ? 'bg-neutral-900 text-primary' : 'bg-neutral-100 text-primary'}`}>
                <span className="material-icons-outlined text-3xl">{prop.icon}</span>
              </div>
              <h3 className="font-display text-2xl mb-6 tracking-tight">{prop.title}</h3>
              <p className={`font-light leading-relaxed text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
