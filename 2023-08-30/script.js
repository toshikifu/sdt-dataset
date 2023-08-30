// RGB値をヘックス値に変換する関数
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// 正解のRGB値をランダムに生成する関数
function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return {
      rgb: `rgb(${r}, ${g}, ${b})`,
      hex: rgbToHex(r, g, b)
  };
}

// 正解のRGB値と選択されたRGB値の差を計算して得点に変換する関数
function calculateScore(correctColorHex, pickedColor) {
  const hexToRgb = hex => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b];
  };

  const correctRGB = hexToRgb(correctColorHex);
  const pickedRGB = hexToRgb(pickedColor);
  const diff = correctRGB.reduce((acc, val, index) => acc + Math.abs(val - pickedRGB[index]), 0);
  const score = Math.round((1 - diff / 765) * 100);
  return score;
}

// ゲームの初期設定を行う関数
function setupGame() {
  const targetColorDiv = document.getElementById("target-color");
  const colors = generateRandomColor();
  targetColorDiv.style.backgroundColor = colors.rgb;

  return colors.hex;
}

const correctColorHex = setupGame();

// "Guess" ボタンのイベントリスナー設定
document.getElementById("guess-btn").addEventListener("click", function() {
  const pickedColor = document.getElementById("color-picker").value;
  const feedback = document.getElementById("feedback");
  const score = calculateScore(correctColorHex, pickedColor);

  feedback.textContent = `あなたの得点は: ${score}点`;
  feedback.style.color = score > 80 ? "green" : (score > 50 ? "orange" : "red");
});

document.getElementById("color-picker").addEventListener("input", function() {
  const pickedColorDiv = document.getElementById("picked-color");
  pickedColorDiv.style.backgroundColor = this.value;
});
