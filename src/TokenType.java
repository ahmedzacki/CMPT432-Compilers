public enum TokenType {
        // Single-character tokens.
        LEFT_PAREN, RIGHT_PAREN, OPEN_BLOCK, CLOSE_BLOCK,
    COMMA, DOT, MINUS, PLUS, SEMICOLON, SLASH, STAR, EOP, SPACE,

        // One or two character tokens.
        NOT, NOT_EQUAL,
        ASSIGN, EQUAL,
        GREATER_THAN, GREATER_THAN_OR_EQUAL,
        LESS_THAN, LESS_THAN_OR_EQUAL,

        // Literals.
        IDENTIFIER, STRING, NUMBER, BOOLEAN,

        // Keywords.
        AND, CLASS, ELSE, FALSE, FOR, IF, OR,
    PRINT, RETURN, SUPER, THIS, TRUE, WHILE, INT_KEYWORD, STRING_KEYWORD,
        
    // Error handling TokenType
    ERROR
    }