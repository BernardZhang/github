const t = require('@babel/types')
const fs = require('fs')
const generate = require('@babel/generator').default
const { parseExpression } = require('@babel/parser')
const prettier = require("prettier")
const { isString, isObject, isArray, isBoolean, isNumber, isUndefined, isNull, isFunction } = require('lodash')
const schemas = require('./schemas')
const { generateObjectAstNode, generateStringAstNode, generateActionsAstNode, generateArrayAstNode } = require('./generate-ast-node')
const generatePageEntry = require('./generate-page-entry')
const { isDynamicExpression } = require('./utils')


const schema = schemas[1]

// 1. schema to ast node
const {
  componentsTree } = schema

// 1.1 tag
// 1.2 props
// 1.3 TODO: slotMap
// 1.4 TODO: codes(states)

/**
 * 生成jsx element attributes ast node
 * 1. string
 *  1.1 constant string
 *  1.2 TODO: dynamic expression
 * 2. boolean
 * 3. number
 * 4. null
 * 5. TODO: undefined 
 * 6. object
 *  6.1 object without dynamic expression
 *  6.2 TODO: object with dynamic expression
 * 7. array
 *  7.1 array without dynamic expression
 *  7.2 TODO: array with dynamic expression
 * 8. function
 * 
 * @param {*} props 
 * @returns JSXAttribute[]
 */
const generateAttrs = (props) => Object.entries(props || {}).map(([name, value]) => {
  const attrValExp = (() => {
    if (isArray(value)) {
      return generateArrayAstNode(value)
    }

    if (isObject(value)) {
      return generateObjectAstNode(value)
    }

    if (isString(value)) {
      return generateStringAstNode(value)
    }

    if (isBoolean(value)) {
      return t.booleanLiteral(value)
    }

    if (isNumber(value)) {
      return t.numericLiteral(value)
    }


    if (isFunction(value)) {
      // TODO: special case for native function
      return parseExpression(value.toString())
    }

    if (isNull(value)) {
      return t.nullLiteral(value)
    }

    if (isUndefined(value)) {
      return parseExpression(value)
    }

    return t.stringLiteral(value)
  })()

  return t.jsxAttribute(
    t.jsxIdentifier(name),
    // 常量string 不需要 包裹{}
    isString(value) && !isDynamicExpression(value) ? attrValExp : (
      t.jsxExpressionContainer(
        attrValExp
      )
    )
  )
})

const generateNodeSchema = ({ name, props, children }) => {
  const { children: propChildren, ...restProps } = props
  const isEmpty = !children && isUndefined(propChildren)

  return t.jsxElement(
    t.jsxOpeningElement(t.jsxIdentifier(name), generateAttrs(restProps), isEmpty),
    isEmpty ? null : t.jsxClosingElement(t.jsxIdentifier(name)),
    isArray(children) ? children?.map(child => generateNodeSchema(child)) : (typeof propChildren === 'string' ? [t.jsxText(propChildren)] : []),
    isEmpty
  )
}

const astNode = generateNodeSchema(componentsTree)

// TODO: generate store file
const generateStore = () => {

}

const program = generatePageEntry(schema, astNode)


fs.writeFileSync('./code/ast.json', JSON.stringify(program, null, 2), {
  encoding: 'utf8',
  flag: 'w'
})


// 2. ast to source code
fs.writeFileSync('./code/index.jsx', prettier.format(generate(program, {
  jsescOption: {
    minimal: true,
  },
}).code, {
  parser: 'babel',
}), {
  encoding: 'utf8',
  flag: 'w'
})
