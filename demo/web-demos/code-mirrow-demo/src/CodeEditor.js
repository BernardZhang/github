import {
  javascript,
  esLint,
} from '@codemirror/lang-javascript'
import { linter, lintGutter } from '@codemirror/lint'
import Linter from 'eslint4b-prebuilt'
import eslint from 'eslint-linter-browserify'
// import createTheme from '@uiw/codemirror-themes'
import { useCodeMirror } from '@uiw/react-codemirror'
import { EditorView } from 'codemirror'
import React, { useEffect, useMemo, useRef } from 'react'
import { isPlainObject } from 'lodash'

console.log('eslint...', eslint)

const eslintConfig = {
  // extends: 'eslint:recommended',
  parserOptions: { ecmaVersion: 2020, sourceType: 'module', ecmaFeatures: {} },
  env: {
    es6: true,
  },
  // rules: {
  //   'constructor-super': ['error'],
  //   'for-direction': ['error'],
  //   'getter-return': ['error'],
  //   'no-async-promise-executor': ['error'],
  //   'no-case-declarations': ['error'],
  //   'no-class-assign': ['error'],
  //   'no-compare-neg-zero': ['error'],
  //   'no-cond-assign': ['error'],
  //   'no-const-assign': ['error'],
  //   'no-constant-condition': ['error'],
  //   'no-control-regex': ['error'],
  //   'no-debugger': ['error'],
  //   'no-delete-var': ['error'],
  //   'no-dupe-args': ['error'],
  //   'no-dupe-class-members': ['error'],
  //   'no-dupe-else-if': ['error'],
  //   'no-dupe-keys': ['error'],
  //   'no-duplicate-case': ['error'],
  //   'no-empty': ['error'],
  //   'no-empty-character-class': ['error'],
  //   'no-empty-pattern': ['error'],
  //   'no-ex-assign': ['error'],
  //   'no-extra-boolean-cast': ['error'],
  //   'no-extra-semi': ['error'],
  //   'no-fallthrough': ['error'],
  //   'no-func-assign': ['error'],
  //   'no-global-assign': ['error'],
  //   'no-import-assign': ['error'],
  //   'no-inner-declarations': ['error'],
  //   'no-invalid-regexp': ['error'],
  //   'no-irregular-whitespace': ['error'],
  //   'no-loss-of-precision': ['error'],
  //   'no-misleading-character-class': ['error'],
  //   'no-mixed-spaces-and-tabs': ['error'],
  //   'no-new-symbol': ['error'],
  //   'no-nonoctal-decimal-escape': ['error'],
  //   'no-obj-calls': ['error'],
  //   'no-octal': ['error'],
  //   'no-prototype-builtins': ['error'],
  //   'no-redeclare': ['error'],
  //   'no-regex-spaces': ['error'],
  //   'no-self-assign': ['error'],
  //   'no-setter-return': ['error'],
  //   'no-shadow-restricted-names': ['error'],
  //   'no-sparse-arrays': ['error'],
  //   'no-this-before-super': ['error'],
  //   'no-undef': ['error'],
  //   'no-unexpected-multiline': ['error'],
  //   'no-unreachable': ['error'],
  //   'no-unsafe-finally': ['error'],
  //   'no-unsafe-negation': ['error'],
  //   'no-unsafe-optional-chaining': ['error'],
  //   'no-unused-labels': ['error'],
  //   'no-unused-vars': ['error'],
  //   'no-useless-backreference': ['error'],
  //   'no-useless-catch': ['error'],
  //   'no-useless-escape': ['error'],
  //   'no-with': ['error'],
  //   'require-yield': ['error'],
  //   'use-isnan': ['error'],
  //   'valid-typeof': ['error'],
  // },
}

const extensions = [
  linter(esLint(new eslint.Linter(), eslintConfig)),
  lintGutter(),
  javascript(),
  EditorView.lineWrapping,
  // autocompletion({
  //   activateOnTyping: true,
  //   icons: false,
  // }),
  // javascriptLanguage.data.of({
  //   activateOnTyping: true,
  //   icons: false,
  //   autocomplete: completionSource(),
  // }),
]
// const theme = createTheme({
//   theme: 'light',
//   settings: {
//     background: '#ffffff',
//     foreground: '#181818',
//     caret: '#5d00ff',
//     selection: '#036dd626',
//     selectionMatch: '#036dd626',
//     lineHighlight: '#8a91991a',
//     gutterBackground: '#fff',
//     gutterForeground: '#8a919966',
//   },
//   styles: [
//     { tag: t.comment, color: '#787b8099' },
//     { tag: t.keyword, color: '#159570' },
//     { tag: t.string, color: '#159570' },
//     { tag: t.variableName, color: '#159570' },
//     { tag: t.operator, color: '#fb6620' },
//   ],
// })

export const CodeMirror = ({
  value,
  placeholder,
  basicSetup,
  onChange,
  onUpdate,
  ...rest
}) => {
  const codeMirror = useRef(null)
  const configure = useMemo(
    () => ({
      container: codeMirror.current,
      value,
      extensions,
      // theme,
      placeholder,
      basicSetup: {
        lineNumbers: true,
        highlightSelectionMatches: true,
        foldGutter: true,
        ...(isPlainObject(basicSetup) ? (basicSetup) : {}),
      },
      onChange,
      onUpdate,
    }),
    [basicSetup, onChange, onUpdate, placeholder, value]
  )
  const { setContainer } = useCodeMirror(configure)

  useEffect(() => {
    if (codeMirror.current) {
      setContainer(codeMirror.current)
    }
  }, [setContainer])

  return <div ref={codeMirror} {...rest} />
}

CodeMirror.displayName = 'CodeMirror'

export default CodeMirror
