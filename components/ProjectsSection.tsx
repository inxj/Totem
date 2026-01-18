import React from 'react';

const pillars = [
  {
    title: 'Predict',
    description: "We map out your project with clarity from day one—forecasting options, costs, and key milestones so you can make informed decisions at every stage.",
  },
  {
    title: 'Adapt',
    description: "Real projects face real conditions. Whether it's weather delays, design refinements, or shifting markets, we navigate change without losing momentum or control.",
  },
  {
    title: 'Assure',
    description: "You stay in the driver's seat, backed by a team built to deliver. With Totem behind your project, you have the confidence that comes from knowing it's in capable hands.",
  },
];

const ProjectsSection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center bg-neutral-100" id="projects">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
        <div className="max-w-3xl mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-neutral-400 font-semibold mb-4">New builds and major renovations</p>
          <h2 className="font-display text-5xl md:text-7xl font-serif leading-none mb-6">Projects</h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            When you're undertaking a significant build or renovation, clarity matters. Totem partners with clients on transformative projects—new constructions, large-scale renovations, and complex refurbishments—where precision planning and dependable execution are non-negotiable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="bg-white p-10 border border-neutral-200">
              <h3 className="font-display text-2xl mb-4">{pillar.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{pillar.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-neutral-300">
          <p className="text-neutral-500 text-sm leading-relaxed max-w-2xl">
            Whether you're building from the ground up or reimagining an existing space, Totem brings the structure and responsiveness to see it through—on scope, on budget, and aligned with your vision as it develops.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
