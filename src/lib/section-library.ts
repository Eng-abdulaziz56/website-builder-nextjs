import { SectionLibraryItem } from '@/types/section';

export const SECTION_LIBRARY: SectionLibraryItem[] = [
  {
    id: 'header-1',
    type: 'header',
    name: 'Header',
    description: 'Navigation header with logo and menu',
    icon: 'Navigation',
    preview: 'bg-white border-b p-2 flex items-center justify-between',
    category: 'navigation',
  },
  {
    id: 'hero-1',
    type: 'hero',
    name: 'Hero Section',
    description: 'Eye-catching hero with title and CTA',
    icon: 'Zap',
    preview: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 text-center',
    category: 'marketing',
  },
  {
    id: 'features-1',
    type: 'features',
    name: 'Features Grid',
    description: 'Showcase your key features',
    icon: 'Grid3X3',
    preview: 'bg-gray-50 p-2',
    category: 'content',
  },
  {
    id: 'about-1',
    type: 'about',
    name: 'About Section',
    description: 'Tell your story and mission',
    icon: 'Users',
    preview: 'bg-white p-2',
    category: 'content',
  },
  {
    id: 'footer-1',
    type: 'footer',
    name: 'Footer',
    description: 'Site footer with links and info',
    icon: 'Square',
    preview: 'bg-gray-900 text-white p-2',
    category: 'layout',
  },
];

export const getSectionLibraryByCategory = (category: SectionLibraryItem['category']) => {
  return SECTION_LIBRARY.filter(section => section.category === category);
};
