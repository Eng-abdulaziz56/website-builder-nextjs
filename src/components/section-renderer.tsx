'use client';

import { Section, HeaderSection, HeroSection, FeaturesSection, AboutSection, FooterSection } from '@/types/section';
import HeaderSectionComponent from './sections/header-section';
import HeroSectionComponent from './sections/hero-section';
import FeaturesSectionComponent from './sections/features-section';
import AboutSectionComponent from './sections/about-section';
import FooterSectionComponent from './sections/footer-section';

interface SectionRendererProps {
  section: Section;
  isPreview?: boolean;
}

export default function SectionRenderer({ section, isPreview = false }: SectionRendererProps) {
  if (!section.isVisible) {
    return null;
  }

  switch (section.type) {
    case 'header':
      return <HeaderSectionComponent section={section as HeaderSection} isPreview={isPreview} />;
    case 'hero':
      return <HeroSectionComponent section={section as HeroSection} isPreview={isPreview} />;
    case 'features':
      return <FeaturesSectionComponent section={section as FeaturesSection} isPreview={isPreview} />;
    case 'about':
      return <AboutSectionComponent section={section as AboutSection} isPreview={isPreview} />;
    case 'footer':
      return <FooterSectionComponent section={section as FooterSection} isPreview={isPreview} />;
    default:
      return null;
  }
}
