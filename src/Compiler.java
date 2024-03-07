import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class Compiler {
    public static void main(String[] args) throws Exception {
        System.out.println("Compiler started.....");

        if (args.length < 1) {
            System.err.println("Usage: java Compiler <testcase filename>");
            return;
        }

        String testcaseFolder = "testcases"; 
        String fileName = args[0]; // Reading file name from command line argument
        String filePath = "../" + testcaseFolder + "/" + fileName; // Constructing the file path for the test case

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
            for (int i = 0; i < tokens.size(); i++) {
                Token token = tokens.get(i);
                if (token.type == TokenType.EOP) {
                    programCount++;
                    System.out.println("Debug Lexer - " + token.type + " [ " + token.lexeme + " ] found at line ("
                            + token.line + ")");
                    System.out.println("INFO Lexer - Lex completed with " + errorCount + " errors");

                    // Check if this EOP token is the last token by comparing index positions
                    if (i != tokens.size() - 1) {
                        // The current token (EOP) is not last token in the whole file
                        // Then we start preparing for lexing the next program
                        System.out.println();
                        System.out.println("INFO Lexer - Lexing program { " + programCount + " }");
                    }
                    errorCount = 0;
                } else if (token.type == TokenType.ERROR) {
                    errorCount++;
                    System.out.println("ERROR" + " Lexer - " + token.type + " found at line : " + token.line
                            + " : Unrecognized Token: " + token.lexeme);
                } else
                    System.out.println("Debug" + " Lexer - " + token.type + " [ " + token.lexeme + " ] found at line ("
                            + token.line + ")");
            }
            System.out.println();
            System.out.println("------END of FILE------");
        } catch (IOException e) {
            System.err.println("An error occurred while reading the file: " + e.getMessage());
        }
    }
}
