import React from 'react';

const PromiseSection: React.FC = () => {
  const points = [
    {
      title: "Uncompromising Quality",
      desc: "We believe a home is a legacy. Our construction standards exceed industry norms, utilizing premium materials and artisanal craftsmanship to ensure your totem stands the test of time."
    },
    {
      title: "Radical Transparency",
      desc: "No hidden costs. No surprise delays. We provide real-time access to project timelines and financials, so you are never left guessing about the state of your build."
    },
    {
      title: "Reliable Timelines",
      desc: "We respect your time as much as we respect your property. Our project management methodology ensures efficient workflows and predictable delivery dates."
    }
  ];

  return (
    <div className="h-full w-full bg-white overflow-hidden">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col md:flex-row">
        {/* Left Content */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-12 md:px-20 py-20">
        <div className="max-w-md space-y-12">
          <div className="space-y-4">
             <span className="inline-block px-3 py-1 border border-gray-200 rounded-full text-[10px] uppercase tracking-widest text-gray-400 font-bold">
              Our Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-serif">The Totem Promise.</h2>
          </div>

          <div className="space-y-8">
            {points.map((p, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                  <h3 className="text-base font-medium tracking-tight">{p.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed ml-4 border-l border-gray-100 pl-6 py-1">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

        {/* Right Image Grid */}
        <div className="w-full md:w-1/2 h-full bg-gray-50 p-12 md:p-16">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="space-y-4">
              <img 
                src="/images/promise-architecture-detail.jpg" 
                className="w-full h-[60%] object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                alt="Architecture detail"
              />
              <img 
                src="/images/promise-bathroom-detail.jpg" 
                className="w-full h-[38%] object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                alt="Bathroom detail"
              />
            </div>
            <div className="space-y-4 pt-12">
              <img 
                src="/images/promise-materials.jpg" 
                className="w-full h-[40%] object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                alt="Materials"
              />
              <img 
                src="/images/promise-interior-minimal.jpg" 
                className="w-full h-[55%] object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                alt="Interior minimalism"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromiseSection;
