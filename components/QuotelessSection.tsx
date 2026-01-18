
import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

const QuotelessSection: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col md:flex-row bg-white overflow-hidden px-12 md:px-32">
      {/* Left Text */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center py-16 pr-8">
        <div className="space-y-6">
          <h2 className="text-5xl md:text-7xl font-serif leading-none">Quoteless</h2>
          <div className="space-y-4 max-w-sm">
            <p className="text-lg text-gray-400 font-light leading-snug">
              Small projects. Expert service. Immediate action.
            </p>
            <a 
              href="#contact"
              className="group flex items-center space-x-2 text-[10px] tracking-[0.2em] uppercase font-bold hover:opacity-70 transition-opacity pt-4"
            >
              <span>Start a Quoteless Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Right Feature Card */}
      <div className="w-full md:w-1/2 h-full flex items-center py-20">
        <div className="w-full bg-[#f4f4f4] p-12 md:p-16 rounded-sm shadow-sm">
          <div className="mb-8">
            <Zap className="w-10 h-10 text-black mb-6" />
            <h3 className="text-2xl font-serif mb-4">Skip the wait.</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              For smaller renovations and repairs, the traditional quoting process is broken. It's slow, inaccurate, and frustrating. 
              <span className="font-bold text-black mx-1">Quoteless</span> is our premium service for rapid deployment. We work on a transparent time-and-materials basis with pre-approved rates, getting skilled tradespeople to your door immediately.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">Ideal For</h4>
              <ul className="text-sm space-y-2 text-gray-600 font-medium">
                <li>• Bathroom refreshes</li>
                <li>• Custom joinery repair</li>
                <li>• Structural maintenance</li>
                <li>• Pre-sale touch ups</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">Benefits</h4>
              <ul className="text-sm space-y-2 text-gray-600 font-medium">
                <li>• No waiting for site visits</li>
                <li>• Priority scheduling</li>
                <li>• Dedicated project manager</li>
                <li>• Live daily logs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotelessSection;
