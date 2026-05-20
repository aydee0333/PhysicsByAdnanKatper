import type { ChapterContent, ContentBlock, Section } from './types';

/**
 * Filter sections by block type
 */
export function getSectionsWithBlock(
  chapter: ChapterContent,
  blockType: ContentBlock['type']
): Section[] {
  return chapter.sections.filter(s => s.blocks.some(b => b.type === blockType));
}

/**
 * Get all blocks of a specific type from a chapter
 */
export function getBlocks<T extends ContentBlock>(
  chapter: ChapterContent,
  blockType: T['type']
): T[] {
  return chapter.sections.flatMap(s =>
    s.blocks.filter((b): b is T => b.type === blockType)
  );
}

/**
 * Get a section by its ID
 */
export function getSection(chapter: ChapterContent, sectionId: string): Section | undefined {
  return chapter.sections.find(s => s.id === sectionId);
}

/**
 * Get all section IDs from a chapter (for progress tracking)
 */
export function getSectionIds(chapter: ChapterContent): string[] {
  return chapter.sections.map(s => s.id);
}

/**
 * Total section count (for progress percentage)
 */
export function getSectionCount(chapter: ChapterContent): number {
  return chapter.sections.length;
}

/**
 * Format a chapter ID from a unit number
 */
export function formatChapterId(unitNumber: string): string {
  return `chapter-${unitNumber.padStart(2, '0')}`;
}

/**
 * Get class ID from route path
 */
export function classIdFromPath(pathname: string): string {
  return pathname.includes('/class-x/') ? 'class-x' : 'class-ix';
}
