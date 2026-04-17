var scrollbarWidth;
/**
 * Calculates the width of the browser's scrollbar.
 * The result is cached for subsequent calls.
 * @returns {number} The width of the scrollbar in pixels.
 */
export function useScrollbarWidth() {
    var _a;
    if (typeof window === 'undefined') {
        return 0;
    }
    if (scrollbarWidth !== undefined) {
        return scrollbarWidth;
    }
    // Create a temporary div
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    document.body.appendChild(outer);
    var widthNoScroll = outer.offsetWidth;
    // Force scrollbars
    outer.style.overflow = 'scroll';
    // Add inner div
    var inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);
    var widthWithScroll = inner.offsetWidth;
    // Remove the temporary divs
    (_a = outer.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(outer);
    scrollbarWidth = widthNoScroll - widthWithScroll;
    return scrollbarWidth;
}
