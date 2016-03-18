module.exports = {
  verbose: false,
  reporting: {
    print: 'none',
    dir: './output/coverage',
    reports: [
      'lcov',
      'json',
      'text-summary'
    ]
  }
};
