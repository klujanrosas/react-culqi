module.exports = {
  presets: [
    [
      '@babel/env',
      {
        loose: true,
        targets: '> 0.25%, not dead',
      },
    ],
  ],
  plugins: [['@babel/proposal-class-properties', { loose: true }]],
};
