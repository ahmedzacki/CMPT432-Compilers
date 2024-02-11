class Lexer {
  private output: string = ""; // lexer output
  private tokens: Token[] = [];
  private currentPos = 0; // Tracking the current position in the input string
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

  private printTokens(): void {
    this.tokens.forEach((token) => {
      if (TokenType[token.type] === "ERROR") {
        this.output += `ERROR Lexer - ${TokenType[token.type]} : ${
          token.line
        }:${token.column} Unrecognized Token: ${token.value}\n`;
      } else if (TokenType[token.type] === "EOP") {
        this.output += `DEBUG Lexer - ${TokenType[token.type]} [ ${
          token.value
        } ] found at (${token.line}:${
          token.column
        }) \n INFO Lexer - Lex completed with ${this.errorCounter} errors \n`;
        this.errorCounter = 0;
      } else {
        this.output += `DEBUG Lexer - ${TokenType[token.type]} [ ${
          token.value
        } ] found at (${token.line}:${token.column})\n`;
      }
    });
  }

  public getOutput(): string {
    return this.output;
  }
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

enum TokenType {
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

class Token {
  constructor(
    public type: TokenType,
    public value: string,
    public line: number,
    public column: number
  ) {}
}
