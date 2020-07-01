const GOAT_IMG = 'url("https://avatars.mds.yandex.net/get-zen_doc/1894366/pub_5d9dc1052fda8600b1530b74_5d9dc12192414d00ad7db2d4/scale_1200")';
const AUTO_IMG = 'url("https://i.ytimg.com/vi/PoqVWhtPGYk/sddefault.jpg")';
const DOOR_NUMBER_WORDS = ['первую', 'вторую', 'третью'];

const doors = document.querySelectorAll('.door');
const doorsArr = Array.from(doors);
const winsSwap = document.querySelector('.wins.swap');
const winsNoSwap = document.querySelector('.wins.noswap');
const trySwap = document.querySelector('.try.swap');
const tryNoSwap = document.querySelector('.try.noswap');
const overlay = document.querySelector('.overlay');
const beginButton = overlay.querySelector('.action');
const cleanButton = overlay.querySelector('.clean');
const description = overlay.querySelector('p');

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
let randomNum = getRandomInt(3);

let isOpen = false;
let word = '';

document.querySelectorAll('.goat-auto').forEach(elem => {
  elem.style.setProperty('background-image', GOAT_IMG);
});

function randomImage() {
  if (randomNum === 0) {
    const firstDoor = document.querySelector('.goat-auto.first');
    firstDoor.style.setProperty('background-image', AUTO_IMG);
  } else if (randomNum === 1) {
    const secondDoor = document.querySelector('.goat-auto.second');
    secondDoor.style.setProperty('background-image', AUTO_IMG);
  } else if (randomNum === 2) {
    const thirdDoor = document.querySelector('.goat-auto.third');
    thirdDoor.style.setProperty('background-image', AUTO_IMG);
  }
}

function doorOpen() {
  const noDoorsChosen = doorsArr.every(elem => !elem.classList.contains('target-red'));
  if (noDoorsChosen) {
    this.classList.add('target-red');
    overlay.style.setProperty('transform', 'translateY(0)');
    if (this.classList.contains('first')) {
      word = DOOR_NUMBER_WORDS[0];
    } else if (this.classList.contains('second')) {
      word = DOOR_NUMBER_WORDS[1];
    } else if (this.classList.contains('third')) {
      word = DOOR_NUMBER_WORDS[2];
    }
    description.textContent = `Вы выбрали ${word} дверь. Отлично! Я не хочу вам её открывать, я хочу предложить вам сделку, а, я вроде это уже говорил. Ладно, помните я говорил, что знаю за какой дверью что находится? Так вот я открою вам дверь, за которой находится коза.`;
    beginButton.textContent = 'Ладно, открой';
  } else {
      if (!isOpen) {
        this.classList.add('open');
        this.previousElementSibling.classList.add('enter');
        beginButton.textContent = `Попробовать снова`;
        cleanButton.style.setProperty('display', 'block');
        overlay.style.setProperty('transform', 'translateY(0)');
        const winGoat = this.previousElementSibling.style.backgroundImage === GOAT_IMG;
        if (this.classList.contains('target-red')) {
          tryNoSwap.textContent++;
          if (winGoat) {
            document.querySelector('.goat-sound').play();
            description.textContent = `Раз хотите ездить на козе, то пожалуйста, вот вам коза.`;
          } else {
            winsNoSwap.textContent++;
            document.querySelector('.car-sound').play();
            description.textContent = `Вы попали в 33,3%. Не знаю как вы это сделали, советую вам сходить сегодня в казино, и да, машина ваша.`;
          }
        } else {
          trySwap.textContent++;
          if (winGoat) {
            document.querySelector('.goat-sound').play();
            description.textContent = `Вероятность победы была 66,6%, но вы попали в 33,3% неудачи. Ну, кому-то же надо быть неудачником, забирайте свою козочку.`;
          } else {
            document.querySelector('.car-sound').play();
            winsSwap.textContent++;
            description.textContent = `Молодец! Я же говорил, что это работает. Вот ваша машина.`;
          }
        }
      }
      isOpen = !isOpen;
      const statistics = {
        winsSwap: winsSwap.textContent,
        trySwap: trySwap.textContent,
        winsNoSwap: winsNoSwap.textContent,
        tryNoSwap: tryNoSwap.textContent
      }
      localStorage.setItem('statistics', JSON.stringify(statistics));
  }
}

