import { describe, it, expect } from 'vitest';
import { lookupDictionary, DICTIONARY_VI } from './dictionaryVi';

describe('Bilingual Dictionary & Lemmatizer (Reading Studio)', () => {
  it('contains essential academic and general vocabulary entries', () => {
    expect(DICTIONARY_VI['raise']).toBeDefined();
    expect(DICTIONARY_VI['hand']).toBeDefined();
    expect(DICTIONARY_VI['owl']).toBeDefined();
    expect(DICTIONARY_VI['curriculum']).toBeDefined();
    expect(DICTIONARY_VI['sedentary']).toBeDefined();
  });

  it('provides general, unbiased lexicographical senses for polysemous words', () => {
    const raiseResult = lookupDictionary('raise');
    expect(raiseResult).not.toBeNull();
    expect(raiseResult?.entry.p).toBe('/reiz/');

    const verbSense = raiseResult?.entry.m.find((m) => m.pos === 'động từ');
    expect(verbSense).toBeDefined();
    expect(verbSense?.def.length).toBeGreaterThanOrEqual(1);

    // Verify absence of topic-biased flashcard string
    const allDefs = raiseResult?.entry.m.flatMap((m) => m.def).join(' ') || '';
    expect(allDefs).not.toContain('chăm sóc sức khỏe');
    expect(allDefs.toLowerCase()).toContain('nâng lên');
  });

  it('unbiases "hand" from sanitary/hygiene deck bias', () => {
    const handResult = lookupDictionary('hand');
    expect(handResult).not.toBeNull();
    expect(handResult?.entry.p).toBe('/hænd/');

    const allDefs = handResult?.entry.m.flatMap((m) => m.def).join(' ') || '';
    expect(allDefs).not.toContain('vệ sinh phòng bệnh');
    expect(allDefs.toLowerCase()).toContain('bàn tay');
  });

  it('correctly resolves inflected words via lemmatization fallback', () => {
    // Plural
    const handsResult = lookupDictionary('hands');
    expect(handsResult).not.toBeNull();
    expect(handsResult?.lemma).toBe('hand');

    // Inflected biology term
    const owletsResult = lookupDictionary('owlets');
    expect(owletsResult).not.toBeNull();
    expect(owletsResult?.lemma).toBe('owlet');

    // Irregular noun
    const childrenResult = lookupDictionary('children');
    expect(childrenResult).not.toBeNull();
    expect(childrenResult?.entry).toBeDefined();

    // Comparative
    const betterResult = lookupDictionary('better');
    expect(betterResult).not.toBeNull();
  });

  it('handles case-insensitivity and strips surrounding punctuation', () => {
    const upper = lookupDictionary('CURRICULUM');
    expect(upper).not.toBeNull();
    expect(upper?.matchedWord).toBe('curriculum');

    const punctuated = lookupDictionary('"raise,"');
    expect(punctuated).not.toBeNull();
    expect(punctuated?.matchedWord).toBe('raise');

    const parenthesized = lookupDictionary('(owl)');
    expect(parenthesized).not.toBeNull();
    expect(parenthesized?.matchedWord).toBe('owl');
  });

  it('returns null for unknown words or gibberish to allow Tier 2 fallback', () => {
    expect(lookupDictionary('xyzzyqwerty12345')).toBeNull();
    expect(lookupDictionary('')).toBeNull();
    expect(lookupDictionary('   ')).toBeNull();
  });
});
