module.exports = {
  plugins: [
    {
      postcssPlugin: 'internal:charset-removal',
      AtRule: {
        charset: (atRule: any) => {
          if (atRule.name === 'charset') {
            atRule.remove()
          }
        },
      },
    },
  ],
}
