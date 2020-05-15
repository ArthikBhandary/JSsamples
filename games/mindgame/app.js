document.addEventListener('DOMContentLoaded',()=>{
  const cardArray = [
    {
      name: 'luffy',
      img : 'image/luffy.jpg'
    },
    {
      name:'luffy',
      img: 'image/strawhat.jpg'
    },
    {
      name:'nami',
      img : 'image/nami.jpg'
    },
    {
      name: 'nami',
      img : 'image/nami_tatoo.jpg'
    },
    {
      name: 'zoro',
      img: 'image/zoro.jpg'
    },
    {
      name: 'zoro',
      img: 'image/sword.jpg'
    },
    {
      name: 'usopp',
      img: 'image/usopp.jpg'
    },
    {
      name: 'usopp',
      img: 'image/sling.jpg'
    },
    {
      name: 'robin',
      img: 'image/robin.jpg'
    },
    {
      name: 'robin',
      img: 'image/poneglyph.jpg'
    },
    {
      name: 'franky',
      img: 'image/franky.jpg'
    },
    {
      name: 'franky',
      img: 'image/ship.jpg'
    }
  ];
  let cardsChosen = [], cardsChosenId = [],cardsWon = [], score = 0;
  const grid = document.querySelector('.grid');
  // Randomise
  cardArray.sort(()=>0.5-Math.random())
  // Create the game board
  function createBoard() {
    for(let i = 0; i < cardArray.length; i++) {
      let card = document.createElement('img');
      card.setAttribute('src','image/index.png');
      card.setAttribute('data-id',i);
      card.addEventListener('click',flipcard);
      grid.appendChild(card);

    }
  }
  function resultDisplay() {
    document.getElementById('score').innerHTML = score;
    if( score === cardArray.length/2) {
      alert("You Won");
      show("You Won");
    }
  }
  function show(str){
    document.getElementById('comment').innerHTML = str;
  }
  function check() {
    let cards = document.querySelectorAll('img');
    if(cardsChosen[0].name == cardsChosen[1].name) {
      if(cardsChosenId[0] === cardsChosenId[1]){
        cardsChosen.pop();
        cardsChosenId.pop();
      } else {
        show('Matched');
        cards[cardsChosenId[0]].setAttribute('src','image/white.png');
        cards[cardsChosenId[1]].setAttribute('src','image/white.png');
        cards[cardsChosenId[0]].removeEventListener('click',flipcard);
        cards[cardsChosenId[1]].removeEventListener('click',flipcard);
        cardsWon.concat(cardsChosen);
        cardsChosen = [];
        cardsChosenId = [];
        score += 1;
      }
    } else{
      show('Not Matching');
      cards[cardsChosenId[0]].setAttribute('src','image/index.png');
      cards[cardsChosenId[1]].setAttribute('src','image/index.png');
      cardsChosen = [];
      cardsChosenId = [];
    }
    resultDisplay();
  }
  function flipcard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId]);
    cardsChosenId.push(cardId);
    this.setAttribute('src',cardArray[cardId].img)
    if( cardsChosenId.length === 2) {
      setTimeout(check,500);
    }
  }
  createBoard();
});
