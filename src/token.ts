export enum TokenType {
  OPEN_BLOCK,
  CLOSE_BLOCK,
  PRINT,
  ASSIGN_OP,
  TYPE_INT,
  TYPE_STRING,
  TYPE_BOOLEAN,
  IDENTIFIER,
  DIGIT,
  STRING,
  PLUS,
  EQUALS,
  NOT_EQUALS,
  TRUE,
  FALSE,
  EOP,
  WHILE,
  IF,
  WHITESPACE,
  COMMENT,
  ERROR,
}

export class Token {
  constructor(
    public type: TokenType,
    public value: string,
    public line: number,
    public column: number
  ) {}
}
