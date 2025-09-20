// lighthouserc.js

module.exports = {
  ci: {
    collect: {
      url: [
        'https://kingtutroyal-696ea--pr14-performance-pasaekql.web.app/',
        // ex) 'http://localhost:3000'
        // add additional urls to audit
      ],
      numberOfRuns: 1,
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci',
      reportFilenamePattern: '%%DATETIME%%.%%EXTENSION%%',
    },
  },
};
