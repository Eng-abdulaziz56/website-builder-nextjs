'use client';

import { FooterSection } from '@/types/section';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail } from 'lucide-react';

interface FooterSectionProps {
  section: FooterSection;
  isPreview?: boolean;
}

const socialIconMap = {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
};

export default function FooterSectionComponent({ section }: FooterSectionProps) {
  const { props } = section;

  return (
    <footer className={`${props.backgroundColor} ${props.textColor} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{props.companyName}</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              {props.description}
            </p>

            {props.socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {props.socialLinks.map((social, index) => {
                  const IconComponent = socialIconMap[social.platform as keyof typeof socialIconMap] || Mail;

                  return (
                    <a
                      key={index}
                      href={social.url}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {props.links.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {props.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-300">
              <p>Email: info@company.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Riyadh, Saudi Arabia</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 {props.companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
