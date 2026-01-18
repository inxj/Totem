
import React from 'react';
import { Step } from '../types';

interface Props {
  steps: Step[];
}

const StepsTimeline: React.FC<Props> = ({ steps }) => {
  return (
    <section className="py-32 px-6 border-t border-neutral-800" id="join">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="font-display text-4xl md:text-5xl mb-6 italic">Join in Four Steps</h2>
          <p className="text-neutral-500 max-w-lg mx-auto text-sm tracking-wide leading-relaxed font-light">
            A transparent path to partnership designed to ensure mutual alignment and quality assurance for the entire collective.
          </p>
        </div>

        <div className="hidden lg:flex justify-between items-start relative pt-8">
          {/* Progress Line */}
          <div className="absolute top-[52px] left-0 w-full h-[1px] bg-neutral-800 -z-0"></div>
          
          {steps.map((step) => (
            <div key={step.id} className="w-1/4 px-6 z-10">
              <div className={`w-12 h-12 flex items-center justify-center mb-10 font-display text-xl transition-all duration-500 border
                ${step.isPrimary 
                  ? 'bg-primary text-totem-white border-primary shadow-[0_0_30px_rgba(212,175,55,0.2)]' 
                  : 'bg-totem-black text-neutral-500 border-neutral-700 hover:border-neutral-400'}`}>
                {step.id}
              </div>
              <h3 className={`text-lg font-medium mb-4 ${step.isPrimary ? 'text-primary' : 'text-totem-white'}`}>
                {step.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden space-y-16 relative">
          <div className="absolute top-0 bottom-0 left-6 w-px bg-neutral-800 -z-0"></div>
          {steps.map((step) => (
            <div key={step.id} className="flex gap-8 items-start relative z-10">
              <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center font-display text-lg border
                ${step.isPrimary ? 'bg-primary border-primary text-white' : 'bg-totem-black border-neutral-800 text-neutral-500'}`}>
                {step.id}
              </div>
              <div>
                <h3 className={`text-lg font-medium mb-3 ${step.isPrimary ? 'text-primary' : 'text-white'}`}>{step.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsTimeline;
