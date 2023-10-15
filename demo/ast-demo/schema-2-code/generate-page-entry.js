const t = require('@babel/types')
const { uniqBy } = require('lodash')
const { traverseTree, INJECT_COMPONENTS } = require('./utils')
const assets = require('./assets.json')

const builtinAssetMap = { JSONSchemaForm: true }

const getUsedAssets = (
  assets,
  schema,
) => {
  const { componentsTree, elements } = schema
  const usedAssetMap = INJECT_COMPONENTS?.reduce(
    (acc, cur) => {
      acc[cur] = true
      return acc
    },
    Object.keys(elements || {}).length
      ? { ControlContainer: true }
      : {}
  )

  traverseTree(
    [
      componentsTree,
      ...(Object.values(elements || {})),
    ],
    (node) => {
      if (node) {
        usedAssetMap[node.name] = true

        if (node.slotMap) {
          Object.values(node.slotMap).forEach((components) => {
            traverseTree(components, (node) => {
              usedAssetMap[node.name] = true
            })
          })
        }
      }
    }
  )

  return assets?.filter(
    ({ name }) => usedAssetMap[name] && !builtinAssetMap[name]
  )
}

const generatePageEntry = (schema, jsxElement) => {
  const { packages, components } = assets
  const pkgMap = packages.reduce((acc, cur) => {
    acc[cur.uuid] = cur
    return acc
  }, {})

  const componentMap = components?.reduce((acc, cur) => {
    acc[cur.name] = true
    return acc
  }, {})
  const allComponents = uniqBy(components, 'name')?.reduce(
    (acc, asset) => {
      const { exportName } = asset
      const paths = exportName.split('.')

      // 组件中使用了 Form.Item, 但未使用Form的情况，特殊处理下asset meta信息
      if (paths.length > 1 && !componentMap[paths[0]]) {
        return [
          ...acc,
          {
            ...asset,
            name: paths[0],
            exportName: paths[0],
          },
        ]
      }

      if (paths?.length === 1) {
        acc.push(asset)
      }

      return acc
    },
    []
  )?.map(({ pkgUuid, ...rest }) => ({
    ...rest,
    pkg: pkgMap[pkgUuid]
  }))


  const usedComponents = getUsedAssets(allComponents, schema)

  const pkgAssetsMap = usedComponents.reduce(
    (acc, { pkg, exportName, name, destructuring }) => {
      if (pkg) {
        acc[pkg.pkg] = acc[pkg.pkg] || []
        acc[pkg.pkg].push({
          name,
          exportName,
          destructuring,
        })
      }
      return acc
    },
    {}
  )

  const importDeclarations = Object.entries(pkgAssetsMap).map(([pkg, assets]) => {
    const { destructuring, nonDestructuring } = assets.reduce(
      (acc, asset) => {
        acc[asset.destructuring ? 'destructuring' : 'nonDestructuring'].push(
          asset
        )
        return acc
      },
      { destructuring: [], nonDestructuring: [] }
    )

    return t.importDeclaration([
      ...nonDestructuring.map(({ name }) => t.importDefaultSpecifier(t.identifier(name))),
      ...destructuring.map(({ name, exportName }) => t.importSpecifier(t.identifier(name), t.identifier(exportName)))
    ], t.stringLiteral(pkg))
  })


  return t.program([
    // import declarations
    ...importDeclarations,
    // export default
    t.exportDefaultDeclaration(
      t.arrowFunctionExpression(
        // TODO: props
        [],
        t.blockStatement(
          [
            t.returnStatement(jsxElement)
          ]
        )
      )
    )
  ])
}

module.exports = generatePageEntry
