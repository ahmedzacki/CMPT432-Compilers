const textInput = document.getElementById("textInput") as HTMLTextAreaElement;
const textOutput = document.getElementById("textOutput") as HTMLTextAreaElement;
const submitBtn = document.getElementById("submitBtn") as HTMLButtonElement;
const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;

textOutput.readOnly = true;

submitBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  textOutput.value = textInput.value;
  if (resetBtn) resetBtn.style.display = "inline-block";
});

resetBtn?.addEventListener("click", (event) => {
  event.preventDefault();
  textInput.value = "";
  textOutput.value = "";
  resetBtn.style.display = "none";
});
