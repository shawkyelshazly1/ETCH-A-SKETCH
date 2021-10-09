let gridSizeScale = document.querySelector("#grid_size_scale");
let gridSizeText = document.querySelector(".grid_size");
let gridSize = 16;
let sketchGrid = document.querySelector(".sketch");
let colorPicker = document.querySelector("#color_picker");
let colorPicked = "#474747";
let eraserBtn = document.querySelector(".eraser");
let rainbowBtn = document.querySelector(".rainbow_mode");
let colorBtn = document.querySelector(".color_mode");
let mode = "colors";

let btns = [eraserBtn, rainbowBtn, colorBtn];

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btns.forEach((e) => {
      e.classList.remove("selected_btn");
    });
    e.target.classList.add("selected_btn");

    switch (e.target.getAttribute("data-mode")) {
      case "colors":
        mode = "colors";
        break;
      case "rainbow":
        mode = "rainbow";
        break;
      case "eraser":
        mode = "eraser";
    }
  });
});

colorPicker.addEventListener("change", (e) => {
  colorPicked = e.target.value;
});

gridSizeScale.addEventListener("change", (e) => {
  gridSize = e.target.value;
  changeGridSize(gridSize);
});

gridSizeScale.addEventListener("mousemove", (e) => {
  gridSizeText.textContent = `${e.target.value}  x  ${e.target.value}`;
});

function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
}

function changeDivColor(e) {
  if (mode == "colors") {
  }
  switch (mode) {
    case "colors":
      e.target.style.backgroundColor = colorPicked;
      break;
    case "eraser":
      e.target.style.backgroundColor = "white";
      break;
    case "rainbow":
      e.target.style.backgroundColor = random_rgba();
      break;
  }
}

function changeGridSize(size) {
  sketchGrid.textContent = "";
  sketchGrid.style.setProperty("grid-template-columns", `repeat(${size},1fr)`);
  sketchGrid.style.setProperty("grid-template-rows", `repeat(${size},1fr)`);
  for (let i = gridSize; i > 0; --i) {
    for (let j = gridSize; j > 0; --j) {
      let div = document.createElement("div");

      div.addEventListener("mouseover", (e) => {
        changeDivColor(e);
      });
      sketchGrid.appendChild(div);
    }
  }
}

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  changeGridSize(gridSize);
});

window.onload = () => {
  changeGridSize(gridSize);
};
