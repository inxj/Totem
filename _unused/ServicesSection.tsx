import React from 'react';

const services = [
  {
    title: 'Renovate',
    description: 'Architecturally guided renovations that preserve character while upgrading performance and flow.',
    tag: 'Residential focus'
  },
  {
    title: 'Build',
    description: 'Custom new builds for clients who want detail-led execution and tight delivery control.',
    tag: 'Residential + light commercial'
  },
  {
    title: 'Repair',
    description: 'Targeted repairs and upgrades that improve durability, comfort, and compliance.',
    tag: 'Planned maintenance'
  },
  {
    title: 'Quoteless',
    description: 'Immediate, premium service for small projects with transparent, pre-approved rates.',
    tag: 'Rapid response'
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.35em] uppercase text-neutral-400 font-semibold mb-4">Services</p>
            <h2 className="font-display text-4xl md:text-5xl mb-4">Build, renovate, and repair without the usual friction.</h2>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
              Totem brings the most reliable builders together under one standard. The result is a predictable, premium experience
              for residential and light commercial clients.
            </p>
          </div>
          <div className="text-[11px] tracking-widest uppercase text-neutral-400 font-semibold">
            South East Queensland + Northern NSW
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.title} className="border border-neutral-200 p-8 bg-neutral-50 hover:bg-white transition-colors">
              <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-semibold mb-6">
                {service.tag}
              </div>
              <h3 className="font-display text-2xl mb-4">{service.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
