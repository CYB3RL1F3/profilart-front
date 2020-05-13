import ReactHtmlParser from 'react-html-parser';
import sanitizeHtml from 'sanitize-html';

export const getSanitizedHtml = (html: string): string =>
  sanitizeHtml(html, {
    allowedTags: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'p',
      'a',
      'ul',
      'ol',
      'nl',
      'li',
      'b',
      'i',
      'strong',
      'em',
      'strike',
      'code',
      'hr',
      'br',
      'div',
      'table',
      'thead',
      'caption',
      'tbody',
      'tr',
      'th',
      'td',
      'pre',
      'cite',
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target', 'style']
    },
    allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
    allowedSchemes: ['http', 'https', 'ftp', 'mailto']
  });

export const parseHtml = (html: string) =>
  ReactHtmlParser(getSanitizedHtml(html));
