import React from 'react';

const faqs = [
  {
    question: 'Do you handle both residential and commercial projects?',
    answer: 'Yes. Totem focuses on residential work with select light commercial projects where detail and finish matter.'
  },
  {
    question: 'What is Quoteless and when should I use it?',
    answer: 'Quoteless is our rapid-response service for small projects and repairs. It uses transparent, pre-approved rates so work can begin immediately.'
  },
  {
    question: 'How is Totem different from a typical builder?',
    answer: 'Totem brings vetted builders under one standard of quality, process, and communication so you get a consistent experience across every project.'
  },
  {
    question: 'Where do you operate?',
    answer: 'South East Queensland and Northern NSW. We can travel further for select projects.'
  }
];

const FAQSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-neutral-50" id="faq">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-neutral-400 font-semibold mb-4">FAQ</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">Answers to common Totem questions.</h2>
          <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
            Everything you need to know before starting a build, renovation, or Quoteless project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-white border border-neutral-200 p-8">
              <h3 className="font-display text-2xl mb-3">{faq.question}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
