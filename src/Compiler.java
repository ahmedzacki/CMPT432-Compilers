import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class Compiler {
    public static void main(String[] args) throws Exception {
        System.out.println("Compiler started.....");

        String filePath = "../input.txt";

        int errorCount = 0;
        int programCount = 1;

        try {
            // Reading the entire file as a single String
            String source = new String(Files.readAllBytes(Paths.get(filePath)));
            // Now 'source' contains the entire contents of the file
            Lexer scanner = new Lexer(source);
            List<Token> tokens = scanner.scanTokens();
            // Now let's print the tokens
            System.out.println("INFO Lexer - Lexing program { " + programCount + " }");
            for (Token token : tokens) {
                if (token.type == TokenType.EOP) {
                    programCount++;
                    System.out.println("Debug" + " Lexer - " + token.type + " [ " + token.lexeme + " ] found at ("
                            + token.line + ")");
                    System.out.println("INFO " + "Lexer - " + "Lex " + "completed with " + errorCount + "errors");
                    System.out.println("INFO Lexer - Lexing program { " + programCount + " }");
                    errorCount = 0;
                } else if (token.type == TokenType.ERROR) {
                    errorCount++;
                    System.out.println("ERROR" + " Lexer - " + token.type + " found at line : " + token.line
                            + ": Unrecognized Token: " + token.lexeme);
                } else
                    System.out.println("Debug" + " Lexer - " + token.type + " [ " + token.lexeme + " ] found at ("
                            + token.line + ")");
            }
        } catch (IOException e) {
            System.err.println("An error occurred while reading the file: " + e.getMessage());
        }

    }

}

    