function begin() {
  overlay.style.setProperty('transform', 'translateY(-110%)');
  if (word === DOOR_NUMBER_WORDS[0]) {
    if (randomNum === 1) {
      document.querySelector('.door.third').classList.add('open');
      document.querySelector('.door.third').previousElementSibling.classList.add('enter');
      word = DOOR_NUMBER_WORDS[2];
    } else if (randomNum === 2) {
      document.querySelector('.door.second').classList.add('open');
      document.querySelector('.door.second').previousElementSibling.classList.add('enter');
      word = DOOR_NUMBER_WORDS[1];
    } else if (randomNum === 0) {
      const randomNumSecond = getRandomInt(2);
      if (randomNumSecond === 0) {
        document.querySelector('.door.third').classList.add('open');
        document.querySelector('.door.third').previousElementSibling.classList.add('enter');
        word = DOOR_NUMBER_WORDS[2];
      } else if (randomNumSecond === 1) {
        document.querySelector('.door.second').classList.add('open');
        document.querySelector('.door.second').previousElementSibling.classList.add('enter');
        word = DOOR_NUMBER_WORDS[1];
      }
    }
    ending();
  } else if (word === DOOR_NUMBER_WORDS[1]) {
    if (randomNum === 0) {
      document.querySelector('.door.third').classList.add('open');
      document.querySelector('.door.third').previousElementSibling.classList.add('enter');
      word = DOOR_NUMBER_WORDS[2];
    } else if (randomNum === 2) {
      document.querySelector('.door.first').classList.add('open');
      document.querySelector('.door.first').previousElementSibling.classList.add('enter');
      word = DOOR_NUMBER_WORDS[0];
    } else if (randomNum === 1) {
      const randomNumSecond = getRandomInt(2);
      if (randomNumSecond === 0) {
        document.querySelector('.door.third').classList.add('open');
        document.querySelector('.door.third').previousElementSibling.classList.add('enter');
        word = DOOR_NUMBER_WORDS[2];
      } else if (randomNumSecond === 1) {
        document.querySelector('.door.first').classList.add('open');
        document.querySelector('.door.first').previousElementSibling.classList.add('enter');
        word = DOOR_NUMBER_WORDS[0];
      }
    }
    ending();
  } else if (word === DOOR_NUMBER_WORDS[2]) {
    if (randomNum === 0) {
      document.querySelector('.door.second').classList.add('open');
      document.querySelector('.door.second').previousElementSibling.classList.add('enter');
      word = DOOR_NUMBER_WORDS[1];
    } else if (randomNum === 1) {
      document.querySelector('.door.first').classList.add('open');
      document.querySelector('.door.first').previousElementSibling.classList.add('enter');
      word = DOOR_NUMBER_WORDS[0];
    } else if (randomNum === 2) {
      const randomNumSecond = getRandomInt(2);
      if (randomNumSecond === 0) {
        document.querySelector('.door.second').classList.add('open');
        document.querySelector('.door.second').previousElementSibling.classList.add('enter');
        word = DOOR_NUMBER_WORDS[1];
      } else if (randomNumSecond === 1) {
        document.querySelector('.door.first').classList.add('open');
        document.querySelector('.door.first').previousElementSibling.classList.add('enter');
        word = DOOR_NUMBER_WORDS[0];
      }
    }
    ending();
  } else if (isOpen) {
    doors.forEach(door => door.classList.remove('target-red', 'open'));
    cleanButton.style.setProperty('display', 'none');
    document.querySelectorAll('.goat-auto').forEach(elem => {
      elem.classList.remove('enter');
      elem.style.setProperty('background-image', GOAT_IMG);
    });
    randomNum = getRandomInt(3);
    randomImage();
    isOpen = !isOpen;
  }
}

function ending() {
  overlay.style.setProperty('transform', 'translateY(0)');
  description.textContent = `Я открыл вам ${word} дверь, как видите, за этой дверью - коза. Я же говорил, что шарю. Теперь за вами выбор: поменять своё решение или ездить на козе.`;
  beginButton.textContent = 'Выбрать дверь';
  word = '';
}

function cleanLocalStorage() {
  winsSwap.textContent = '0';
  trySwap.textContent = '0';
  winsNoSwap.textContent = '0';
  tryNoSwap.textContent = '0';
  localStorage.removeItem('statistics');
}

const localStorageStatistics = JSON.parse(localStorage.getItem('statistics'));

winsSwap.textContent = localStorageStatistics ? localStorageStatistics.winsSwap : '0';
trySwap.textContent = localStorageStatistics ? localStorageStatistics.trySwap : '0';
winsNoSwap.textContent = localStorageStatistics ? localStorageStatistics.winsNoSwap : '0';
tryNoSwap.textContent = localStorageStatistics ? localStorageStatistics.tryNoSwap : '0';

randomImage();

doors.forEach(door => door.addEventListener('click', doorOpen));
beginButton.addEventListener('click', begin);
cleanButton.addEventListener('click', cleanLocalStorage);