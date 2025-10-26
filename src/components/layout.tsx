'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Menu,
  Eye,
  Settings
} from 'lucide-react';
import useBuilderStore from '@/store/builder-store';
import SectionLibrary from './section-library';
import SectionList from './section-list/section-list';
import PreviewArea from './preview-area';
import SectionEditor from './section-editor';
import ImportExport from './import-export';
import ThemeToggle from './theme-toggle';


export default function Layout() {
  const [activeTab, setActiveTab] = useState('library');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSectionEditor, setShowSectionEditor] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const {
    sections,
    selectedSectionId,
    isPreviewMode,
    addSection,
    selectSection,
    updateSection,
    deleteSection,
    reorderSections,
    togglePreviewMode,
    toggleSectionVisibility,
    exportWebsite,
    importWebsite,
    clearWebsite,
    getSectionById,
  } = useBuilderStore();

  const selectedSection = selectedSectionId ? getSectionById(selectedSectionId) : null;

  const handleAddSection = (sectionType: string) => {
    const defaultSections = {
      header: {
        type: 'header' as const,
        isVisible: true,
        props: {
          logoText: 'Logo',
          navigation: [
            { label: 'Home', href: '#' },
            { label: 'About', href: '#' },
            { label: 'Contact', href: '#' },
          ],
          backgroundColor: 'bg-white',
          textColor: 'text-gray-900',
        },
      },
      hero: {
        type: 'hero' as const,
        isVisible: true,
        props: {
          title: 'Welcome to Our Website',
          subtitle: 'Build amazing websites with ease',
          backgroundColor: 'bg-gradient-to-r from-blue-500 to-purple-600',
          textColor: 'text-white',
          buttonText: 'Get Started',
          buttonHref: '#',
          alignment: 'center' as const,
        },
      },
      features: {
        type: 'features' as const,
        isVisible: true,
        props: {
          title: 'Our Features',
          subtitle: 'What makes us special',
          features: [
            { title: 'Feature 1', description: 'Description for feature 1' },
            { title: 'Feature 2', description: 'Description for feature 2' },
            { title: 'Feature 3', description: 'Description for feature 3' },
          ],
          backgroundColor: 'bg-gray-50',
          textColor: 'text-gray-900',
        },
      },
      about: {
        type: 'about' as const,
        isVisible: true,
        props: {
          title: 'About Us',
          content: 'We are a team of passionate developers...',
          backgroundColor: 'bg-white',
          textColor: 'text-gray-900',
        },
      },
      footer: {
        type: 'footer' as const,
        isVisible: true,
        props: {
          companyName: 'Your Company',
          description: 'Building amazing websites',
          links: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
          ],
          socialLinks: [
            { platform: 'Twitter', url: '#' },
            { platform: 'Linkedin', url: '#' },
          ],
          backgroundColor: 'bg-gray-900',
          textColor: 'text-white',
        },
      },
    };

    const sectionData = defaultSections[sectionType as keyof typeof defaultSections];
    if (sectionData) {
      addSection(sectionData);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="bg-background border-b border-border px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">
              Website Builder
            </h1>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {sections.length} sections
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden sm:flex text-foreground items-center space-x-2"
          >
            <Menu className="h-4 w-4" />
            <span>{isSidebarOpen ? 'Hide' : 'Show'} Sidebar</span>
          </Button>

          <ThemeToggle />

          <Button
            variant="outline"
            size="sm"
            onClick={togglePreviewMode}
            className="hidden sm:flex text-foreground items-center space-x-2"
          >
            {isPreviewMode ? (
              <>
                <Settings className="h-4 w-4" />
                <span>Edit Mode</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                <span>Preview Mode</span>
              </>
            )}
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="sm:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetTitle className="sr-only">Mobile Builder Tools</SheetTitle>
              <div className="space-y-4 mt-10 h-full flex flex-col">
                <div className="flex items-center justify-between mx-2">
                  <h2 className="text-lg font-semibold text-foreground">Builder Tools</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={togglePreviewMode}
                    className="flex items-center space-x-2 text-foreground"
                  >
                    {isPreviewMode ? (
                      <>
                        <Settings className="h-4 w-4" />
                        <span>Edit</span>
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4" />
                        <span>Preview</span>
                      </>
                    )}
                  </Button>
                </div>

                <Tabs className='flex-1 flex flex-col min-h-0' value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-11/12 mx-auto grid-cols-2">
                    <TabsTrigger value="library">Library</TabsTrigger>
                    <TabsTrigger value="sections">Sections</TabsTrigger>
                  </TabsList>

                  <TabsContent value="library" className="mt-4 flex-1 overflow-y-auto">
                    <SectionLibrary onAddSection={handleAddSection} />
                  </TabsContent>

                  <TabsContent value="sections" className="mt-4 flex-1 overflow-y-auto pb-6 min-h-0">
                    <SectionList
                      sections={sections}
                      selectedSectionId={selectedSectionId}
                      onSelectSection={selectSection}
                      onReorderSections={reorderSections}
                      onToggleVisibility={toggleSectionVisibility}
                      onDeleteSection={deleteSection}
                      onEditSection={(id) => {
                        selectSection(id);
                        setShowSectionEditor(true);
                      }}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        {isSidebarOpen && !isPreviewMode && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden sm:flex border-r border-border bg-background flex-col h-full"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col h-full">
              <TabsList className="grid w-11/12 mx-auto grid-cols-2 my-4">
                <TabsTrigger
                  value="library"
                >
                  Library
                </TabsTrigger>
                <TabsTrigger
                  value="sections"
                >
                  Sections
                </TabsTrigger>
              </TabsList>

              <TabsContent value="library" className="flex-1 overflow-y-auto">
                <SectionLibrary onAddSection={handleAddSection} />
              </TabsContent>

              <TabsContent value="sections" className="flex-1 overflow-y-auto">
                <SectionList
                  sections={sections}
                  selectedSectionId={selectedSectionId}
                  onSelectSection={selectSection}
                  onReorderSections={reorderSections}
                  onToggleVisibility={toggleSectionVisibility}
                  onDeleteSection={deleteSection}
                  onEditSection={(id) => {
                    selectSection(id);
                    setShowSectionEditor(true);
                  }}
                />
              </TabsContent>
            </Tabs>
          </motion.div>
        )}

        <div className="flex-1 flex">
          <PreviewArea
            sections={sections}
            isPreviewMode={isPreviewMode}
            onTogglePreview={togglePreviewMode}
          />
        </div>

      </div>

      {!isPreviewMode && (true || !isSidebarOpen) && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          {!isSidebarOpen && (
            <Button
              onClick={() => setIsSidebarOpen(true)}
              className="shadow-lg"
              size="lg"
            >
              <Menu className="h-4 w-4 mr-2" />
              Show Sidebar
            </Button>
          )}

          {true && (
            <div className="bg-background border border-border rounded-lg shadow-lg p-3">
              <ImportExport
                onExport={exportWebsite}
                onImport={importWebsite}
                onClear={clearWebsite}
                sectionsCount={sections.length}
                compact={true}
              />
            </div>
          )}

          {selectedSection && (
            <Button
              onClick={() => setShowSectionEditor(!showSectionEditor)}
              className="shadow-lg"
              size="lg"
            >
              <Settings className="h-4 w-4 mr-2" />
              Edit Section
            </Button>
          )}
        </div>
      )}

      <Dialog open={showSectionEditor && !!selectedSection} onOpenChange={setShowSectionEditor}>
        <DialogContent className="max-w-4xl max-h-[80vh] p-0">
          <DialogTitle className="sr-only">
            Edit Section - {selectedSection?.type || 'Section'}
          </DialogTitle>
          {selectedSection && (
            <SectionEditor
              section={selectedSection}
              onUpdateSection={updateSection}
              onClose={() => setShowSectionEditor(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Toaster position="top-right" />
    </div>
  );
}
