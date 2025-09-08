'use client';

import { HeroSection } from '@/types/section';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  section: HeroSection;
  isPreview?: boolean;
}

export default function HeroSectionComponent({ section }: HeroSectionProps) {
  const { props } = section;

  return (
    <section 
      className={`${props.backgroundColor} ${props.textColor} py-20 px-4 sm:px-6 lg:px-8`}
      style={props.backgroundImage ? {
        backgroundImage: `url(${props.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      } : undefined}
    >
      <div className="max-w-7xl mx-auto">
        <div className={"text-center"}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {props.title}
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
            {props.subtitle}
          </p>
          <Button
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            asChild
          >
            <a href={props.buttonHref}>
              {props.buttonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
