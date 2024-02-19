import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Lexer {
    private final String source;
    private final List<Token> tokens = new ArrayList<>();
    private static final Map<String, TokenType> keywords;
    private int start = 0;
    private int current = 0;
    private int line = 1;

    Lexer(String source) {
        this.source = source;
    }

    List<Token> scanTokens() {
        while (!isAtEnd()) {
            // We are at the beginning of the next character
            start = current;
            lex();
        }

        tokens.add(new Token(TokenType.EOF, "", null, line));
        return tokens;
    }

    private void lex() {
        char c = moveToNextChar();
        switch (c) {
            case '(':
                addToken(TokenType.LEFT_PAREN);
                break;
            case ')':
                addToken(TokenType.RIGHT_PAREN);
                break;
            case '{':
                addToken(TokenType.LEFT_BRACE);
                break;
            case '}':
                addToken(TokenType.RIGHT_BRACE);
                break;
            case ',':
                addToken(TokenType.COMMA);
                break;
            case '.':
                addToken(TokenType.DOT);
                break;
            case '-':
                addToken(TokenType.MINUS);
                break;
            case '+':
                addToken(TokenType.PLUS);
                break;
            case ';':
                addToken(TokenType.SEMICOLON);
                break;
            case '*':
                addToken(TokenType.STAR);
                break;
            case '!':
                addToken(match('=') ? TokenType.BANG_EQUAL : TokenType.BANG);
                break;
            case '=':
                addToken(match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL);
                break;
            case '<':
                addToken(match('=') ? TokenType.LESS_EQUAL : TokenType.LESS);
                break;
            case '>':
                addToken(match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER);
                break;
            case '/':
                if (match('/')) {
                    // A comment goes until the end of the line.
                    while (getNextChar() != '\n' && !isAtEnd())
                        moveToNextChar();
                } else {
                    addToken(TokenType.SLASH);
                }
                break;
            case ' ':
            case '\r':
            case '\t':
                // Ignore whitespace.
                break;

            case '\n':
                line++;
                break;
            // taking care of strings here
            case '"':
                string();
                break;
            default:
                if (isDigit(c)) {
                    number();

                } else if (isAlpha(c)) {
                    identifier();

                } else {
                    handleError(start, current, line, "Unexpected token");
                    break;
                }

        }
    }

    static {
        keywords = new HashMap<>();
        keywords.put("and", TokenType.AND);
        keywords.put("class", TokenType.CLASS);
        keywords.put("else", TokenType.ELSE);
        keywords.put("false", TokenType.FALSE);
        keywords.put("for", TokenType.FOR);
        keywords.put("fun", TokenType.FUN);
        keywords.put("if", TokenType.IF);
        keywords.put("nil", TokenType.NIL);
        keywords.put("or", TokenType.OR);
        keywords.put("print", TokenType.PRINT);
        keywords.put("return", TokenType.RETURN);
        keywords.put("super", TokenType.SUPER);
        keywords.put("this", TokenType.THIS);
        keywords.put("true", TokenType.TRUE);
        keywords.put("var", TokenType.VAR);
        keywords.put("while", TokenType.WHILE);
    }

    private void identifier() {
        while (isAlphaNumeric(getNextChar())) moveToNextChar(); // Scans the whole identifier/keyword

        // Initially assumes the whole text is an identifier
        String text = source.substring(start, current);
        System.out.println(text + " " + start + " " + current);
        TokenType type = keywords.get(text);

        if (type == null) { // If not a keyword, process as a complex identifier
            
            while (start < current) {
                int tempCurrent = start;
                String window = "";
                String validWindow = "";
                Token tempToken = null;
                boolean flag = false;
                // int end = 0;
                
                while (tempCurrent < current) {
                    
                    char currentChar = source.charAt(tempCurrent);
                    window += currentChar;

                    // here we hanlde the cases when we come accross a number
                    if (window.length() == 1 && Character.isDigit(window.charAt(0))) {

                        // set flag to true
                        flag = true;
                        // we know we are at the beggining of a number 
                        System.out.println("window: "+window + " Start: " + start + " tempCurrent: " + tempCurrent + " Current: " + current );

                        // Adjust the scanner state to process the number
                        int temp = current;
                        current = start; // Point 'current' to the start of the number
                        // start = tempCurrent;
                        number(); // Process the number
                        start = current;
                        tempCurrent = current;
                        current = temp;
                        System.out.println("window: "+window + " Start: " + start + " tempCurrent: " + tempCurrent + " Current: " + current );
                        continue;
                    }

                    // assuming the length of the current temporary token is less than the one we are scanning
                    // check if the keyword exists 
                    if (tempToken == null) {
                        tempToken = new Token(TokenType.IDENTIFIER, window, window, line);
                        validWindow = window;
                    }
                    TokenType tempType = keywords.get(window);
                    if (tempType != null) {
                        System.err.println(window);
                        tempToken = new Token(tempType, window, window, line);
                        validWindow = window;
                    }
                    
                    tempCurrent++;
                }
                // now we can add the tempToken to our actual token list
                // updating current here to get the correct valid window string for the token
                // before we do that we need to check if the token has already been created or not
                if (flag){
                    continue;
                } else {
                    int temp = current;
                    current = start + validWindow.length();
                    addToken(tempToken.type, validWindow);
                    start = current;
                    current = temp;
                    System.out.println("window: "+window + " Start: " + start + " tempCurrent: " + tempCurrent + " Current: " + current );

                    System.out.println(tempToken.lexeme);
                }
            }
        } else {
            // Directly add the keyword if found
            addToken(type, text);
        }
    }

    private void number() {
        System.out.println("------entered number function   "+start + " " + current);
        while (isDigit(getNextChar()))
            moveToNextChar();

        // Look for a fractional part.
        if (getNextChar() == '.' && isDigit(peekNext())) {
            // Consume the "."
            moveToNextChar();

            while (isDigit(getNextChar()))
                moveToNextChar();
        }
        System.out.println(source.substring(start, current));
        System.out.println("********** finishing number function   "+start + " " + current);
        addToken(TokenType.NUMBER, Double.parseDouble(source.substring(start, current)));
    }

    private void string() {
        while (getNextChar() != '"' && !isAtEnd()) {
            if (getNextChar() == '\n')
                line++;
            moveToNextChar();
        }

        if (isAtEnd()) {
            handleError(start, current, line, "Unterminated string.");
            return;
        }

        // The closing ".
        moveToNextChar();

        // Trim the surrounding quotes.
        String value = source.substring(start + 1, current - 1);
        addToken(TokenType.STRING, value);

    }

    private boolean match(char expected) {
        if (isAtEnd())
            return false;
        if (source.charAt(current) != expected)
            return false;

        current++;
        return true;
    }

    private char getNextChar() {
        if (isAtEnd())
            return '\0';
        return source.charAt(current);
    }

    private boolean isAlpha(char c) {
        return (c >= 'a' && c <= 'z') ||
                (c >= 'A' && c <= 'Z') ||
                c == '_';
    }

    private boolean isAlphaNumeric(char c) {
        return isAlpha(c) || isDigit(c);
    }

    private char peekNext() {
        if (current + 1 >= source.length())
            return '\0';
        return source.charAt(current + 1);
    }

    private boolean isDigit(char c) {
        return c >= '0' && c <= '9';
    }

    private boolean isAtEnd() {
        return current >= source.length();
    }

    private char moveToNextChar() {
        return source.charAt(current++);
    }

    private void addToken(TokenType type) {
        addToken(type, null);
    }

    private void addToken(TokenType type, Object literal) {

        String text = source.substring(start, current);
        tokens.add(new Token(type, text, literal, line));

    }

    private void handleError(int start, int current, int line, String description) {

        if (description == "Unterminated string") {
            System.out.println("ERROR: Unterminated string  found at line: " + line);
        } else {
            String text = source.substring(start, current);
            System.out.println("Unexpected token (" + text + ")" + "found at line" + line);
        }

    }

}