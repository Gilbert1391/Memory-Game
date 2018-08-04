const cardsData = [
  {
    name: 'shell',
    img: 'img/blueshell.png',
  },
  {
    name: 'star',
    img: 'img/star.png',
  },
  {
    name: 'bobomb',
    img: 'img/bobomb.png',
  },
  {
    name: 'mario',
    img: 'img/mario.png',
  },
  {
    name: 'luigi',
    img: 'img/luigi.png',
  },
  {
    name: 'peach',
    img: 'img/peach.png',
  },
  {
    name: '1up',
    img: 'img/1up.png',
  },
  {
    name: 'mushroom',
    img: 'img/mushroom.png',
  },
  {
    name: 'thwomp',
    img: 'img/thwomp.png',
  },
  {
    name: 'bulletbill',
    img: 'img/bulletbill.png',
  },
  {
    name: 'coin',
    img: 'img/coin.png',
  },
  {
    name: 'goomba',
    img: 'img/goomba.png',
  },
];

let gameGrid, selected, count, firstGuess, secondGuess, previousTarget, delay;

previousTarget = null;
delay = 1200;
gameGrid = cardsData.concat(cardsData);
// Randomize array elements order
gameGrid.sort(() => 0.5 - Math.random());

// App container
const container = document.getElementById('game');

// Create a section with a class of grid
const grid = document.createElement('section');
grid.classList.add('grid');

// Append the grid section to the app container
game.appendChild(grid);

gameGrid.forEach( el => {
  // Create a div
  const card = document.createElement('div');
  // Apply a card class to that div
  card.classList.add('card');
  // Set the data-name attribute of the div to the cardsArray name
  card.dataset.name = el.name;

  // Create front card
  const front = document.createElement('div');
  front.classList.add('front');

  // Create back card
  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${el.img})`;

  // Append the div to the grid section
  grid.appendChild(card);
  card.appendChild(front)
  card.appendChild(back)
});

const resetGuess = () => {
  count = 0;
  firstGuess = '';
  secondGuess = '';
  previousTarget = null;

  selected = document.querySelectorAll('.selected');
  selected.forEach(el => {
    el.classList.remove('selected');
  });
};

// Add match CSS
const match = () => {
  selected = document.querySelectorAll('.selected');
  selected.forEach(el => {
    el.classList.add('match');
  });
}

resetGuess();

grid.addEventListener('click', event => {
  // The event target is our clicked item
  const target = event.target;

  // Do not allow the grid section itself to be selected; only select divs inside the grid
  if (
    target.nodeName === 'SECTION' ||
    target === previousTarget ||
    target.parentNode.classList.contains('selected') ||
    target.parentNode.classList.contains('match')
  ) {
     return;
   }

  if (count < 2) {
    count++;
    if (count === 1) {
      // Assign first guess
      firstGuess = target.parentNode.dataset.name;
      target.parentNode.classList.add('selected');
    } else {
      // Assign second guess
      secondGuess = target.parentNode.dataset.name;
      target.parentNode.classList.add('selected');
    }
    // If both guesses are not empty...
    if (firstGuess !== '' && secondGuess !== '') {
       // and the first guess matches the second match...
       if (firstGuess === secondGuess) {
         setTimeout(match, delay);
         setTimeout(resetGuess, delay);
       } else {
         setTimeout(resetGuess, delay);
       }
    }
    // Set previoustarget to clicked target
    previousTarget = target;
  }
});
