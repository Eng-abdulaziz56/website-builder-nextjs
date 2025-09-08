'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Section, BuilderState, WebsiteExport } from '@/types/section';
import { v4 as uuidv4 } from 'uuid';

interface BuilderStore extends BuilderState {
  
  addSection: (section: Omit<Section, 'id' | 'order'>) => void;
  updateSection: (id: string, updates: Partial<Section>) => void;
  deleteSection: (id: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  selectSection: (id: string | null) => void;
  togglePreviewMode: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleSectionVisibility: (id: string) => void;

  exportWebsite: (name: string, description: string) => WebsiteExport;
  importWebsite: (data: WebsiteExport) => void;
  clearWebsite: () => void;
  
  getSectionById: (id: string) => Section | undefined;
  getNextOrder: () => number;
}

const useBuilderStore = create<BuilderStore>()(
  devtools(
    persist(
      (set, get) => ({
        
        sections: [],
        selectedSectionId: null,
        isPreviewMode: false,
        theme: 'light',

        
        addSection: (sectionData) => {
          const newSection = {
            ...sectionData,
            id: uuidv4(),
            order: get().getNextOrder(),
          } as Section;
          
          set((state) => ({
            sections: [...state.sections, newSection].sort((a, b) => a.order - b.order),
            selectedSectionId: newSection.id,
          }));
        },

        updateSection: (id, updates) => {
          set((state) => ({
            sections: state.sections.map((section) =>
              section.id === id ? { ...section, ...updates } as Section : section
            ),
          }));
        },

        deleteSection: (id) => {
          set((state) => ({
            sections: state.sections.filter((section) => section.id !== id),
            selectedSectionId: state.selectedSectionId === id ? null : state.selectedSectionId,
          }));
        },

        reorderSections: (fromIndex, toIndex) => {
          set((state) => {
            const newSections = [...state.sections];
            const [movedSection] = newSections.splice(fromIndex, 1);
            newSections.splice(toIndex, 0, movedSection);
            
            
            const reorderedSections = newSections.map((section, index) => ({
              ...section,
              order: index,
            }));
            
            return { sections: reorderedSections };
          });
        },

        selectSection: (id) => {
          set({ selectedSectionId: id });
        },

        togglePreviewMode: () => {
          set((state) => ({ 
            isPreviewMode: !state.isPreviewMode,
            selectedSectionId: null, 
          }));
        },

        setTheme: (theme) => {
          set({ theme });
        },

        toggleSectionVisibility: (id) => {
          set((state) => ({
            sections: state.sections.map((section) =>
              section.id === id 
                ? { ...section, isVisible: !section.isVisible }
                : section
            ),
          }));
        },

        
        exportWebsite: (name, description) => {
          const now = new Date().toISOString();
          return {
            version: '1.0.0',
            name,
            description,
            sections: get().sections,
            createdAt: now,
            updatedAt: now,
          };
        },

        importWebsite: (data) => {
          set({
            sections: data.sections,
            selectedSectionId: null,
          });
        },

        clearWebsite: () => {
          set({
            sections: [],
            selectedSectionId: null,
          });
        },

        
        getSectionById: (id) => {
          return get().sections.find((section) => section.id === id);
        },

        getNextOrder: () => {
          const sections = get().sections;
          return sections.length > 0 ? Math.max(...sections.map(s => s.order)) + 1 : 0;
        },
      }),
      {
        name: 'website-builder-store',
        partialize: (state) => ({
          sections: state.sections,
          theme: state.theme,
        }),
      }
    ),
    {
      name: 'builder-store',
    }
  )
);

export default useBuilderStore;
