const buttons = document.querySelectorAll("button");

const displayEml = document.querySelector("#result");

const symbols = ["+", "-", "*", "/"];

let textToDisplay = "";

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.innerText;

    displayEml.style.backgroundColor = "";

    const lastChar = textToDisplay[textToDisplay.length - 1];

    if (textToDisplay.length < 1 && symbols.includes(val)) return;
    if (val === "AC") {
      return resetDisplay();
    }

    // if operator already exists, replace it with new onw

    if (symbols.includes(lastChar) && symbols.includes(val)) {
      textToDisplay = textToDisplay.slice(0, -1);
    }

    if (val === "." && textToDisplay.includes(".")) return;

    if (val === "=") {
      if (symbols.includes(lastChar)) {
        textToDisplay = textToDisplay.slice(0, -1);
      }
      ontotal();
      return;
    }

    if (val === "C") {
      textToDisplay = textToDisplay.slice(0, -1);
      return display(textToDisplay);
    }
    textToDisplay += val;
    display(textToDisplay);
  });
});

const display = (toDisplay) => {
  displayEml.innerText = toDisplay || "0.00";
};

const ontotal = () => {
  const prankNum = randomNumber();
  if (prankNum > 0) {
    displayEml.style.backgroundColor = "red";
    displayEml.classList.add("prank");
    displayEml.addEventListener("animationend", () => {
      displayEml.classList.remove("prank");
    });
  }
  const total = eval(textToDisplay) + prankNum;

  display(total);
  textToDisplay = "";
};

const resetDisplay = () => {
  display(0.0);

  textToDisplay = "";
};

const randomNumber = () => {
  const num = Math.round(Math.random() * 10);
  return num < 8 ? num : 0;
};
