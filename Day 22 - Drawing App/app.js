const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const increaseMoreBtn = document.getElementById("increasemore");
const decreaseBtn = document.getElementById("decrease");
const decreaseMoreBtn = document.getElementById("decreasemore");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEL = document.getElementById("clear");
const ctx = canvas.getContext("2d");

let size = 10;
let isPressed = false;
let color = "black";
let x;
let y;

window.onload = function () {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 800, 800);
};

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;

  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function updateSizeOnScreen() {
  sizeEl.innerText = size;
}

function DownloadCanvasAsImage() {
  let downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", "CanvasAsImage.jpeg");
  let dataURL = canvas.toDataURL("image/jpeg");
  let url = dataURL.replace(
    /^data:image\/jpeg/,
    "data:application/octet-stream"
  );
  downloadLink.setAttribute("href", url);
  downloadLink.click();
  alert("You image has been downloaded :)");
}

increaseBtn.addEventListener("click", () => {
  size += 1;
  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
});

increaseMoreBtn.addEventListener("click", () => {
  size += 5;
  if (size > 50) {
    size = 50;
  }

  updateSizeOnScreen();
});

decreaseBtn.addEventListener("click", () => {
  size -= 1;
  if (size < 1) {
    size = 1;
  }

  updateSizeOnScreen();
});

decreaseMoreBtn.addEventListener("click", () => {
  size -= 5;
  if (size < 1) {
    size = 1;
  }

  updateSizeOnScreen();
});

colorEl.addEventListener("change", (e) => (color = e.target.value));

clearEL.addEventListener("click", () => {
  let text =
    "Press OK if you want to delete your drawing\nPress Cancel if you do not want to delete your drawing";
  if (confirm(text) === true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    return;
  }
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
});
