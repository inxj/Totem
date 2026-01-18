import React from 'react';

const projects = [
  {
    title: 'New Farm Terrace Upgrade',
    type: 'Residential Renovation',
    description: 'A heritage-sensitive interior renovation with bespoke joinery and improved natural light.',
    image: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Teneriffe Studio Build',
    type: 'Light Commercial',
    description: 'Adaptive reuse of a warehouse bay into a client-facing studio with refined materials.',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200'
  },
  {
    title: 'Paddington Extension',
    type: 'Residential Build',
    description: 'A contemporary extension that preserves the original cottage footprint while expanding living zones.',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200'
  }
];

const ProjectsSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-white" id="projects">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.35em] uppercase text-neutral-400 font-semibold mb-4">Projects</p>
            <h2 className="font-display text-4xl md:text-5xl mb-4">Recent work that balances form and performance.</h2>
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
              Sample projects shown until the first Totem case studies are ready for release.
            </p>
          </div>
          <p className="text-[11px] tracking-widest uppercase text-neutral-400 font-semibold">Residential + light commercial</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article key={project.title} className="group border border-neutral-200 overflow-hidden bg-neutral-50">
              <div className="h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <p className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-semibold mb-4">{project.type}</p>
                <h3 className="font-display text-2xl mb-3">{project.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
