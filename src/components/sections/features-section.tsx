'use client';

import { FeaturesSection } from '@/types/section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Star, Zap, Shield, Heart, Lightbulb } from 'lucide-react';

interface FeaturesSectionProps {
  section: FeaturesSection;
  isPreview?: boolean;
}


export default function FeaturesSectionComponent({ section }: FeaturesSectionProps) {
  const { props } = section;

  return (
    <section className={`${props.backgroundColor} ${props.textColor} py-16 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {props.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {props.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {props.features.map((feature, index) => {

            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
