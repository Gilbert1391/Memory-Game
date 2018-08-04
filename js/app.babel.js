'use strict';

var cardsData = [{
  name: 'shell',
  img: 'img/blueshell.png'
}, {
  name: 'star',
  img: 'img/star.png'
}, {
  name: 'bobomb',
  img: 'img/bobomb.png'
}, {
  name: 'mario',
  img: 'img/mario.png'
}, {
  name: 'luigi',
  img: 'img/luigi.png'
}, {
  name: 'peach',
  img: 'img/peach.png'
}, {
  name: '1up',
  img: 'img/1up.png'
}, {
  name: 'mushroom',
  img: 'img/mushroom.png'
}, {
  name: 'thwomp',
  img: 'img/thwomp.png'
}, {
  name: 'bulletbill',
  img: 'img/bulletbill.png'
}, {
  name: 'coin',
  img: 'img/coin.png'
}, {
  name: 'goomba',
  img: 'img/goomba.png'
}];

var gameGrid = void 0,
    selected = void 0,
    count = void 0,
    firstGuess = void 0,
    secondGuess = void 0,
    previousTarget = void 0,
    delay = void 0;

previousTarget = null;
delay = 1200;
gameGrid = cardsData.concat(cardsData);
var container = document.getElementById('game');
var grid = document.createElement('section');

gameGrid.sort(function () {
  return 0.5 - Math.random();
});

grid.classList.add('grid');

game.appendChild(grid);

gameGrid.forEach(function (el) {
  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = el.name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + el.img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var resetGuess = function resetGuess() {
  count = 0;
  firstGuess = '';
  secondGuess = '';
  previousTarget = null;

  selected = document.querySelectorAll('.selected');
  selected.forEach(function (el) {
    el.classList.remove('selected');
  });
};

var match = function match() {
  selected = document.querySelectorAll('.selected');
  selected.forEach(function (el) {
    el.classList.add('match');
  });
};

resetGuess();

grid.addEventListener('click', function (event) {
  var target = event.target;

  if (target.nodeName === 'SECTION' || target === previousTarget || target.parentNode.classList.contains('selected') || target.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = target.parentNode.dataset.name;
      target.parentNode.classList.add('selected');
    } else {
      secondGuess = target.parentNode.dataset.name;
      target.parentNode.classList.add('selected');
    }
    if (firstGuess !== '' && secondGuess !== '') {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
        setTimeout(resetGuess, delay);
      } else {
        setTimeout(resetGuess, delay);
      }
    }
    previousTarget = target;
  }
});
