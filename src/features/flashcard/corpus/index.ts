import type { FlashcardItem } from '../../../types/schemas';
import { EDUCATION_FLASHCARDS } from './education';
import { WORK_FLASHCARDS } from './work';
import { HEALTH_FLASHCARDS } from './health';
import { ENVIRONMENT_FLASHCARDS } from './environment';
import { TECHNOLOGY_FLASHCARDS } from './technology';
import { TRAVEL_FLASHCARDS } from './travel';
import { SOCIETY_FLASHCARDS } from './society';
import { MEDIA_FLASHCARDS } from './media';

export {
  EDUCATION_FLASHCARDS,
  WORK_FLASHCARDS,
  HEALTH_FLASHCARDS,
  ENVIRONMENT_FLASHCARDS,
  TECHNOLOGY_FLASHCARDS,
  TRAVEL_FLASHCARDS,
  SOCIETY_FLASHCARDS,
  MEDIA_FLASHCARDS
};

export const VSTEP_CORPUS: FlashcardItem[] = [
  ...EDUCATION_FLASHCARDS,
  ...WORK_FLASHCARDS,
  ...HEALTH_FLASHCARDS,
  ...ENVIRONMENT_FLASHCARDS,
  ...TECHNOLOGY_FLASHCARDS,
  ...TRAVEL_FLASHCARDS,
  ...SOCIETY_FLASHCARDS,
  ...MEDIA_FLASHCARDS
];
