const { parse, parseExpression } = require('@babel/parser')
const t = require('@babel/types')
const { isFunction, isObject, isString, isNumber, isNull, isNaN, isArray, isBoolean } = require('lodash')
const { isDynamicExpression, getExpressionsFromSource, isFunctionExpression, isSingleExpression, isActionList } = require('./utils')

const generateFunctionStr = funcSchema => {
  const { src, args } = funcSchema || {}
  const paramsStr = args?.join(', ')
  const expressions = getExpressionsFromSource(src)
  let exp = getExpressionsFromSource(src)?.[0]

  if (expressions?.length > 1 || !/^\{\{.+\}\}$/.test(src)) {
    exp = '`' + expressions.reduce(
      (acc, cur) => {
        return acc.replaceAll(`{{${cur}}}`, exp => {
          return '${' + exp.replace(/^\{\{(.+)\}\}$/, '$1') + '}'
        })
      },
      src
    ) + '`'
  }

  return `(${paramsStr}) => {
      return ${exp};
    }`
}

const generateStringAstNode = value => {
  if (isDynamicExpression(value)) {
    const expressions = getExpressionsFromSource(value)
    if (expressions?.length > 1) {
      // TODO: multiple expressions
      return parseExpression(value)
    } else {
      return parseExpression(expressions?.[0])
    }
  } else {
    return t.stringLiteral(value)
  }
}

const generateArrayAstNode = value => {
  if (isActionList(value)) {
    return generateActionsAstNode(value)
  }

  return parseExpression(JSON.stringify(value, null, 2))
}

const generateObjectAstNode = obj => {
  if (isFunctionExpression(obj)) {
    return parseExpression(generateFunctionStr(obj))
  }

  const properties = []

  for (let key in obj) {
    const value = obj[key]
    const identifier = t.identifier(key)
    let propertyNode

    if (isFunction(value)) {
      propertyNode = t.objectProperty(identifier, parseExpression(value.toString()))
    }

    if (isString(value)) {
      propertyNode = t.objectProperty(identifier, generateStringAstNode(value))
    }

    if (isObject(value)) {
      if (isArray(value)) {
        // TODO: actions、dynamic expressions 
        // propertyNode = t.objectProperty(identifier, parseExpression(JSON.stringify(value, null, 2)))
        propertyNode = t.objectProperty(identifier, generateArrayAstNode(value))
      } else {
        propertyNode = t.objectProperty(identifier, generateObjectAstNode(value))
      }
    }

    if (isNumber(value)) {
      propertyNode = t.objectProperty(identifier, t.numericLiteral(value))
    }

    if (isNull(value)) {
      propertyNode = t.objectProperty(identifier, t.nullLiteral(value))
    }

    if (isNaN(value)) {
      propertyNode = t.objectProperty(identifier, parseExpression(value))
    }

    if (isBoolean(value)) {
      propertyNode = t.objectProperty(identifier, t.booleanLiteral(value))
    }

    if (propertyNode) {
      properties.push(propertyNode)
    }
    // console.log(key, propertyNode, properties)
  }

  return t.objectExpression(properties)
}

