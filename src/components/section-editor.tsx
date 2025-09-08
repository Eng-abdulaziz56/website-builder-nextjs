'use client';

import { useState, useEffect } from 'react';
import { Section, HeaderSectionProps, HeroSectionProps, FeaturesSectionProps, AboutSectionProps, FooterSectionProps } from '@/types/section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Save } from 'lucide-react';

interface SectionEditorProps {
  section: Section | null;
  onUpdateSection: (id: string, updates: Partial<Section>) => void;
  onClose: () => void;
}

export default function SectionEditor({ section, onUpdateSection, onClose }: SectionEditorProps) {
  const [activeTab, setActiveTab] = useState('content');
  const [formData, setFormData] = useState<Section | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (section) {
      setFormData(section);
      setIsDirty(false);
    }
  }, [section]);

  const updateFormData = (updates: Partial<Section>) => {
    setFormData((prev) => prev ? ({ ...prev, ...updates }) : null);
    setIsDirty(true);
  };

  const onSubmit = () => {
    if (section && formData) {
      onUpdateSection(section.id, formData);
      setIsDirty(false);
      onClose();
    }
  };

  if (!section || !formData) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Save className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No section selected</h3>
          <p className="text-muted-foreground">Select a section to edit its properties</p>
        </div>
      </div>
    );
  }

  // Type guards for section props
  const isHeaderSection = (section: Section): section is Section & { props: HeaderSectionProps } => {
    return section.type === 'header';
  };

  const isHeroSection = (section: Section): section is Section & { props: HeroSectionProps } => {
    return section.type === 'hero';
  };

  const isFeaturesSection = (section: Section): section is Section & { props: FeaturesSectionProps } => {
    return section.type === 'features';
  };

  const isAboutSection = (section: Section): section is Section & { props: AboutSectionProps } => {
    return section.type === 'about';
  };

  const isFooterSection = (section: Section): section is Section & { props: FooterSectionProps } => {
    return section.type === 'footer';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border bg-muted/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Edit Section</h2>
            <Badge variant="secondary" className="mt-1">
              {section.type}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-11/12 mx-auto grid-cols-2 mt-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="flex-1 p-4 space-y-6 overflow-y-auto">
            {isHeaderSection(formData) && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="logoText">Logo Text</Label>
                  <Input
                    id="logoText"
                    value={formData.props.logoText}
                    onChange={(e) => updateFormData({
                      props: { ...formData.props, logoText: e.target.value }
                    })}
                    placeholder="Enter logo text"
                  />
                </div>

                <div>
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    value={formData.props.logo || ''}
                    onChange={(e) => updateFormData({
                      props: { ...formData.props, logo: e.target.value }
                    })}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
              </div>
            )}

            {isHeroSection(formData) && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.props.title }
                    onChange={(e) => updateFormData({
                      props: { ...formData.props, title: e.target.value }
                    })}
                    placeholder="Enter hero title"
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Textarea
                    id="subtitle"
                    value={formData.props.subtitle }
                    onChange={(e) => updateFormData({
                      props: { ...formData.props, subtitle: e.target.value }
                    })}
                    placeholder="Enter hero subtitle"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="backgroundImage">Background Image URL</Label>
                  <Input
                    id="backgroundImage"
                    value={formData.props.backgroundImage }
                    onChange={(e) => updateFormData({
                      props: { ...formData.props, backgroundImage: e.target.value }
                    })}
                    placeholder="https://example.com/hero-bg.jpg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="buttonText">Button Text</Label>
                    <Input
                      id="buttonText"
                      value={formData.props.buttonText }
                      onChange={(e) => updateFormData({
                        props: { ...formData.props, buttonText: e.target.value }
                      })}
                      placeholder="Get Started"
                    />
                  </div>
                  <div>
                    <Label htmlFor="buttonHref">Button URL</Label>
                    <Input
                      id="buttonHref"
                      value={formData.props.buttonHref }
                      onChange={(e) => updateFormData({
                        props: { ...formData.props, buttonHref: e.target.value }
                      })}
                      placeholder="#"
                    />
                  </div>
                </div>
              </div>
            )}

            {isFeaturesSection(formData) && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Section Title</Label>
                  <Input
                    id="title"
                    value={formData.props.title }
                    onChange={(e) => updateFormData({
                      props: { ...formData.props, title: e.target.value }
                    })}
                    placeholder="Enter section title"
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle">Section Subtitle</Label>
                  <Textarea
                    id="subtitle"
                    value={formData.props.subtitle }
                    onChange={(e) => updateFormData({
                      props: { ...formData.props, subtitle: e.target.value }
                    })}
                    placeholder="Enter section subtitle"
                    rows={2}
                  />
                </div>
              </div>
            )}

            {isAboutSection(formData) && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Section Title</Label>
                  <Input
                    id="title"
                    value={formData.props.title }
                    onChange={(e) => updateFormData({
                      props: { ...formData.props, title: e.target.value }
                    })}
                    placeholder="Enter section title"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.props.content }
                    onChange={(e) => updateFormData({
                      props: { ...formData.props, content: e.target.value }
                    })}
                    placeholder="Enter about content"
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.props.image }
                    onChange={(e) => updateFormData({
                      props: { ...formData.props, image: e.target.value }
                    })}
                    placeholder="https://example.com/about-image.jpg"
                  />
                </div>
              </div>
            )}

            {isFooterSection(formData) && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.props.companyName }
                    onChange={(e) => updateFormData({
                      props: { ...formData.props, companyName: e.target.value }
                    })}
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.props.description }
                    onChange={(e) => updateFormData({
                      props: { ...formData.props, description: e.target.value }
                    })}
                    placeholder="Enter company description"
                    rows={3}
                  />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="style" className="flex-1 p-4 space-y-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium">Theme Presets</Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <Button
                    variant="outline"
                    onClick={() => updateFormData({
                      props: {
                        ...formData.props,
                        backgroundColor: 'bg-white',
                        textColor: 'text-gray-900'
                      }
                    })}
                    className="h-16 flex flex-col items-center justify-center space-y-1"
                  >
                    <div className="w-6 h-6 bg-white border border-gray-300 rounded"></div>
                    <span className="text-xs text-foreground">Light Theme</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => updateFormData({
                      props: {
                        ...formData.props,
                        backgroundColor: 'bg-gray-900',
                        textColor: 'text-white'
                      }
                    })}
                    className="h-16 flex flex-col items-center justify-center space-y-1"
                  >
                    <div className="w-6 h-6 bg-gray-900 rounded"></div>
                    <span className="text-xs text-foreground">Dark Theme</span>
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="backgroundColor">Background Color</Label>
                <Select
                  value={formData.props.backgroundColor}
                  onValueChange={(value) => updateFormData({
                    props: { ...formData.props, backgroundColor: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bg-white">White</SelectItem>
                    <SelectItem value="bg-gray-50">Light Gray</SelectItem>
                    <SelectItem value="bg-gray-100">Gray</SelectItem>
                    <SelectItem value="bg-gray-200">Medium Gray</SelectItem>
                    <SelectItem value="bg-gray-800">Dark Gray</SelectItem>
                    <SelectItem value="bg-gray-900">Black</SelectItem>
                    <SelectItem value="bg-blue-50">Light Blue</SelectItem>
                    <SelectItem value="bg-blue-100">Blue</SelectItem>
                    <SelectItem value="bg-blue-600">Dark Blue</SelectItem>
                    <SelectItem value="bg-purple-50">Light Purple</SelectItem>
                    <SelectItem value="bg-purple-100">Purple</SelectItem>
                    <SelectItem value="bg-purple-600">Dark Purple</SelectItem>
                    <SelectItem value="bg-green-50">Light Green</SelectItem>
                    <SelectItem value="bg-green-100">Green</SelectItem>
                    <SelectItem value="bg-green-600">Dark Green</SelectItem>
                    <SelectItem value="bg-red-50">Light Red</SelectItem>
                    <SelectItem value="bg-red-100">Red</SelectItem>
                    <SelectItem value="bg-red-600">Dark Red</SelectItem>
                    <SelectItem value="bg-yellow-50">Light Yellow</SelectItem>
                    <SelectItem value="bg-yellow-100">Yellow</SelectItem>
                    <SelectItem value="bg-yellow-600">Dark Yellow</SelectItem>
                    <SelectItem value="bg-gradient-to-r from-blue-500 to-purple-600">Blue to Purple Gradient</SelectItem>
                    <SelectItem value="bg-gradient-to-r from-green-400 to-blue-500">Green to Blue Gradient</SelectItem>
                    <SelectItem value="bg-gradient-to-r from-pink-500 to-red-500">Pink to Red Gradient</SelectItem>
                    <SelectItem value="bg-gradient-to-r from-yellow-400 to-orange-500">Yellow to Orange Gradient</SelectItem>
                    <SelectItem value="bg-gradient-to-r from-gray-800 to-gray-900">Dark Gradient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="textColor">Text Color</Label>
                <Select
                  value={formData.props.textColor}
                  onValueChange={(value) => updateFormData({
                    props: { ...formData.props, textColor: value }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-gray-900">Dark Gray</SelectItem>
                    <SelectItem value="text-gray-700">Medium Gray</SelectItem>
                    <SelectItem value="text-gray-600">Light Gray</SelectItem>
                    <SelectItem value="text-white">White</SelectItem>
                    <SelectItem value="text-black">Black</SelectItem>
                    <SelectItem value="text-blue-600">Blue</SelectItem>
                    <SelectItem value="text-blue-700">Dark Blue</SelectItem>
                    <SelectItem value="text-purple-600">Purple</SelectItem>
                    <SelectItem value="text-purple-700">Dark Purple</SelectItem>
                    <SelectItem value="text-green-600">Green</SelectItem>
                    <SelectItem value="text-green-700">Dark Green</SelectItem>
                    <SelectItem value="text-red-600">Red</SelectItem>
                    <SelectItem value="text-red-700">Dark Red</SelectItem>
                    <SelectItem value="text-yellow-600">Yellow</SelectItem>
                    <SelectItem value="text-yellow-700">Dark Yellow</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Preview</Label>
                <div
                  className={`p-4 rounded-lg border ${formData.props?.backgroundColor || 'bg-white'} ${formData.props?.textColor || 'text-gray-900'}`}
                >
                  <p className="text-sm">This is how your section will look with the selected colors.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="p-4 border-t border-border bg-muted/50">
          <Button
            onClick={onSubmit}
            className="w-full"
            disabled={!isDirty}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}