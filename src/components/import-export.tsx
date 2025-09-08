'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Upload, FileText, Trash2 } from 'lucide-react';
import { WebsiteExport } from '@/types/section';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ImportExportProps {
  onExport: (name: string, description: string) => WebsiteExport;
  onImport: (data: WebsiteExport) => void;
  onClear: () => void;
  sectionsCount: number;
  compact?: boolean;
}

export default function ImportExport({ onExport, onImport, onClear, sectionsCount, compact = false }: ImportExportProps) {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [exportName, setExportName] = useState('');
  const [exportDescription, setExportDescription] = useState('');
  const [importData, setImportData] = useState('');
  const [importFile, setImportFile] = useState<File | null>(null);

  const handleExport = () => {
    if (!exportName.trim()) {
      toast.error('Please enter a name for your website');
      return;
    }

    try {
      const exportData = onExport(exportName.trim(), exportDescription.trim());
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${exportName.replace(/\s+/g, '-').toLowerCase()}-website.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Website exported successfully!');
      setIsExportOpen(false);
      setExportName('');
      setExportDescription('');
    } catch (error) {
      toast.error('Failed to export website');
      console.error('Export error:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/json') {
        toast.error('Please select a JSON file');
        return;
      }
      setImportFile(file);
      setImportData(''); 
    }
  };

  const handleImport = () => {
    if (!importData.trim() && !importFile) {
      toast.error('Please select a JSON file or paste the website data');
      return;
    }

    const processImport = (data: string) => {
      try {
        const parsedData = JSON.parse(data) as WebsiteExport;
        
        if (!parsedData.sections || !Array.isArray(parsedData.sections)) {
          throw new Error('Invalid website data format');
        }

        onImport(parsedData);
        toast.success('Website imported successfully!');
        setIsImportOpen(false);
        setImportData('');
        setImportFile(null);
      } catch (error) {
        toast.error('Failed to import website. Please check the data format.');
        console.error('Import error:', error);
      }
    };

    if (importFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        processImport(content);
      };
      reader.readAsText(importFile);
    } else {
      processImport(importData);
    }
  };

  const handleClear = () => {
    if (sectionsCount === 0) {
      toast.error('No sections to clear');
      return;
    }

    if (window.confirm('Are you sure you want to clear all sections? This action cannot be undone.')) {
      onClear();
      toast.success('All sections cleared');
    }
  };

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{sectionsCount} sections</span>
          <Badge variant="secondary" className="text-xs">
            {sectionsCount === 0 ? 'Empty' : 'Active'}
          </Badge>
        </div>
        
        <div className="flex gap-1">
          <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={sectionsCount === 0}
                className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed text-foreground"
              >
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Website</DialogTitle>
                <DialogDescription>
                  Save your website configuration as a JSON file
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="exportName">Website Name</Label>
                  <Input
                    id="exportName"
                    value={exportName}
                    onChange={(e) => setExportName(e.target.value)}
                    placeholder="My Website"
                  />
                </div>
                <div>
                  <Label htmlFor="exportDescription">Description</Label>
                  <Textarea
                    id="exportDescription"
                    value={exportDescription}
                    onChange={(e) => setExportDescription(e.target.value)}
                    placeholder="Brief description of your website"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsExportOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleExport} disabled={!exportName.trim()}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 text-foreground">
                <Upload className="h-3 w-3 mr-1" />
                Import
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Website</DialogTitle>
                <DialogDescription>
                  Load a website configuration from a JSON file
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="importFile">JSON File</Label>
                  <Input
                    id="importFile"
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    className="mb-2"
                  />
                  {importFile && (
                    <p className="text-sm text-green-600">
                      Selected: {importFile.name}
                    </p>
                  )}
                </div>
                <div className="text-center text-muted-foreground text-sm">OR</div>
                <div>
                  <Label htmlFor="importData">Paste JSON Data</Label>
                  <Textarea
                    id="importData"
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    placeholder="Paste your JSON data here..."
                    rows={4}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsImportOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleImport} disabled={!importData.trim() && !importFile}>
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button 
            variant="destructive" 
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleClear}
            disabled={sectionsCount === 0}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-foreground">
              Website Data
            </span>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Manage your website configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Sections</p>
              <p className="text-2xl font-bold">{sectionsCount}</p>
            </div>
            <Badge variant="secondary">
              {sectionsCount === 0 ? 'Empty' : 'Active'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  disabled={sectionsCount === 0}
                  className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Export Website</DialogTitle>
                  <DialogDescription>
                    Save your website configuration as a JSON file
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="export-name">Website Name</Label>
                    <Input
                      id="export-name"
                      value={exportName}
                      onChange={(e) => setExportName(e.target.value)}
                      placeholder="My Awesome Website"
                    />
                  </div>
                  <div>
                    <Label htmlFor="export-description">Description (Optional)</Label>
                    <Textarea
                      id="export-description"
                      value={exportDescription}
                      onChange={(e) => setExportDescription(e.target.value)}
                      placeholder="A brief description of your website"
                      rows={3}
                    />
                  </div>
                  <Button onClick={handleExport} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download JSON
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import Website</DialogTitle>
                  <DialogDescription>
                    Load a website configuration from a JSON file
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="import-file">JSON File</Label>
                    <Input
                      id="import-file"
                      type="file"
                      accept=".json"
                      onChange={handleFileChange}
                      className="mb-2"
                    />
                    {importFile && (
                      <p className="text-sm text-green-600">
                        Selected: {importFile.name}
                      </p>
                    )}
                  </div>
                  <div className="text-center text-muted-foreground text-sm">OR</div>
                  <div>
                    <Label htmlFor="import-data">Paste JSON Data</Label>
                    <Textarea
                      id="import-data"
                      value={importData}
                      onChange={(e) => setImportData(e.target.value)}
                      placeholder="Paste your website JSON data here..."
                      rows={6}
                      className="font-mono text-sm"
                    />
                  </div>
                  <Button onClick={handleImport} className="w-full" disabled={!importData.trim() && !importFile}>
                    <Upload className="h-4 w-4 mr-2" />
                    Import Website
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              variant="destructive" 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={handleClear}
              disabled={sectionsCount === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Quick Tips</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Export your work regularly to avoid losing progress</p>
                <p>• Import/Export files are compatible across devices</p>
                <p>• You can share your designs with others via JSON files</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
