"use strict";
class Lexer {
    constructor(input) {
        this.input = input;
        this.output = "";
        this.tokens = [];
        this.currentPos = 0;
        this.line = 1;
        this.column = 0;
        this.errorCounter = 0;
    }
    lex() {
        while (this.currentPos < this.input.length) {
            const char = this.input[this.currentPos];
            this.column++;
            if (char === "{") {
                this.tokens.push(new Token(TokenType.OPEN_BLOCK, char, this.line, this.column));
            }
            else if (char === "}") {
                this.tokens.push(new Token(TokenType.CLOSE_BLOCK, char, this.line, this.column));
            }
            else if (char === "$") {
                this.tokens.push(new Token(TokenType.EOP, char, this.line, this.column));
            }
            else if (char === "\n") {
                this.line++;
                this.column = 0;
            }
            else {
                this.errorCounter++;
                this.tokens.push(new Token(TokenType.ERROR, char, this.line, this.column));
            }
            this.currentPos++;
        }
        this.printTokens();
        return this.tokens;
    }
    printTokens() {
        this.tokens.forEach((token) => {
            if (TokenType[token.type] === "ERROR") {
                this.output += `ERROR Lexer - ${TokenType[token.type]} : ${token.line}:${token.column} Unrecognized Token: ${token.value}\n`;
            }
            else if (TokenType[token.type] === "EOP") {
                this.output += `DEBUG Lexer - ${TokenType[token.type]} [ ${token.value} ] found at (${token.line}:${token.column}) \n INFO Lexer - Lex completed with ${this.errorCounter} errors \n`;
                this.errorCounter = 0;
            }
            else {
                this.output += `DEBUG Lexer - ${TokenType[token.type]} [ ${token.value} ] found at (${token.line}:${token.column})\n`;
            }
        });
    }
    getOutput() {
        return this.output;
    }
}
const textInput = document.getElementById("textInput");
const textOutput = document.getElementById("textOutput");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
textOutput.readOnly = true;
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const myLexer = new Lexer(textInput.value);
    myLexer.lex();
    const lexerOutput = myLexer.getOutput();
    textOutput.value = lexerOutput;
    if (resetBtn)
        resetBtn.style.display = "inline-block";
});
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener("click", (event) => {
    event.preventDefault();
    textInput.value = "";
    textOutput.value = "";
    resetBtn.style.display = "none";
});
var TokenType;
(function (TokenType) {
    TokenType[TokenType["OPEN_BLOCK"] = 0] = "OPEN_BLOCK";
    TokenType[TokenType["CLOSE_BLOCK"] = 1] = "CLOSE_BLOCK";
    TokenType[TokenType["PRINT"] = 2] = "PRINT";
    TokenType[TokenType["ASSIGN_OP"] = 3] = "ASSIGN_OP";
    TokenType[TokenType["TYPE_INT"] = 4] = "TYPE_INT";
    TokenType[TokenType["TYPE_STRING"] = 5] = "TYPE_STRING";
    TokenType[TokenType["TYPE_BOOLEAN"] = 6] = "TYPE_BOOLEAN";
    TokenType[TokenType["IDENTIFIER"] = 7] = "IDENTIFIER";
    TokenType[TokenType["DIGIT"] = 8] = "DIGIT";
    TokenType[TokenType["STRING"] = 9] = "STRING";
    TokenType[TokenType["PLUS"] = 10] = "PLUS";
    TokenType[TokenType["EQUALS"] = 11] = "EQUALS";
    TokenType[TokenType["NOT_EQUALS"] = 12] = "NOT_EQUALS";
    TokenType[TokenType["TRUE"] = 13] = "TRUE";
    TokenType[TokenType["FALSE"] = 14] = "FALSE";
    TokenType[TokenType["EOP"] = 15] = "EOP";
    TokenType[TokenType["WHILE"] = 16] = "WHILE";
    TokenType[TokenType["IF"] = 17] = "IF";
    TokenType[TokenType["WHITESPACE"] = 18] = "WHITESPACE";
    TokenType[TokenType["COMMENT"] = 19] = "COMMENT";
    TokenType[TokenType["ERROR"] = 20] = "ERROR";
})(TokenType || (TokenType = {}));
class Token {
    constructor(type, value, line, column) {
        this.type = type;
        this.value = value;
        this.line = line;
        this.column = column;
    }
}
//# sourceMappingURL=compiler.js.map