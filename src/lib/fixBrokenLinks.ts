/**
 * Fixes broken anchor tags where the last characters of the linked text
 * were accidentally left outside the <a> tag.
 *
 * Handles both mailto: and regular href links.
 *
 * Example broken HTML:
 *   <a href="mailto:user@example.com">user@example.co</a>m
 *
 * Fixed:
 *   <a href="mailto:user@example.com">user@example.com</a>
 */
export function fixBrokenLinks(html: string): string {
  // Match <a ...href="..."...>TEXT</a>TRAILING where TRAILING is non-space, non-tag chars
  return html.replace(
    /(<a\b[^>]*href="([^"]*)"[^>]*>)([\s\S]*?)(<\/a>)([^<\s]*)/gi,
    (match, openTag, href, innerText, closeTag, trailing) => {
      if (!trailing) return match

      const target = href.startsWith('mailto:') ? href.slice('mailto:'.length) : href
      const combined = innerText + trailing

      // If the inner text + trailing characters form the full link target, fix it
      if (
        combined.toLowerCase() === target.toLowerCase() ||
        target.toLowerCase().endsWith(trailing.toLowerCase())
      ) {
        return `${openTag}${combined}${closeTag}`
      }

      return match
    }
  )
}
