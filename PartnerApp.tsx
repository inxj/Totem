import React, { useEffect } from 'react';
import { ValueProp, Step, ViewMode } from './types';
import Navbar from './components/Navbar';
import PartnerHero from './components/PartnerHero';
import ValueProposition from './components/ValueProposition';
import BusinessModel from './components/BusinessModel';
import StepsTimeline from './components/StepsTimeline';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const PartnerApp: React.FC = () => {
  const viewMode: ViewMode = 'partner';
  const bgColor = 'bg-totem-black';
  const textColor = 'text-totem-white';

  useEffect(() => {
    document.body.className = `${bgColor} ${textColor} font-body transition-theme`;
  }, [bgColor, textColor]);

  const partnerValueProps: ValueProp[] = [
    {
      icon: 'filter_alt',
      title: 'Qualified Leads',
      description: 'Stop chasing dead ends. We provide a steady stream of pre-vetted, high-value projects matched to your expertise.'
    },
    {
      icon: 'shield',
      title: 'Reduced Risk',
      description: 'Standardized contracts, shared insurance partnerships, and clear escalation pathways to protect your margin.'
    },
    {
      icon: 'psychology',
      title: 'Operational Leverage',
      description: 'Shared scheduling, procurement, and admin support so you can focus on delivery and craftsmanship.'
    }
  ];

  const steps: Step[] = [
    {
      id: '01',
      title: 'Introduction',
      description: 'A 30-minute discovery call to understand your capacity, specializations, and operating model.'
    },
    {
      id: '02',
      title: 'Alignment',
      description: 'Portfolio review and site visits to confirm quality standards and brand fit.'
    },
    {
      id: '03',
      title: 'Partnership',
      description: 'Sign the collective agreement and access the Totem lead pipeline and operations support.',
      isPrimary: true
    },
    {
      id: '04',
      title: 'Exit Strategy',
      description: 'Clear offboarding protocols that protect active projects and support future autonomy.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar viewMode={viewMode} />

      <main>
        <PartnerHero />
        <ValueProposition viewMode={viewMode} props={partnerValueProps} />
        <BusinessModel />
        <StepsTimeline steps={steps} />
        <ContactSection viewMode={viewMode} />
      </main>

      <Footer viewMode={viewMode} />
    </div>
  );
};

export default PartnerApp;
