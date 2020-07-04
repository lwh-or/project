module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量
          'text-color': '#FFFFFF',
          'border-color': '#333333',
          'background-color:': 'red'
        },
      },
    },
  },
};