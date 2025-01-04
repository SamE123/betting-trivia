
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
    'index.csr.html': {size: 14502, hash: 'cde27272f4922bb578c5d68f02cf610dddbc93320e288573462dd9e3b3075720', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7980, hash: 'fcfdbf5237442e368380a47f21f2186708bf0f921a87ea83e4a54db51b13abe3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 22186, hash: '603b979e0c2c89e3646a9209e21f2ee52f6185052248e47a14ab0ac3fa85f290', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-FOSFKDYQ.css': {size: 8935, hash: 'jDUAv5mEWh4', text: () => import('./assets-chunks/styles-FOSFKDYQ_css.mjs').then(m => m.default)}
  },
};
