package parser

import (
	"monkey/ast"
	"monkey/lexer"
	"monkey/token"
)

type Parser struct {
	l      *lexer.Lexer
	errors []string

	curToken  token.Token
	peekToken token.Token
}

func New(l *lexer.Lexer) *Parser {
	p := &Parser{
		l:      l,
		errors: []string{},
	}

	return p
}

func (p *Parser) ParseProgram() *ast.Program {
	program := &ast.Program{}
	program.Statements = []ast.Statement{}

	return program
}

func (p *Parser) Errors() []string {
	return p.errors
}
