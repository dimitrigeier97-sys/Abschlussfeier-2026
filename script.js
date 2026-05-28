const wheel = document.querySelector("#wheel");
const spinButton = document.querySelector("#spinButton");
const result = document.querySelector("#result");
const spinCount = document.querySelector("#spinCount");
const winCount = document.querySelector("#winCount");

let currentRotation = 0;
let spins = 0;
let wins = 0;
let isSpinning = false;

function randomInt(maxExclusive) {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0] % maxExclusive;
}

function getTargetAngle(isWinner) {
  if (isWinner) {
    return randomInt(18);
  }

  const losingSlices = [45, 95, 142, 194, 247, 306];
  return losingSlices[randomInt(losingSlices.length)] + randomInt(20) - 10;
}

function spinWheel() {
  if (isSpinning) return;

  isSpinning = true;
  spinButton.disabled = true;
  result.className = "result";
  result.textContent = "Der Chip rollt über den Filz...";

  const isWinner = randomInt(20) === 0;
  const targetAngle = getTargetAngle(isWinner);
  const fullSpins = 5 + randomInt(4);
  const normalizedRotation = currentRotation % 360;
  const deltaToTarget = (360 - targetAngle - normalizedRotation + 360) % 360;
  currentRotation += fullSpins * 360 + deltaToTarget;

  wheel.style.transform = `rotate(${currentRotation}deg)`;

  window.setTimeout(() => {
    spins += 1;
    spinCount.textContent = spins;

    if (isWinner) {
      wins += 1;
      winCount.textContent = wins;
      result.className = "result result--win";
      result.textContent = "Jackpot! Glück gehabt - dieser Dreh ist ein Gewinner.";
    } else {
      result.textContent = "Knapp vorbei. Noch einmal drehen und das Glück herausfordern.";
    }

    isSpinning = false;
    spinButton.disabled = false;
    spinButton.focus();
  }, 4500);
}

spinButton.addEventListener("click", spinWheel);
