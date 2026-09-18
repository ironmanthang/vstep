import { describe, it, expect } from 'vitest';
import { isValidElement, type ReactElement } from 'react';
import { renderInlineMarkdown } from './inlineMarkdown';

describe('renderInlineMarkdown tokenizer', () => {
  it('returns plain text when no markdown or insertion tokens exist', () => {
    const result = renderInlineMarkdown('A simple sentence without special tokens.');
    expect(result).toEqual(['A simple sentence without special tokens.']);
  });

  it('correctly tokenizes **bold** tokens into <strong> elements', () => {
    const result = renderInlineMarkdown('The male calls with **a resonant hoot** in spring.');
    expect(result).toHaveLength(3);
    expect(result[0]).toBe('The male calls with ');

    const strongEl = result[1] as ReactElement<{ children: string }>;
    expect(isValidElement(strongEl)).toBe(true);
    expect(strongEl.type).toBe('strong');
    expect(strongEl.props.children).toBe('a resonant hoot');

    expect(result[2]).toBe(' in spring.');
  });

  it('supports multiple bold tokens in one string', () => {
    const result = renderInlineMarkdown('Both **they** and **precious charges** are bold.');
    const strongs = result.filter(
      (node): node is ReactElement<{ children: string }> =>
        isValidElement(node) && node.type === 'strong'
    );
    expect(strongs).toHaveLength(2);
    expect(strongs[0].props.children).toBe('they');
    expect(strongs[1].props.children).toBe('precious charges');
  });

  it('parses [A]-[D] insertion markers when enableInsertionMarkers is true', () => {
    const result = renderInlineMarkdown('Sentence one. [A] Sentence two. [B]', true);
    const markers = result.filter(
      (node): node is ReactElement<{ 'data-marker': string; className: string; children: string }> =>
        isValidElement(node) && node.type === 'span'
    );
    expect(markers).toHaveLength(2);
    expect(markers[0].props['data-marker']).toBe('A');
    expect(markers[0].props.className).toBe('insertion-point-marker');
    expect(markers[0].props.children).toBe('[A]');
    expect(markers[1].props['data-marker']).toBe('B');
  });

  it('ignores [A]-[D] markers when enableInsertionMarkers is false', () => {
    const result = renderInlineMarkdown('Where would [A] fit best?', false);
    expect(result).toEqual(['Where would [A] fit best?']);
  });

  it('handles interleaved bold and insertion markers seamlessly', () => {
    const result = renderInlineMarkdown('[A] Owls protect their **precious charges** from cold. [B]', true);
    expect(result).toHaveLength(7);
    const spanA = result[1] as ReactElement<{ 'data-marker': string }>;
    expect(spanA.props['data-marker']).toBe('A');

    const strong = result[3] as ReactElement<{ children: string }>;
    expect(strong.type).toBe('strong');
    expect(strong.props.children).toBe('precious charges');

    const spanB = result[5] as ReactElement<{ 'data-marker': string }>;
    expect(spanB.props['data-marker']).toBe('B');
  });
});
