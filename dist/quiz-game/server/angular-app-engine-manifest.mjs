
export default {
  basePath: '/betting-trivia/',
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
