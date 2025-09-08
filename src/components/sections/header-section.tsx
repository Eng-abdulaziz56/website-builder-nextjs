'use client';

import { HeaderSection } from '@/types/section';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface HeaderSectionProps {
  section: HeaderSection;
  isPreview?: boolean;
}

export default function HeaderSectionComponent({ section }: HeaderSectionProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { props } = section;

  return (
    <header className={`${props.backgroundColor} ${props.textColor} border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            {props.logo ? (
              <Image
                className="h-8 w-auto"
                src={props.logo}
                alt={props.logoText}
                width={32}
                height={32}
                unoptimized
              />
            ) : (
              <span className="text-xl font-bold">{props.logoText}</span>
            )}
          </div>

          <nav className="hidden md:flex space-x-8">
            {props.navigation.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {props.navigation.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
