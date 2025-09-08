'use client';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { GripVertical } from 'lucide-react';
import SortableSectionItem from './sortable-section-item';
import { SectionListProps } from './types';


export default function SectionList({
  sections,
  selectedSectionId,
  onSelectSection,
  onReorderSections,
  onToggleVisibility,
  onDeleteSection,
  onEditSection,
}: SectionListProps) {

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((section) => section.id === active.id);
      const newIndex = sections.findIndex((section) => section.id === over?.id);

      onReorderSections(oldIndex, newIndex);
    }
  };

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border bg-muted/50">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Sections
        </h2>
        <p className="text-sm text-muted-foreground">
          Drag to reorder, click to edit
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {sortedSections.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <GripVertical className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No sections added yet</h3>
            <p className="text-sm text-muted-foreground">Add sections from the library to start building</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sortedSections.map(section => section.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3 mb-2.5">
                {sortedSections.map((section) => (
                  <SortableSectionItem
                    key={section.id}
                    section={section}
                    isSelected={selectedSectionId === section.id}
                    onSelect={onSelectSection}
                    onToggleVisibility={onToggleVisibility}
                    onDelete={onDeleteSection}
                    onEditSection={onEditSection}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
