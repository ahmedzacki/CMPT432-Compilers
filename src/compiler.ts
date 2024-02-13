class Lexer {
  private output: string = "";
  private tokens: Token[] = [];
  private currentPos = 0;
  private line = 1;
  private column = 1;
  private errorCounter = 0;

  constructor(private input: string) {}

  public lex(): Token[] {
    while (this.currentPos < this.input.length) {
      const char = this.input[this.currentPos];

      if (char === " " || char === "\t" || char === "\n") {
        this.handleWhitespace(char);
      } else if (this.input.startsWith("/*", this.currentPos)) {
        this.skipComment();
      } else if (/[0-9]/.test(char)) {
        // Check if char is a digit
        this.addToken(TokenType.DIGIT, char);
        this.column++;
      } else if (this.isKeywordOrIdentifier()) {
        // No changes needed here, already handles IDs correctly
      } else {
        this.handleToken(char);
      }
      this.currentPos++;
    }
    this.printLexingInfo();
    return this.tokens;
  }

  private handleWhitespace(char: string) {
    if (char === "\n") {
      this.line++;
      this.column = 0;
    } else {
      this.column++;
    }
  }

  private skipComment() {
    this.currentPos += 2; // Skip the "/*"
    while (
      this.currentPos < this.input.length &&
      !this.input.startsWith("*/", this.currentPos)
    ) {
      this.currentPos++;
      if (this.input[this.currentPos] === "\n") {
        this.line++;
        this.column = 0;
      }
    }
    this.currentPos += 1; // Position after the closing "*", loop increment will skip the "/"
    this.column++; // Assuming comment ends at the start of a new column
  }

  private isKeywordOrIdentifier() {
    const start = this.currentPos;
    if (/[a-zA-Z]/.test(this.input[start])) {
      let end = start;
      while (end < this.input.length && /[a-zA-Z0-9_]/.test(this.input[end])) {
        end++;
      }
      const value = this.input.substring(start, end);
      const keywordType = this.keywordToTokenType(value);
      if (keywordType !== null) {
        this.addToken(keywordType, value);
        this.currentPos = end - 1; // Adjusting currentPos to end of the keyword/identifier
        this.column += value.length; // Updating column to reflect the length of the keyword/identifier
        return true;
      }
    }
    return false;
  }

  private handleToken(char: string) {
    switch (char) {
      case "{":
        this.addToken(TokenType.OPEN_BLOCK, char);
        break;
      case "}":
        this.addToken(TokenType.CLOSE_BLOCK, char);
        break;
      case "$": {
        this.addToken(TokenType.EOP, char);
        this.errorCounter = 0;
        break;
      }
      case "+":
        this.addToken(TokenType.ADDITION_OP, char);
        break;
      case "-":
        this.addToken(TokenType.MINUS_OP, char);
        break;
      case "=":
        this.addToken(TokenType.ASSIGN_OP, char);
        break;
      case '"':
        this.addToken(TokenType.QUOTE, char);
        break;
      case "(":
        this.addToken(TokenType.OPENING_PARENTHESIS, char);
        break;
      case ")":
        this.addToken(TokenType.CLOSING_PARENTHESIS, char);
        break;
      default:
        this.errorCounter++;
        this.output += `ERROR Lexer - Error:${this.line}:${this.column} Unrecognized Token: ${char}\n`;
        break;
    }
  }

  private addToken(type: TokenType, value: string) {
    this.tokens.push(new Token(type, value, this.line, this.column));
    if (TokenType[type] == "EOP") {
      this.output += `DEBUG Lexer - ${TokenType[type]} [ ${value} ] found at (${this.line}:${this.column})\n`;
      this.printLexingInfo();
    } else
      this.output += `DEBUG Lexer - ${TokenType[type]} [ ${value} ] found at (${this.line}:${this.column})\n`;
  }

  private keywordToTokenType(keyword: string): TokenType | null {
    switch (keyword) {
      case "int":
        return TokenType.TYPE_INT;
      case "string":
        return TokenType.TYPE_STRING;
      case "true":
        return TokenType.BOOLVAL;
      case "false":
        return TokenType.BOOLVAL;
      case "if":
        return TokenType.IFSTATEMENT;
      case "print":
        return TokenType.PRINT_STATEMENT;
      case "while":
        return TokenType.WHILE;
      case "!=":
        return TokenType.INEQUALITY_OP;
      case "==":
        return TokenType.EQUALITY_OP;

      default:
        return TokenType.ID;
    }
  }

  private printLexingInfo() {
    this.output += `INFO Lexer - Lex completed with ${this.errorCounter} errors\n`;
    this.errorCounter = 0;
  }

  public getOutput(): string {
    return this.output;
  }
}

enum TokenType {
  OPEN_BLOCK,
  CLOSE_BLOCK,
  OPENING_PARENTHESIS,
  CLOSING_PARENTHESIS,
  ASSIGN_OP,
  TYPE_INT,
  TYPE_STRING,
  BOOLVAL,
  ID,
  ADDITION_OP,
  MINUS_OP,
  EOP,
  ERROR,
  IFSTATEMENT,
  DIGIT,
  PRINT_STATEMENT,
  QUOTE,
  WHILE,
  INEQUALITY_OP,
  EQUALITY_OP,
}

class Token {
  constructor(
    public type: TokenType,
    public value: string,
    public line: number,
    public column: number
  ) {}
}

const textInput = document.getElementById("textInput") as HTMLTextAreaElement;
const textOutput = document.getElementById("textOutput") as HTMLTextAreaElement;
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;

textOutput.readOnly = true;

submitBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  const myLexer = new Lexer(textInput.value);
  myLexer.lex(); //  Accumulating the output in myLexer
  const lexerOutput = myLexer.getOutput(); // Retrieving the accumulated output
  textOutput.value = lexerOutput; // Displaying the lexer output in the textarea

  if (resetBtn) resetBtn.style.display = "inline-block";
});

resetBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  textInput.value = "";
  textOutput.value = "";
  resetBtn.style.display = "none";
});
