'use client';

import { Section } from '@/types/section';
import SectionRenderer from './section-renderer';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';

interface PreviewAreaProps {
  sections: Section[];
  isPreviewMode: boolean;
  onTogglePreview: () => void;
}

export default function PreviewArea({ sections, isPreviewMode }: PreviewAreaProps) {
  const visibleSections = sections.filter(section => section.isVisible);

  return (
    <div className="h-full w-full flex flex-col bg-gray-50">
      <div className="bg-background border-b border-gray-200 px-4 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Eye className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Preview
            </h2>
            <div className="text-sm text-muted-foreground">
              {visibleSections.length} section{visibleSections.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {visibleSections.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No sections yet</h3>
              <p className="text-gray-600 mb-4">Add sections from the library to start building your website</p>
              <div className="text-sm text-gray-500">
                Click on the Library tab to get started
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-full">
            <AnimatePresence mode="popLayout">
              {visibleSections
                .sort((a, b) => a.order - b.order)
                .map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    layout
                  >
                    <SectionRenderer section={section} isPreview={isPreviewMode} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
