import React from 'react';
import { ViewMode } from './types';

interface ContactSectionProps {
  viewMode: ViewMode;
}

const ContactSection: React.FC<ContactSectionProps> = ({ viewMode }) => {
  const isDark = viewMode === 'partner';

  const heading = isDark ? 'Apply to join the Totem collective.' : 'Book a consultation with Totem.';
  const description = isDark
    ? 'Tell us about your business and the type of projects you deliver. We will outline the partnership pathway within 1–2 business days.'
    : 'Tell us about your project and we will align you with a Totem-aligned builder. Expect a response within 1–2 business days.';
  const buttonLabel = isDark ? 'Submit Application' : 'Submit Enquiry';

  return (
    <section
      className={`py-24 md:py-32 transition-colors ${isDark ? 'bg-totem-black text-totem-white' : 'bg-white text-totem-black'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className={`text-xs tracking-[0.35em] uppercase font-semibold mb-4 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Contact
            </p>
            <h2 className="font-display text-4xl md:text-5xl mb-6">{heading}</h2>
            <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              {description}
            </p>

            <div className={`mt-10 space-y-4 text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase font-semibold text-neutral-500">Service Regions</p>
                <p>South East Queensland + Northern NSW</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase font-semibold text-neutral-500">Contact</p>
                <p>hello@buildtotem.com.au</p>
                <p>+61 400 000 000</p>
                <p>Brisbane QLD</p>
              </div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                Mon–Fri, 8am–5pm
              </div>
            </div>
          </div>

          <form className={`border p-8 md:p-10 space-y-6 ${isDark ? 'border-neutral-800 bg-totem-gray' : 'border-neutral-200 bg-neutral-50'}`}>
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase font-semibold text-neutral-500">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                className={`mt-2 w-full bg-transparent border-b py-2 text-sm outline-none ${isDark ? 'border-neutral-700 text-totem-white' : 'border-neutral-300 text-totem-black'}`}
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase font-semibold text-neutral-500">Email</label>
              <input
                type="email"
                placeholder="you@email.com"
                className={`mt-2 w-full bg-transparent border-b py-2 text-sm outline-none ${isDark ? 'border-neutral-700 text-totem-white' : 'border-neutral-300 text-totem-black'}`}
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase font-semibold text-neutral-500">
                {isDark ? 'Specialty / Trade' : 'Project Type'}
              </label>
              <input
                type="text"
                placeholder={isDark ? 'Builder, carpenter, joinery, PM' : 'Renovation, new build, repair'}
                className={`mt-2 w-full bg-transparent border-b py-2 text-sm outline-none ${isDark ? 'border-neutral-700 text-totem-white' : 'border-neutral-300 text-totem-black'}`}
              />
            </div>
            <div>
              <label className="text-[10px] tracking-[0.3em] uppercase font-semibold text-neutral-500">
                {isDark ? 'Business Overview' : 'Message'}
              </label>
              <textarea
                rows={4}
                placeholder={isDark ? 'Share your experience, capacity, and service region...' : 'Tell us about your project...'}
                className={`mt-2 w-full bg-transparent border border-transparent border-b py-2 text-sm outline-none resize-none ${isDark ? 'border-neutral-700 text-totem-white' : 'border-neutral-300 text-totem-black'}`}
              />
            </div>
            <button
              type="button"
              className="w-full bg-primary text-white py-3 text-[11px] tracking-[0.3em] uppercase font-semibold"
            >
              {buttonLabel}
            </button>
            <p className={`text-[10px] leading-relaxed ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Estimates are indicative and confirmed after a site inspection. Quoteless projects are subject to scope and scheduling review.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
