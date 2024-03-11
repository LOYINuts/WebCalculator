// 设置全局变量？计算总值，显示器的buffer，先前的操作符
let runningTotal = 0;
let buffer = "0";
let previousOperator;
// 屏幕
const screen = document.querySelector(".screen");
// 如果是非数字就进行符号处理，如果是数字就进行数字处理
function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}
// 处理符号，撤回和减号乘号是特殊的unicode字符
function handleSymbol(symbol) {
  switch (symbol) {
    case 'C':
      buffer = "0";
      runningTotal = 0;
      break;
    case '=':
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case '←':
      // 撤回就是显示的数字最后一位不要
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case '+':
    // 2212是减号00d7是乘号，特殊的编码
    case '\u2212':
    case '\u00d7':
    case '÷':
      handleMath(symbol);
      break;
  }
}
// 进行数学运算
function handleMath(symbol) {
  if (buffer === '0') {
    return;
  }
  const intBuffer = parseInt(buffer);

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer = '0';
}

function flushOperation(intBuffer) {
  if (previousOperator === '+') {
    runningTotal += intBuffer;
  } else if (previousOperator === '\u2212') {
    runningTotal -= intBuffer;
  } else if (previousOperator === '\u00d7') {
    runningTotal *= intBuffer;
  } else if (previousOperator === '÷') {
    runningTotal /= intBuffer;
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener('click', function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