const generateActionAstNode = action => {
  const actionFn = (() => {
    const {
      type,
      method,
      args,
      enabled,
      enableWait = true,
      waitType = 'debounce',
      waitMs = 100,
    } = action
    // const waitFn = waitType === 'throttle' ? throttle : debounce
    let fn = t.arrowFunctionExpression([], t.blockStatement([]))

    const getScope = (rest) => ({
      ...scope,
      ...generateScopeWithMeta(rest, args),
    })

    switch (type) {
      // 查询
      case 'query': {
        if (method === 'trigger') {
          const { method, targetId } = action
          const { params, data } = action.params ?? {}

          /**
           * code: (...rest) => {
           *  return query.trigger({
           *    params,
           *    data
           *  })
           * }
           */
          fn = t.arrowFunctionExpression(
            [t.restElement(t.identifier('rest'))],
            t.blockStatement([
              t.returnStatement(
                t.callExpression(
                  t.memberExpression(t.identifier(targetId), t.identifier(method)),
                  [
                    t.objectExpression([
                      params ? t.objectProperty(t.identifier('params'), generateStringAstNode(params)) : null,
                      data ? t.objectProperty(t.identifier('data'), generateStringAstNode(data)) : null
                    ].filter(item => !!item))
                  ]
                )
              )
            ])
          )
        }

        if (method === 'reset') {
          // fn = () => getQuery(action.targetId).reset()
          /**
           * code:
           * () => query.reset()
           */
          fn = t.arrowFunctionExpression(
            [],
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(t.identifier(targetId), t.identifier(method)),
                []
              )
            ))
        }

        break
      }
      // 脚本
      case 'script': {
        const funcBody = action.params.src
        const funcBodyExpression = (() => {
          try {
            return parseExpression(funcBody)
          } catch (err) {
            // console.error(err, action, parse(funcBody).program.body)
            return t.blockStatement(parse(funcBody).program.body)
          }
        })()

        fn = t.arrowFunctionExpression(
          args.map(arg => t.identifier(arg)),
          funcBodyExpression,
          true
        )

        break
      }
      // 状态
      case 'state': {
        const { targetId, params } = action

        if (method === 'setValue') {
          /**
           * code: (...rest) => {
           *  return state.setValue(expression)
           * }
           */
          fn = t.arrowFunctionExpression(
            [t.restElement(t.identifier('rest'))],
            t.blockStatement(
              [
                t.returnStatement(
                  t.callExpression(
                    t.memberExpression(
                      t.identifier(targetId),
                      t.identifier(method)
                    ),
                    // TODO: parse value expression
                    [generateAttrValAstNode(params.value)]
                  )
                )
              ]
            )
          )
        }

        if (method === 'setIn') {
          /**
           * code: (...rest) => {
           *  state.setIn(pathExpression, valueExpression)
           * }
           */
          fn = t.arrowFunctionExpression(
            [t.restElement(t.identifier('rest'))],
            t.blockStatement(
              [
                t.callExpression(
                  t.memberExpression(
                    t.identifier(targetId),
                    t.identifier(method)
                  ),
                  [
                    generateStringAstNode(params.path),
                    generateAttrValAstNode(params.value)
                  ]
                )
              ]
            )
          )
        }

        if (method === 'reset') {
          /**
           * code: () => {
           *  return state.reset()
           * }
           */
          fn = t.arrowFunctionExpression(
            [],
            t.blockStatement([
              t.callExpression(
                t.memberExpression(
                  t.identifier(targetId),
                  t.identifier(method)
                ),
                []
              )
            ])
          )
        }
        break
      }
      // 本地存储
      case 'localStorage': {
        if (method === 'setValue') {
          fn = (...rest) => {
            const { key, value } = action.params

            if (key != null && value != null) {
              const resolvedKey = resolveReferences < string > ({
                ...restOption,
                object: key,
                scope: getScope(rest),
                sourcemap: updateSourcemapPath(restOption.sourcemap, 'key'),
              })[1]
              const resolvedValue = resolveReferences({
                ...restOption,
                object: value,
                scope: getScope(rest),
                sourcemap: updateSourcemapPath(restOption.sourcemap, 'value'),
              })[1]

              window.localStorage.setItem(resolvedKey, resolvedValue)
            }
          }
        }

        if (method === 'clear') {
          fn = (...rest) => {
            const { key } = action.params

            if (key != null) {
              const resolvedKey = resolveReferences({
                ...restOption,
                object: key,
                scope: getScope(rest),
                sourcemap: updateSourcemapPath(restOption.sourcemap, 'key'),
              })[1]

              window.localStorage.removeItem(resolvedKey)
            }
          }
        }

        break
      }
      // 打开链接
      case 'util.openUrl': {
        fn = (...rest) => {
          const result = resolveReferences({
            ...restOption,
            object: action.params.url,
            scope: getScope(rest),
            sourcemap: updateSourcemapPath(restOption.sourcemap, 'value'),
          })[1]

          if (action.params.options.newTab) {
            window.open(result, '_blank')
          } else {
            window.open(result)
          }
        }

        break
      }
      // 复制到剪贴板
      case 'util.copyToClipboard': {
        fn = (...rest) => {
          const result = resolveReferences({
            ...restOption,
            object: action.params.value,
            scope: getScope(rest),
            sourcemap: updateSourcemapPath(restOption.sourcemap, 'value'),
          })[1]

          if (
            typeof result === 'string' ||
            (result)?.toString !=
            null
          ) {
            const isSuccess = copy((result).toString())

            if (isSuccess && action.params.enableSuccessMessage) {
              getInjectComponents('message')?.success({
                content: resolveReferences < string > ({
                  ...restOption,
                  object: action.params.successMessage,
                  scope: getScope(rest),
                  sourcemap: updateSourcemapPath(
                    restOption.sourcemap,
                    'message'
                  ),
                })[1],
              })
            }
          }
        }

        break
      }
      // 消息
      case 'util.showMessage': {
        const { type, duration, content } = action.params

        fn = (...rest) => {
          const resolvedDuration = resolveReferences < number > ({
            ...restOption,
            object: duration,
            scope: getScope(rest),
            sourcemap: updateSourcemapPath(restOption.sourcemap, 'duration'),
          })[1]
          const resolvedContent = resolveReferences < string > ({
            ...restOption,
            object: content,
            scope: getScope(rest),
            sourcemap: updateSourcemapPath(restOption.sourcemap, 'content'),
          })[1]

          if (typeof resolvedContent === 'string' && resolvedContent !== '') {
            getInjectComponents('message')?.[type]?.({
              duration: resolvedDuration,
              content: resolvedContent,
            })
          }
        }

        break
      }
      // 通知
      case 'util.showNotification': {
        const { type, duration, title, content, placement } = action.params

        fn = (...rest) => {
          const resolvedDuration = resolveReferences < number > ({
            ...restOption,
            object: duration,
            scope: getScope(rest),
            sourcemap: updateSourcemapPath(restOption.sourcemap, 'duration'),
          })[1]
          const resolvedTitle = resolveReferences < string > ({
            ...restOption,
            object: title,
            scope: getScope(rest),
            sourcemap: updateSourcemapPath(restOption.sourcemap, 'title'),
          })[1]
          const resolvedContent = resolveReferences < string > ({
            object: content,
            ...restOption,
            scope: getScope(rest),
            sourcemap: updateSourcemapPath(restOption.sourcemap, 'content'),
          })[1]

          getInjectComponents('notification')?.[type]?.({
            duration: resolvedDuration,
            message: resolvedTitle,
            description: resolvedContent,
            placement,
          })
        }

        break
      }
    }

    // TODO: debounce throttle
    if (fn && enableWait) {
      // fn = waitFn(fn, waitMs, {
      //   leading: true,
      // })
    }

    return fn
  })()

  // return async (...rest) =>
  //   Promise.resolve(actionFn ? actionFn(...rest) : undefined)
  return t.arrowFunctionExpression(
    [t.restElement(t.identifier('rest'))],
    t.callExpression(
      t.memberExpression(t.identifier('Promise'), t.identifier('resolve')),
      [
        // t.conditionalExpression(actionFn, t.callExpression(actionFn, t.restElement(t.identifier('rest'))), t.identifier('undefined'))
        t.callExpression(actionFn, [t.spreadElement(t.identifier('rest'))])
      ]
    ),
    true
  )
}

