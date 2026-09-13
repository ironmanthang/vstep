import { describe, it, expect } from 'vitest';
import {
  VSTEP_CORPUS,
  EDUCATION_FLASHCARDS,
  WORK_FLASHCARDS,
  HEALTH_FLASHCARDS,
  ENVIRONMENT_FLASHCARDS,
  TECHNOLOGY_FLASHCARDS,
  TRAVEL_FLASHCARDS,
  SOCIETY_FLASHCARDS,
  MEDIA_FLASHCARDS
} from './index';

describe('VSTEP Flashcard Corpus Integrity', () => {
  it('should contain exactly 3,000 cards in the master corpus', () => {
    expect(VSTEP_CORPUS.length).toBe(3000);
  });

  it('should have exact expected word counts per topic file', () => {
    expect(EDUCATION_FLASHCARDS.length).toBe(350);
    expect(WORK_FLASHCARDS.length).toBe(380);
    expect(HEALTH_FLASHCARDS.length).toBe(380);
    expect(ENVIRONMENT_FLASHCARDS.length).toBe(400);
    expect(TECHNOLOGY_FLASHCARDS.length).toBe(340);
    expect(TRAVEL_FLASHCARDS.length).toBe(350);
    expect(SOCIETY_FLASHCARDS.length).toBe(450);
    expect(MEDIA_FLASHCARDS.length).toBe(350);
  });

  it('should have unique IDs across all 3,000 cards', () => {
    const idSet = new Set(VSTEP_CORPUS.map((c) => c.id));
    expect(idSet.size).toBe(3000);
  });

  it('should have unique words across all 3,000 cards', () => {
    const wordSet = new Set(VSTEP_CORPUS.map((c) => c.word.toLowerCase().trim()));
    expect(wordSet.size).toBe(3000);
  });

  it('should validate every card against the FlashcardItem schema requirements', () => {
    const validLevels = new Set(['B1', 'B2', 'C1']);
    const validPos = new Set(['noun', 'verb', 'adjective', 'adverb', 'phrase']);

    for (const card of VSTEP_CORPUS) {
      expect(card.id).toBeTruthy();
      expect(card.topic).toBeTruthy();
      expect(validLevels.has(card.level)).toBe(true);
      expect(validPos.has(card.part_of_speech)).toBe(true);
      expect(card.word.trim().length).toBeGreaterThan(0);
      expect(card.phonetic.trim().length).toBeGreaterThan(0);
      expect(card.definition_vi.trim().length).toBeGreaterThan(0);
      expect(card.example_sentence_en.trim().length).toBeGreaterThan(0);
      expect(card.example_sentence_vi.trim().length).toBeGreaterThan(0);
      expect(Array.isArray(card.collocations)).toBe(true);
      expect(card.collocations.length).toBeGreaterThanOrEqual(2);
      expect(card.srs_metadata).toBeDefined();
      expect(card.srs_metadata.stability).toBe(0);
      expect(card.srs_metadata.difficulty).toBe(0);
      expect(card.srs_metadata.reps).toBe(0);
      expect(card.srs_metadata.lapses).toBe(0);
      expect(card.srs_metadata.state).toBe(0);
    }
  });
});
