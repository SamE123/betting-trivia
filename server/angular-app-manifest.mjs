
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://same123.github.io/betting-trivia/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/https://same123.github.io/betting-trivia"
  }
],
  assets: {
    'index.csr.html': {size: 14527, hash: 'ab6b53ee403d34c6f2e1c83f5c45154bd9bbb8829adf34ab0f91ba7ce1bdba25', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 8005, hash: '3d2c079c93cd7fffc52af95810a109c1f247fef1f7b6d8c02eb227cae0c410ca', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 22211, hash: '00e5b27117bf8a05c3ca8ee1f717d074b958313649bbd2474c492e59ac52267d', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-FOSFKDYQ.css': {size: 8935, hash: 'jDUAv5mEWh4', text: () => import('./assets-chunks/styles-FOSFKDYQ_css.mjs').then(m => m.default)}
  },
};
