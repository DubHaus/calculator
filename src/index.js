import './assets/style.css';
import render from './render'

const state = {
  _current: {
    var1: '',
    var2: '',
    symbol: '',
    result: 0
  },
  get current() {
    return this._current;
  },
  set current(value) {
    render(value);
    this._current = {
      ...this._current,
      ...value
    }
  }
}

const onClickBtn = (e) => {
  const char = e.target.dataset.value;

  if (isNumber(char)) state.current = setNumberToState(char);
  else if (char == '=') {
    state.current = {
      result: reduceNumber(countResult())
    }
  }
  else if (isUnary(char)) state.current = countCurrentVariables(char);
  else if (char == 'C') cleanInput();
  else state.current = setSymbolToState(char);
}

const reduceNumber = num => {
  if (num.toString().length > 10) return num.toFixed(4)
  return num
}

const setSymbolToState = symbol => {
  const { result } = state.current;
  if (result) {
    cleanCurrentState('var2', 'result');
    return { var1: result, symbol }

  } else return { symbol }
}

const cleanCurrentState = (...keys) => {
  keys.map((key) => state.current = { [key]: '' })
}

const cleanInput = () => {
  const { symbol, var2, result } = state.current;
  if (result) cleanCurrentState('var1', 'var2', 'symbol', 'result');

  else if (symbol) {
    if (!var2) cleanCurrentState('symbol')
    else cleanCurrentState('var2')
  } else {
    cleanCurrentState('var1')
  }
}

const isNumber = char => (!isNaN(Number.parseInt(char)) || char === '.');

const isUnary = char => {
  return char == '%' || char == 'sqrt'
    || char == '+-';
}

const setNumberToState = num => {
  const { current } = state;
  if (current.result) {
    cleanInput();
    return concatNumbers('var1', num)
  }
  return current.symbol ?
    concatNumbers('var2', num) :
    concatNumbers('var1', num)
}

const concatNumbers = (current, newNum) => {
  if (newNum === '.') return {
    [current]: `${state.current[current]}${newNum}`
  }
  else return {
    [current]: Number.parseFloat(`${state.current[current]}${newNum}`)
  }
}



const countResult = () => {
  const { var1, var2, symbol } = state.current;

  if (!var2) return '';
  switch (symbol) {
    case '+':
      return var1 + var2;
    case '-':
      return var1 - var2;
    case '/':
      return var1 / var2;
    case '*':
      return var1 * var2;
  }
}

const countCurrentVariables = symbol => {
  let { var2, result } = state.current;

  if (result) return countCurrentVar(symbol, 'result')
  else return var2 ?
    countCurrentVar(symbol, 'var2') :
    countCurrentVar(symbol, 'var1');
}

const countCurrentVar = (symbol, variable) => {
  const currentVar = state.current[variable];

  switch (symbol) {
    case '%':
      return { [variable]: reduceNumber(currentVar / 100) }
    case 'sqrt':
      return { [variable]: reduceNumber(Math.sqrt(currentVar)) };
    case '+-':
      return { [variable]: -currentVar };
    default:
      return '';
  }
}



document.querySelectorAll('.input-btn').forEach(elem => elem.addEventListener('click', onClickBtn));

