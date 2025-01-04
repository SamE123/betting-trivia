
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  assets: {
    'index.csr.html': {size: 14487, hash: '0f3c6943e9c3b271b1ca897f864e27a2613d8e1291d74590639dadb6a811471d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7965, hash: '0b6a8c8b9d01a2151e59ce7b4dbe362d088cbae9eea9eb9656e9d5623b5c1997', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 22171, hash: '3156b8f45d9314405671232302d4d9ee4b8568c139d9ea7574a8f1f69e153fff', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-FOSFKDYQ.css': {size: 8935, hash: 'jDUAv5mEWh4', text: () => import('./assets-chunks/styles-FOSFKDYQ_css.mjs').then(m => m.default)}
  },
};
