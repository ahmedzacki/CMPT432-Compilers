import { Token, TokenType } from "./token";

export class Lexer {
  private tokens: Token[] = [];
  private currentPos = 0; // Track the current position in the input string
  private line = 1;
  private column = 0;
  private errorCounter = 0; // Tracking the number of errors in the program

  constructor(private input: string) {}

  public lex(): Token[] {
    while (this.currentPos < this.input.length) {
      const char = this.input[this.currentPos];
      this.column++;

      if (char === "{") {
        this.tokens.push(
          new Token(TokenType.OPEN_BLOCK, char, this.line, this.column)
        );
      } else if (char === "}") {
        this.tokens.push(
          new Token(TokenType.CLOSE_BLOCK, char, this.line, this.column)
        );
      } else if (char === "$") {
        this.tokens.push(
          new Token(TokenType.EOP, char, this.line, this.column)
        );
      } else if (char === "\n") {
        this.line++;
        this.column = 0;
      }
      // Adding more token checks here

      // Handlling errors here
      else {
        this.errorCounter++;
        this.tokens.push(
          new Token(TokenType.ERROR, char, this.line, this.column)
        );
      }

      this.currentPos++;
    }

    this.printTokens();
    return this.tokens;
  }

  private printTokens() {
    this.tokens.forEach((token) => {
      if (TokenType[token.type] === "ERROR")
        console.log(
          `ERROR Lexer - ${TokenType[token.type]} : ${token.line}:${
            token.column
          } Unrecognized Token: ${token.value}`
        );
      else if (TokenType[token.type] === "EOP") {
        console.log(
          `DEBUG Lexer - ${TokenType[token.type]} [ ${
            token.value
          } ] found at (${token.line}:${
            token.column
          }) \n INFO Lexer - Lex completed with ${this.errorCounter} errors `
        );
        this.errorCounter = 0;
      } else
        console.log(
          `DEBUG Lexer - ${TokenType[token.type]} [ ${
            token.value
          } ] found at (${token.line}:${token.column})`
        );
    });
  }
}
