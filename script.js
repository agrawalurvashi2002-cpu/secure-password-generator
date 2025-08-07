const passwordBox = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("length-value");
const strengthLabel = document.getElementById("strength").querySelector("span");

lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

function generatePassword() {
  const length = lengthSlider.value;
  const upper = document.getElementById("uppercase").checked;
  const lower = document.getElementById("lowercase").checked;
  const number = document.getElementById("numbers").checked;
  const symbol = document.getElementById("symbols").checked;

  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let allChars = "";
  if (upper) allChars += upperChars;
  if (lower) allChars += lowerChars;
  if (number) allChars += numberChars;
  if (symbol) allChars += symbolChars;

  if (allChars === "") {
    alert("Please select at least one option.");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randIndex];
  }

  passwordBox.value = password;
  updateStrength(password);
}

function copyPassword() {
  passwordBox.select();
  document.execCommand("copy");
  alert("Password copied to clipboard!");
}

function updateStrength(password) {
  let strength = "Weak";
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const score = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;

  if (password.length >= 12 && score >= 3) strength = "Strong";
  else if (password.length >= 8 && score >= 2) strength = "Medium";

  strengthLabel.textContent = strength;
}
