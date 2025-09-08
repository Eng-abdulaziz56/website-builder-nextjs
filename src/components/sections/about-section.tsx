'use client';

import { AboutSection } from '@/types/section';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface AboutSectionProps {
  section: AboutSection;
  isPreview?: boolean;
}

export default function AboutSectionComponent({ section }: AboutSectionProps) {
  const { props } = section;

  return (
    <section className={`${props.backgroundColor} ${props.textColor} py-16 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              {props.title}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {props.content}
              </p>
            </div>
          </div>
          
          {props.image && (
            <div className="relative">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-80 w-full">
                    <Image
                      src={props.image}
                      alt={props.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
