import { parseExpression } from '@babel/parser'
import { Buffer } from 'buffer'
import traverse from '@babel/traverse'

window.Buffer = Buffer

export default () => {
  const astNode = parseExpression(`function () { console.log('Hello @babel ')}`)

  const t = traverse.default || traverse

  console.log('traversexxx...', traverse, t)



  t(astNode, {
    noScope: true,
    enter(nodePath) {
      console.log('traverse enter...', nodePath)
    }
  })


  document.body.innerHTML = `<pre>${JSON.stringify(astNode, null, 4)}</pre>`

}