const generateActionsAstNode = actions => {
  const actionsList = actions.map((action, index) =>
    generateActionAstNode(
      action
    )
  )

  // const actionsCode = generate()

  // return async (...rest) => {
  //   const result = []

  //   for (const action of actionsList) {
  //     result.push(await action(...rest))
  //   }

  //   return result
  // }

  return t.arrowFunctionExpression(
    [t.restElement(t.identifier('rest'))],
    t.blockStatement([
      t.variableDeclaration('const', [t.variableDeclarator(t.identifier('result'), t.arrayExpression([]))]),
      t.variableDeclaration('const', [t.variableDeclarator(t.identifier('actionsList'), t.arrayExpression(actionsList))]),
      t.forOfStatement(
        t.variableDeclaration('const', [t.variableDeclarator(t.identifier('action'))]),
        t.identifier('actionsList'),
        t.blockStatement(
          [
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(t.identifier('result'), t.identifier('push')),
                [
                  t.awaitExpression(
                    t.callExpression(
                      t.identifier('action'),
                      [t.spreadElement(t.identifier('rest'))]
                    )
                  )
                ]
              )
            )
          ]
        )

      ),
      t.returnStatement(t.identifier('result'))
    ]),
    true
  )
}

function generateAttrValAstNode(value) {
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
}

module.exports = {
  generateStringAstNode,
  generateObjectAstNode,
  generateArrayAstNode,
  generateActionAstNode,
  generateActionsAstNode,
  generateAttrValAstNode,
}

