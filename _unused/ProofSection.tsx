import React from 'react';

const stats = [
  { value: '95%', label: 'On-time delivery' },
  { value: '4.9/5', label: 'Client satisfaction' },
  { value: '10–20%', label: 'Faster turnaround' }
];

const ProofSection: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-900 text-white" id="proof">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-3">
              <div className="font-display text-4xl md:text-5xl text-primary">{stat.value}</div>
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
