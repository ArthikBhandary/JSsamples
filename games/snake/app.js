document.addEventListener('DOMContentLoaded',() => {
  const squares = document.querySelectorAll('.grid div');
  const score = document.querySelector('#score');
  const startBtn = document.querySelector('#start');
  const width = 10;
  const playSize = width * width;
  let snake = [2,1,0];
  let timeInterval = 500;

  let direction = 1;
  let prevDirection = 1;
  let scoreTally = 0;
  let speed = 0.9;
  let apple = 0;
  let interval = 0;
  let tail = 0;
  function stop(){
    clearInterval(interval);
    startBtn.innerText = 'Start';
  }

  function start(){
    snake.forEach(ind => squares[ind].classList.remove('snake','bottomright','bottomleft','topleft','topright'));
    startBtn.innerText = 'Restart';
    //squares[apple].classList.remove('apple');
    clearInterval(interval);
    scoreTally = 0;
    randomApple();
    direction = 1;
    time = 1000;
    speed = 1;
    snake = [2,1,0];
    snake.forEach(index => squares[index].classList.add('snake'));
    interval = setInterval(move,timeInterval);
  }
  function move() {
  /*  if(
      (snake[0] + width >= width * width && direction === width) ||
      (snake[0] % width === 0 && direction === -1) ||
      (snake[0] % width === width - 1 && direction === 1) ||
      (snake[0] - width < 0 && direction === -width) ||
      (squares[snake[0] + direction].classList.contains('snake'))
    ) {
      stop();
    }*/

    tail = snake.pop();
    if(snake[0] + width >= playSize && direction === width) {
      snake.unshift(snake[0] % width);
    } else if(snake[0] % width === 0 && direction === -1) {
      snake.unshift(snake[0] + width - 1);
    } else if(snake[0] % width === width - 1 && direction === 1){
      snake.unshift(snake[0] - width + 1);
    } else if(snake[0] - width < 0 && direction === -width) {
      snake.unshift(playSize - width + snake[0]);
    } else {
      snake.unshift(snake[0] + direction);
    }
    if(squares[snake[0]].classList.contains('snake')) {
        stop();
    }
    squares[tail].classList.remove('snake','bottomright','bottomleft','topleft','topright');
    if(snake[0] === apple){
      squares[snake[0]].classList.remove('apple');
      randomApple();
      snake.push(tail);
      squares[tail].classList.add('snake');
      scoreTally++;
      score.innerText = scoreTally;
      clearInterval(interval);
      timeInterval *= speed;
      interval = setInterval(move,timeInterval);
    }
    squares[snake[0]].classList.add('snake');
  }
   function randomApple(){
     squares[apple].classList.remove('apple');
     do{
       apple = Math.floor(Math.random() * width * width );
     }while(snake.includes(apple));
     squares[apple].classList.add('apple');

   }
   function snakeCurve(newDirection,oldDirection) {
     if(newDirection === oldDirection) {
       return ;
     }
     if(oldDirection === -1){
       if(newDirection === -width){
         squares[snake[0]].classList.add('bottomleft');
       } else {
         squares[snake[0]].classList.add('topleft');
       }
     } else if(oldDirection === 1){
       if(newDirection === -width){
         squares[snake[0]].classList.add('bottomright');
       } else {
         squares[snake[0]].classList.add('topright');
       }
     } else if(oldDirection === width) {
       if(newDirection === 1) {
         squares[snake[0]].classList.add('bottomleft');
       } else {
         squares[snake[0]].classList.add('bottomright');
       }
     } else if(oldDirection === -width) {
       if(newDirection === 1) {
         squares[snake[0]].classList.add('topleft');
       } else {
        squares[snake[0]].classList.add('topright');
       }
     }

   }





  function control(btn) {
    prevDirection = direction;
    if(btn.keyCode === 39) {
      if(direction!=-1) {
        direction = 1;
      }
    } else if(btn.keyCode === 38) {
      if(direction!=width) {
        direction = -width;
      }
    } else if(btn.keyCode === 40) {
      if(direction!= -width){
        direction = width;
      }
    } else if(btn.keyCode === 37){
      if(direction!=1) {
        direction = -1;
      }
    }
    snakeCurve(direction,prevDirection);
    move();

  }
  document.addEventListener('keyup',control);
  startBtn.addEventListener('click',start);





})
