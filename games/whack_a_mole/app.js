document.addEventListener('DOMContentLoaded',() =>{

  const square = document.querySelectorAll('.square');
  const grid = document.querySelector('.grid');
  const timeLeft = document.querySelector('#time');
  let molePositionId = 0;
  let start_time = 60;
  let time = start_time;
  const score = document.querySelector('#score');
  const start = document.querySelector('#start');
  let result = 0;
  let timerId = null;
  let moling = null;


  function randomMole() {
    square.forEach(classname => {
      classname.classList.remove('mole');
    });
    let randomPosition = Math.floor(Math.random() * 9);
    square[randomPosition].classList.add('mole');
    molePositionId = square[randomPosition].id;
  }
  square.forEach( squares => {
    squares.addEventListener('mouseup',() => {
      if(squares.id === molePositionId ){
        result += 1;
        score.innerText = result ;
      }
    })
  });
  function moveMole(){
    let timer = null;
    timer = setInterval(randomMole,1000);
  }

  function countdown() {
    time--;
    timeLeft.innerText = time;
    if ( time == 0){
      clearInterval(timerId);
      clearInterval(moling);
      start.addEventListener('click',start_func);
      alert("Game over");

    }
  }
  function start_func(){
    result = 0;
    time =start_time;
    moling = setInterval(randomMole,1000);
    timerId = setInterval(countdown,1000);
    start.removeEventListener('click',start_func);

 }
 start.addEventListener('click',start_func);
});
