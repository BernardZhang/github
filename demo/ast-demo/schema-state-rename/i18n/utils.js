// unicode cjk 中日韩文 范围
const DOUBLE_BYTE_REG = /[\u4E00-\u9FFF]/g

const extractExpression = str => str.match(/\s*\{\{([\s\S]+)\}\}\s*/mi)?.[1];

const hasChinese = str => DOUBLE_BYTE_REG.test(str)


module.exports = {
  extractExpression,
  hasChinese
}