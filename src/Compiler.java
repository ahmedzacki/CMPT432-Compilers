import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class Compiler {
    public static void main(String[] args) throws Exception {
        System.out.println("Compiler started.....");

        String filePath = "input.txt";

        try {
            // Reading the entire file as a single String
            String source = new String(Files.readAllBytes(Paths.get(filePath)));
            // Now 'source' contains the entire contents of the file
            Lexer scanner = new Lexer(source);
            List<Token> tokens = scanner.scanTokens();
            // Now let's print the tokens
            for (Token token : tokens) {
                System.out.println("   " + token.type + "  --->  " +  token.lexeme + "  found at line: "+ token.line);
            }
            
        } catch (IOException e) {
            System.err.println("An error occurred while reading the file: " + e.getMessage());
        }
        
    }
  
}
