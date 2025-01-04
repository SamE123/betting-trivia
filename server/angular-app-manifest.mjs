
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/betting-trivia/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/betting-trivia"
  }
],
  assets: {
    'index.csr.html': {size: 14502, hash: 'd594111d7065509e922a979713d13c9d45a68a4d7d6752a02957aed438b44277', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7980, hash: '283c16e45278f1c8ff190033bfe84b1a42bd0f5267985d40f6dfcfd457ac273b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 22186, hash: '2dbd4cb274aa2a3dc3d58b34fb38897b0e21a7388430c6706475c295c665c33f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-FOSFKDYQ.css': {size: 8935, hash: 'jDUAv5mEWh4', text: () => import('./assets-chunks/styles-FOSFKDYQ_css.mjs').then(m => m.default)}
  },
};
