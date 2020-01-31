import './assets/style.css';

const state = {
  current: {
    var1: '',
    var2: '',
    symbol: '',
    result: ''
  }
}

const onClickBtn = (e) => {
  const symbol = e.target.dataset.value;
  if(Number.parseInt(symbol)) {
    console.log(Number.parseInt(symbol));
  }
}




document.querySelectorAll('.input-btn').forEach(elem => elem.addEventListener('click',onClickBtn));

