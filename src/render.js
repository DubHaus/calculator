const var1 = document.getElementById('output-history-1');
const var2 = document.getElementById('output-history-2');
const symbol = document.getElementById('output-symbol');
const result = document.getElementById('output-main');

const dataOutput = (output, value) => {
  switch (output) {
    case 'var1':
      var1.innerText = value;
      break;
    case 'var2':
      var2.innerText = value;
      break;
    case 'symbol':
      symbol.innerText = renderSymbol(value)
      break;
    case 'result': result.innerText = value
  }
}

const renderSymbol = value => {
  switch (value) {
    case '*': return '\u00D7';
    case '/': return '\u00F7';
    default : return value
  }
}

const render = value => {
  Object.entries(value).map(el => dataOutput(...el));
}

export default render;