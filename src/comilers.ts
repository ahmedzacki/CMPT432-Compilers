import { Lexer } from "./Lexer";

const textInput = document.getElementById("textInput") as HTMLTextAreaElement;
const textOutput = document.getElementById("textOutput") as HTMLTextAreaElement;
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;

textOutput.readOnly = true;

submitBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  const myLexer = new Lexer(textInput.value);
  textOutput.value = myLexer;
  if (resetBtn) resetBtn.style.display = "inline-block";
});

resetBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  textInput.value = "";
  textOutput.value = "";
  resetBtn.style.display = "none";
});
