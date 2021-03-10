function creatDivTd(divTr, qttPixel) {
  for (let i = 1; i <= qttPixel; i += 1) {
    const divTd = document.createElement('div');
    divTd.className = 'pixel';
    divTr.appendChild(divTd);
  }
}

function generatorPixels(qttPixel) {
  const pixelBoard = document.getElementById('pixel-board');
  for (let i = 1; i <= qttPixel; i += 1) {
    const divTr = document.createElement('div');
    divTr.className = 'tr';
    creatDivTd(divTr, qttPixel);
    pixelBoard.appendChild(divTr);
  }
}

function clearSelected() {
  const colorDiv = document.querySelectorAll('.color');
  colorDiv.forEach((e) => {
    if (e.className === 'color selected') e.className = 'color';
  });
}

function addEventColorSelected() {
  const colorDivEvent = document.querySelectorAll('.color');
  colorDivEvent.forEach((element) => {
    element.addEventListener('click', (event) => {
      clearSelected();
      event.target.classList.add('selected');
    });
  });
}

function addEventColorInPixel() {
  const divPixel = document.querySelectorAll('.pixel');
  divPixel.forEach((element) => {
    element.addEventListener('click', (event) => {
      const divColor = document.querySelector('.selected');
      const color = getComputedStyle(divColor).backgroundColor;
      event.target.style.backgroundColor = color;
    });
  });
}

function claerPixels() {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((e) => {
    e.style.backgroundColor = 'white';
  });
}

function clearChildsPixelBoard() {
  const pixelBoard = document.querySelector('#pixel-board');
  const qtt = pixelBoard.childNodes.length;
  for (let i = qtt; i > 0; i -= 1) {
    pixelBoard.lastElementChild.remove();
  }
}

function bordUpdate(number) {
  claerPixels();
  clearChildsPixelBoard();
  generatorPixels(number);
  addEventColorInPixel();
}

function generatePixels() {
  const qttBorderSize = document.querySelector('#board-size').value;
  if (qttBorderSize === '') {
    alert('Board inválido!');
  } else if (qttBorderSize <= 5) {
    bordUpdate(5);
  } else if (qttBorderSize >= 50) {
    bordUpdate(50);
  } else {
    bordUpdate(qttBorderSize);
  }
}

function btnConfig() {
  const btnclear = document.getElementById('clear-board');
  const btngGnerateboard = document.getElementById('generate-board');
  btnclear.addEventListener('click', claerPixels);
  btngGnerateboard.addEventListener('click', generatePixels);
}

function randomcNumber() {
  return Math.floor(Math.random() * (208 - 87 +1)) + 87;
}

function generatorColor() {
  const color = `rgb(${randomcNumber()}, ${randomcNumber()}, ${randomcNumber()})`;
  return color;
}

function istrueColor(color) {
  let divColor  = document.querySelectorAll('.color');
  divColor.forEach((e)=>{
    if(e.style.backgroundColor === color) {
      return false;
    }
  })
  return true;
}

function addColorPalette(qtt) {
  let divColorPallete = document.getElementById('color-palette');
  for (let i = 1; i <= qtt; i += 1) {
    const divColor = document.createElement('div');
    let color = generatorColor();
    let isColorTrue = istrueColor(color);
    divColor.classList.add('color');
    if (isColorTrue) {
      divColor.style.backgroundColor = color;
    }
    divColorPallete.appendChild(divColor);
  }
}

addColorPalette(3);
generatorPixels(5);
addEventColorSelected();
addEventColorInPixel();
btnConfig();
