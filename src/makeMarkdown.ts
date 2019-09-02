import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import Marked from 'marked';

Marked.setOptions({
  sanitize: true,
  sanitizer: DOMPurify.sanitize,
});

declare const preval: any;

const hljsCSS = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(require.resolve('../node_modules/highlight.js/styles/github.css'), 'utf8')
`;

const baseCSS = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(require.resolve('../node_modules/@primer/css/dist/base.css'), 'utf8')
`;

const mdCSS = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(require.resolve('../node_modules/@primer/css/dist/markdown.css'), 'utf8')
`;

const bodyCSS = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(require.resolve('./markdown-body.css'), 'utf8')
`;

const makeMarkdown: (md: string, highlight?: boolean) => string = (
  md,
  highlight,
) => {
  if (highlight) {
    Marked.setOptions({
      highlight: code => {
        return hljs.highlightAuto(code).value;
      },
      sanitize: true,
      sanitizer: DOMPurify.sanitize,
    });
  }

  return `<html><head><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0"/><style>${baseCSS}</style><style>${mdCSS}</style><style>${
    highlight ? hljsCSS : ''
  }</style><style>${bodyCSS}</style></head><body><article class="markdown-body">${Marked(
    md,
  )}</article></body></html>`;
};

export default makeMarkdown;
