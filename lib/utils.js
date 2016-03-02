/* @flow */

/**
 * Check if `given` element is an input or textarea form element.
 */

export function isInput(element: HTMLElement): boolean {
  if (!element) {
    return false;
  }

  const {tagName} = element;

  return tagName === 'INPUT' || tagName === 'TEXTAREA';
}
