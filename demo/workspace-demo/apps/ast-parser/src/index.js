import { parse } from 'parser'
import { getValue } from 'utils'

console.log(parse(`function () { console.log('HelloWorld') }`))

console.log(getValue({ name: 'zhangsan' }, 'name'))