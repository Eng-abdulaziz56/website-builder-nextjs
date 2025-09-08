// Base section interface
export interface BaseSection {
  id: string;
  type: string;
  order: number;
  isVisible: boolean;
}

// Section type union
export type SectionType = 'header' | 'hero' | 'features' | 'about' | 'footer';

// Navigation link interface
export interface NavigationLink {
  label: string;
  href: string;
}

// Feature item interface
export interface FeatureItem {
  icon?: string;
  title: string;
  description: string;
}

// Social link interface
export interface SocialLink {
  platform: string;
  url: string;
}

// Section-specific prop interfaces
export interface HeaderSectionProps {
  logo?: string;
  logoText: string;
  navigation: NavigationLink[];
  backgroundColor: string;
  textColor: string;
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  backgroundColor: string;
  textColor: string;
  buttonText: string;
  buttonHref: string;
  alignment: 'left' | 'center' | 'right';
}

export interface FeaturesSectionProps {
  title: string;
  subtitle: string;
  features: FeatureItem[];
  backgroundColor: string;
  textColor: string;
}

export interface AboutSectionProps {
  title: string;
  content: string;
  image?: string;
  backgroundColor: string;
  textColor: string;
}

export interface FooterSectionProps {
  companyName: string;
  description: string;
  links: NavigationLink[];
  socialLinks: SocialLink[];
  backgroundColor: string;
  textColor: string;
}

// Main section interface
export interface Section extends BaseSection {
  type: SectionType;
  props: HeaderSectionProps | HeroSectionProps | FeaturesSectionProps | AboutSectionProps | FooterSectionProps;
}

// Specific section types
export interface HeaderSection extends BaseSection {
  type: 'header';
  props: HeaderSectionProps;
}

export interface HeroSection extends BaseSection {
  type: 'hero';
  props: HeroSectionProps;
}

export interface FeaturesSection extends BaseSection {
  type: 'features';
  props: FeaturesSectionProps;
}

export interface AboutSection extends BaseSection {
  type: 'about';
  props: AboutSectionProps;
}

export interface FooterSection extends BaseSection {
  type: 'footer';
  props: FooterSectionProps;
}


export interface SectionLibraryItem {
  id: string;
  type: Section['type'];
  name: string;
  description: string;
  icon: string;
  preview: string;
  category: 'layout' | 'content' | 'marketing' | 'navigation';
}


export interface BuilderState {
  sections: Section[];
  selectedSectionId: string | null;
  isPreviewMode: boolean;
  theme: 'light' | 'dark';
}


export interface WebsiteExport {
  version: string;
  name: string;
  description: string;
  sections: Section[];
  createdAt: string;
  updatedAt: string;
}
