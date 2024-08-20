module.exports = {
  tabWidth: 2, // Tab 用两个空格代替
  jsxSingleQuote: true, // JSX 使用单引号
  jsxBracketSameLine: true, // JSX 标签的反尖括号不需要换行
  printWidth: 120, // 一行最多 120 字符
  singleQuote: true, // 使用单引号
  semi: false, // 不添加尾部分号
  arrowParens: 'always', // 箭头函数，只有一个参数的时候，也需要括号
  endOfLine: 'auto',
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
}
