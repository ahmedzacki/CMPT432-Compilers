## Compiler-project-Java

This is a custom compiler project designed for educational purposes. It focuses on the lexical analysis of source code according to the grammar specified [here](https://www.labouseur.com/courses/compilers/grammar.pdf). This project is the first step in building a complete compiler, focusing solely on lexing input source code with detailed error and warning messages.

## Project Structure

- `src/`: Contains all source code files for the compiler.
- `README.md`: Provides project documentation.

## Requirements

- Java JDK 8 or newer.
- The source code to be compiled must adhere to the specified grammar and be provided as input.

## Project Status
The project is still in progress. The first part (Project One) has been completed, and the other parts are yet to be done.

## Credits
This project is developed following the guidelines provided by my professor, [Alan Labouseur](https://www.labouseur.com/). The final testing of the compiler will be done on an operating system here https://www.labouseur.com/commondocs/operating-systems/CyberCore/index.html.

The project will consist of the following 4 parts:

## Part One: Build an interesting lexer.

- Step 1: Making tokens with your Lexer

- Step 2: More token making, now with Finite Automata

## Part Two: Build an interesting parser and CST.

- Step 3: Turning tokens into sentences with your Parser

- Step 4: Analyzing Grammars

- Step 5: Building Syntax Trees both Concrete and Abstract

## Part Three: Adding an AST and Semantic Analysis.

- Step 5: Building Syntax Trees both Concrete and Abstract

- Step 6: Symbol tables and you (and your compiler)

- Step 7: Semantic Analysis: Checking scope and type

## Part Four: A full compiler, with 6502a code generation.

- Step 8: Generating Code

- Step 9: Manipulating Grammars

Here are some Operating Systems on which to test your generated code: https://www.labouseur.com/commondocs/operating-systems/CyberCore/index.html

## Getting Started

### Setting Up Your Environment

Ensure Java JDK is installed on your system and the `java` and `javac` commands are available in your system's PATH.

### Compiling the Project

Navigate to the src directory and compile the compiler using the following command:

```bash
javac Compiler.java
java Compiler <name of the file you want to compile (place your file in the testcases folder)>
```
