'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSectionLibraryByCategory } from '@/lib/section-library';
import { SectionLibraryItem } from '@/types/section';
import {
  Navigation,
  Zap,
  Grid3X3,
  Users,
  Square,
  Plus,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const iconMap = {
  Navigation,
  Zap,
  Grid3X3,
  Users,
  Square,
};

interface SectionLibraryProps {
  onAddSection: (sectionType: SectionLibraryItem['type']) => void;
}

export default function SectionLibrary({ onAddSection }: SectionLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SectionLibraryItem['category']>('layout');

  const categories = [
    { id: 'layout', label: 'Layout' },
    { id: 'content', label: 'Content' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'navigation', label: 'Navigation' },
  ];

  const filteredSections = getSectionLibraryByCategory(selectedCategory).filter(section =>
    section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSection = (sectionType: SectionLibraryItem['type']) => {
    onAddSection(sectionType);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border bg-muted/50">
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Section Library
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search sections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as SectionLibraryItem['category'])} className="flex-1 flex flex-col">
        <TabsList className="grid w-11/12 mx-auto grid-cols-4 my-4">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="text-xs"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="flex-1 p-4 space-y-3 overflow-y-auto">
          {filteredSections.map((section) => {
            const IconComponent = iconMap[section.icon as keyof typeof iconMap] || Plus;

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-md transition-all duration-200"
                  onClick={() => handleAddSection(section.type)}
                >
                  <CardHeader >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-sm font-medium">
                            {section.name}
                          </CardTitle>
                          <CardDescription className="text-xs text-muted-foreground">
                            {section.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}

          {filteredSections.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No sections found matching &quot;{searchQuery}&quot;</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
