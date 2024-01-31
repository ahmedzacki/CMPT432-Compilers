"use strict";
const textInput = document.getElementById("textInput");
const textOutput = document.getElementById("textOutput");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
textOutput.readOnly = true;
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    textOutput.value = textInput.value;
    if (resetBtn)
        resetBtn.style.display = "inline-block";
});
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener("click", (event) => {
    event.preventDefault();
    textInput.value = "";
    textOutput.value = "";
    resetBtn.style.display = "none";
});
//# sourceMappingURL=comilers.js.map