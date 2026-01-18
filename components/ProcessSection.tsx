import React from 'react';

const steps = [
  {
    title: 'Discovery',
    description: 'A focused consultation to align on scope, budget expectations, and site realities.'
  },
  {
    title: 'Design + Feasibility',
    description: 'Concept design and feasibility to validate buildability, approvals, and cost envelopes.'
  },
  {
    title: 'Build',
    description: 'Dedicated project lead, transparent scheduling, and quality checkpoints at every stage.'
  },
  {
    title: 'Handover',
    description: 'Detailed close-out, documentation, and a service plan that supports long-term care.'
  }
];

const ProcessSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-neutral-50" id="process">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.35em] uppercase text-neutral-400 font-semibold mb-4">Process</p>
            <h2 className="font-display text-4xl md:text-5xl mb-4">A predictable path from vision to delivery.</h2>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
              Totem standardises the experience across every builder in the collective, so you always know where your project sits.
            </p>
          </div>
          <p className="text-[11px] tracking-widest uppercase text-neutral-400 font-semibold">1–2 business day response</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="bg-white border border-neutral-200 p-8">
              <div className="text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-semibold mb-6">
                0{index + 1}
              </div>
              <h3 className="font-display text-2xl mb-3">{step.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
