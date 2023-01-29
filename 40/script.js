// flag and constants global
let inputModeFlag = false;
const pointerObj = {};
const FILL_RECT_OFFSET = 25;
const FILL_RECT_WIDTH = 50;
const FILL_RECT_HEIGHT = 50;

// canvas setup
const canvasNode = document.createElement("canvas");
canvasNode.id = "my-canvas";
const ctx = canvasNode.getContext("2d");

// canvas container setup
const containerNode = document.createElement("div");
containerNode.style.display = "flex";
containerNode.style.gap = "1rem";
containerNode.style.maxWidth = "600px";
containerNode.style.marginBottom = "10px";
document.body.appendChild(containerNode);
containerNode.appendChild(canvasNode);

// Image setup
const imgObj = new Image(600, 400);
imgObj.onload = drawImage;
imgObj.style.objectFit = "cover";
imgObj.src = "img.jpg";

/**
 * @description Draws Image to canvas
 */
function drawImage() {
  canvasNode.width = this.width;
  canvasNode.height = this.height;
  ctx.drawImage(this, 0, 0, this.width, this.height);
}

canvasNode.addEventListener("click", function (e) {
  if (inputModeFlag) return;

  const mouseX = parseInt(e.clientX - this.offsetLeft);
  const mouseY = parseInt(e.clientY - this.offsetTop);

  if (pointerObj[`${mouseX}_${mouseY}`] !== undefined) return;
  const data = {
    x: mouseX - FILL_RECT_OFFSET,
    y: mouseY - FILL_RECT_OFFSET,
    w: FILL_RECT_WIDTH,
    h: FILL_RECT_HEIGHT,
  };

  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.fillRect(
    mouseX - FILL_RECT_OFFSET,
    mouseY - FILL_RECT_OFFSET,
    FILL_RECT_WIDTH,
    FILL_RECT_HEIGHT
  );
  ctx.beginPath();
  ctx.fillStyle = "rgb(255, 99, 71)";
  ctx.rect(
    mouseX - FILL_RECT_OFFSET,
    mouseY - FILL_RECT_OFFSET,
    FILL_RECT_WIDTH,
    FILL_RECT_HEIGHT
  );
  ctx.stroke();

  const inputNode = document.createElement("input");
  const buttonNode = document.createElement("button");
  buttonNode.textContent = "Save Tag";

  document.body.appendChild(inputNode);
  document.body.appendChild(buttonNode);

  inputModeFlag = true;

  inputNode.focus();

  buttonNode.addEventListener("click", () => {
    data["label"] = inputNode.value;
    pointerObj[`${mouseX}_${mouseY}`] = data;
    inputModeFlag = false;
    buttonNode.remove();
    inputNode.remove();
  });
});

const mouseOverEventHandler = debounce((e) => {
  const threshold = Math.round((Math.sqrt(2) * FILL_RECT_WIDTH + 5) / 2);
  const x1 = parseInt(e.clientX - canvasNode.offsetLeft);
  const y1 = parseInt(e.clientY - canvasNode.offsetTop);

  for (const [key, value] of Object.entries(pointerObj)) {
    const x2 = value.x + FILL_RECT_OFFSET;
    const y2 = value.y + FILL_RECT_OFFSET;

    const distance = calculateDistance(x1, x2, y1, y2);

    if (distance <= threshold) {
      if (
        [...containerNode.childNodes].every(
          (child) => child.id !== `tooltip_${key}`
        )
      ) {
        const tooltipNode = document.createElement("div");
        tooltipNode.id = `tooltip_${key}`;
        tooltipNode.style.zIndex = "10";
        tooltipNode.style.position = "absolute";
        tooltipNode.style.borderRadius = "80px";
        tooltipNode.style.border = "1px solid black";
        tooltipNode.style.backgroundColor = "rgba(255,255,255,0.4)";
        tooltipNode.style.padding = "2px 6px";

        tooltipNode.style.top = `${parseInt(value.y - FILL_RECT_OFFSET + 10)}px`;
        tooltipNode.style.left = `${parseInt(value.x)}px`;

        tooltipNode.textContent = value.label;
        containerNode.appendChild(tooltipNode);
      }
    } else {
      containerNode.childNodes.forEach((child) => {
        if (child.id === `tooltip_${key}`) {
          child.remove();
        }
      });
    }
  }
}, 500);

canvasNode.addEventListener("mousemove", mouseOverEventHandler);

/**
 *
 * @param {Function} cb
 * @param {number} delay
 */
function debounce(cb, delay = 1000) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => cb.apply(this, args), delay);
  };
}

/**
 *
 * @param {Number} x1
 * @param {Number} x2
 * @param {Number} y1
 * @param {Number} y2
 * @returns {Number}
 */
function calculateDistance(x1, x2, y1, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
