"use strict";
class Lexer {
    constructor(input) {
        this.input = input;
        this.output = "";
        this.tokens = [];
        this.currentPos = 0;
        this.line = 1;
        this.column = 1;
        this.errorCounter = 0;
    }
    lex() {
        while (this.currentPos < this.input.length) {
            const char = this.input[this.currentPos];
            if (char === " " || char === "\t" || char === "\n") {
                this.handleWhitespace(char);
            }
            else if (this.input.startsWith("/*", this.currentPos)) {
                this.skipComment();
            }
            else if (this.isKeywordOrIdentifier()) {
            }
            else {
                this.handleToken(char);
            }
            this.currentPos++;
        }
        return this.tokens;
    }
    handleWhitespace(char) {
        if (char === "\n") {
            this.line++;
            this.column = 0;
        }
        else {
            this.column++;
        }
    }
    skipComment() {
        this.currentPos += 2;
        while (this.currentPos < this.input.length &&
            !this.input.startsWith("*/", this.currentPos)) {
            this.currentPos++;
            if (this.input[this.currentPos] === "\n") {
                this.line++;
                this.column = 0;
            }
        }
        this.currentPos += 1;
        this.column++;
    }
    isKeywordOrIdentifier() {
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
                this.currentPos = end - 1;
                this.column += value.length;
                return true;
            }
        }
        return false;
    }
    handleToken(char) {
        switch (char) {
            case "{":
                this.addToken(TokenType.OPEN_BLOCK, char);
                break;
            case "}":
                this.addToken(TokenType.CLOSE_BLOCK, char);
                break;
            case "$":
                this.addToken(TokenType.EOP, char);
                break;
            case "+":
                this.addToken(TokenType.PLUS, char);
                break;
            case "=":
                this.addToken(TokenType.ASSIGN_OP, char);
                break;
            default:
                this.errorCounter++;
                this.output += `ERROR Lexer - Error:${this.line}:${this.column} Unrecognized Token: ${char}\n`;
                break;
        }
    }
    addToken(type, value) {
        this.tokens.push(new Token(type, value, this.line, this.column));
        if (TokenType[type] == "EOP") {
            this.output += `DEBUG Lexer - ${TokenType[type]} [ ${value} ] found at (${this.line}:${this.column})\n`;
            this.printLexingInfo();
        }
        else
            this.output += `DEBUG Lexer - ${TokenType[type]} [ ${value} ] found at (${this.line}:${this.column})\n`;
    }
    keywordToTokenType(keyword) {
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
            default:
                return TokenType.ID;
        }
    }
    printLexingInfo() {
        this.output += `INFO Lexer - Lex completed with ${this.errorCounter} errors\n`;
        this.errorCounter = 0;
    }
    getOutput() {
        return this.output;
    }
}
var TokenType;
(function (TokenType) {
    TokenType[TokenType["OPEN_BLOCK"] = 0] = "OPEN_BLOCK";
    TokenType[TokenType["CLOSE_BLOCK"] = 1] = "CLOSE_BLOCK";
    TokenType[TokenType["ASSIGN_OP"] = 2] = "ASSIGN_OP";
    TokenType[TokenType["TYPE_INT"] = 3] = "TYPE_INT";
    TokenType[TokenType["TYPE_STRING"] = 4] = "TYPE_STRING";
    TokenType[TokenType["BOOLVAL"] = 5] = "BOOLVAL";
    TokenType[TokenType["ID"] = 6] = "ID";
    TokenType[TokenType["PLUS"] = 7] = "PLUS";
    TokenType[TokenType["EOP"] = 8] = "EOP";
    TokenType[TokenType["ERROR"] = 9] = "ERROR";
    TokenType[TokenType["IFSTATEMENT"] = 10] = "IFSTATEMENT";
})(TokenType || (TokenType = {}));
class Token {
    constructor(type, value, line, column) {
        this.type = type;
        this.value = value;
        this.line = line;
        this.column = column;
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
//# sourceMappingURL=compiler.js.map