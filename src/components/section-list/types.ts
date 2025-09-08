import { Section } from '@/types/section';

export interface SectionListProps {
  sections: Section[];
  selectedSectionId: string | null;
  onSelectSection: (id: string) => void;
  onReorderSections: (fromIndex: number, toIndex: number) => void;
  onToggleVisibility: (id: string) => void;
  onDeleteSection: (id: string) => void;
  onEditSection?: (id: string) => void;
}

export interface SortableSectionItemProps {
  section: Section;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onDelete: (id: string) => void;
  onEditSection?: (id: string) => void;
}
