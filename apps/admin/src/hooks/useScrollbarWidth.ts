let scrollbarWidth: number | undefined;

/**
 * Calculates the width of the browser's scrollbar.
 * The result is cached for subsequent calls.
 * @returns {number} The width of the scrollbar in pixels.
 */
export function useScrollbarWidth(): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  if (scrollbarWidth !== undefined) {
    return scrollbarWidth;
  }

  // Create a temporary div
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  // Force scrollbars
  outer.style.overflow = 'scroll';

  // Add inner div
  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;

  // Remove the temporary divs
  outer.parentNode?.removeChild(outer);

  scrollbarWidth = widthNoScroll - widthWithScroll;

  return scrollbarWidth;
}

