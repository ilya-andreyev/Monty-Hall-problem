const GOAT_IMG = 'url("public/images/goat.jpg")';
const AUTO_IMG = 'url("public/images/auto.jpg")';
const DOOR_NUMBER_WORDS = ["first", "second", "third"];

const doors = document.querySelectorAll(".door");
const doorsArr = Array.from(doors);
const winsSwap = document.querySelector(".wins.swap");
const winsNoSwap = document.querySelector(".wins.noswap");
const trySwap = document.querySelector(".try.swap");
const tryNoSwap = document.querySelector(".try.noswap");
const overlay = document.querySelector(".overlay");
const beginButton = overlay.querySelector(".action");
const cleanButton = overlay.querySelector(".clean");
const description = overlay.querySelector("p");

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
let randomNum = getRandomInt(3);

let isOpen = false;
let word = "";

document.querySelectorAll(".goat-auto").forEach((elem) => {
  elem.style.setProperty("background-image", GOAT_IMG);
});

function randomImage() {
  if (randomNum === 0) {
    const firstDoor = document.querySelector(".goat-auto.first");
    firstDoor.style.setProperty("background-image", AUTO_IMG);
  } else if (randomNum === 1) {
    const secondDoor = document.querySelector(".goat-auto.second");
    secondDoor.style.setProperty("background-image", AUTO_IMG);
  } else if (randomNum === 2) {
    const thirdDoor = document.querySelector(".goat-auto.third");
    thirdDoor.style.setProperty("background-image", AUTO_IMG);
  }
}

function doorOpen() {
  const noDoorsChosen = doorsArr.every(
    (elem) => !elem.classList.contains("target-red")
  );
  if (noDoorsChosen) {
    this.classList.add("target-red");
    overlay.style.setProperty("transform", "translateY(0)");
    if (this.classList.contains("first")) {
      word = DOOR_NUMBER_WORDS[0];
    } else if (this.classList.contains("second")) {
      word = DOOR_NUMBER_WORDS[1];
    } else if (this.classList.contains("third")) {
      word = DOOR_NUMBER_WORDS[2];
    }
    description.textContent = `You chose the ${word} door. Great! I don't want to open it for you, I want to offer you a deal. Oh, I think I already said that. Alright, remember I told you that I know what is behind each door? So, I will open the door that has a goat behind it.`;
    beginButton.textContent = "Alright, open it";
  } else {
    if (!isOpen) {
      this.classList.add("open");
      this.previousElementSibling.classList.add("enter");
      beginButton.textContent = `Try again`;
      cleanButton.style.setProperty("display", "block");
      overlay.style.setProperty("transform", "translateY(0)");
      const winGoat =
        this.previousElementSibling.style.backgroundImage === GOAT_IMG;
      if (this.classList.contains("target-red")) {
        tryNoSwap.textContent++;
        if (winGoat) {
          document.querySelector(".goat-sound").play();
          description.textContent = `If you want to ride a goat, then please, here is a goat for you.`;
        } else {
          winsNoSwap.textContent++;
          document.querySelector(".car-sound").play();
          description.textContent = `You hit the 33.3%. I don't know how you did it, but I suggest you go to the casino today, and yes, the car is yours.`;
        }
      } else {
        trySwap.textContent++;
        if (winGoat) {
          document.querySelector(".goat-sound").play();
          description.textContent = `The probability of winning was 66.6%, but you landed in the 33.3% of failure. Well, someone has to be the unlucky one. Take your goat.`;
        } else {
          document.querySelector(".car-sound").play();
          winsSwap.textContent++;
          description.textContent = `Well done! I told you it works. Here's your car.`;
        }
      }
    }
    isOpen = !isOpen;
    const statistics = {
      winsSwap: winsSwap.textContent,
      trySwap: trySwap.textContent,
      winsNoSwap: winsNoSwap.textContent,
      tryNoSwap: tryNoSwap.textContent,
    };
    localStorage.setItem("statistics", JSON.stringify(statistics));
  }
}

function begin() {
  overlay.style.setProperty("transform", "translateY(-110%)");
  if (word === DOOR_NUMBER_WORDS[0]) {
    if (randomNum === 1) {
      document.querySelector(".door.third").classList.add("open");
      document
        .querySelector(".door.third")
        .previousElementSibling.classList.add("enter");
      word = DOOR_NUMBER_WORDS[2];
    } else if (randomNum === 2) {
      document.querySelector(".door.second").classList.add("open");
      document
        .querySelector(".door.second")
        .previousElementSibling.classList.add("enter");
      word = DOOR_NUMBER_WORDS[1];
    } else if (randomNum === 0) {
      const randomNumSecond = getRandomInt(2);
      if (randomNumSecond === 0) {
        document.querySelector(".door.third").classList.add("open");
        document
          .querySelector(".door.third")
          .previousElementSibling.classList.add("enter");
        word = DOOR_NUMBER_WORDS[2];
      } else if (randomNumSecond === 1) {
        document.querySelector(".door.second").classList.add("open");
        document
          .querySelector(".door.second")
          .previousElementSibling.classList.add("enter");
        word = DOOR_NUMBER_WORDS[1];
      }
    }
    ending();
  } else if (word === DOOR_NUMBER_WORDS[1]) {
    if (randomNum === 0) {
      document.querySelector(".door.third").classList.add("open");
      document
        .querySelector(".door.third")
        .previousElementSibling.classList.add("enter");
      word = DOOR_NUMBER_WORDS[2];
    } else if (randomNum === 2) {
      document.querySelector(".door.first").classList.add("open");
      document
        .querySelector(".door.first")
        .previousElementSibling.classList.add("enter");
      word = DOOR_NUMBER_WORDS[0];
    } else if (randomNum === 1) {
      const randomNumSecond = getRandomInt(2);
      if (randomNumSecond === 0) {
        document.querySelector(".door.third").classList.add("open");
        document
          .querySelector(".door.third")
          .previousElementSibling.classList.add("enter");
        word = DOOR_NUMBER_WORDS[2];
      } else if (randomNumSecond === 1) {
        document.querySelector(".door.first").classList.add("open");
        document
          .querySelector(".door.first")
          .previousElementSibling.classList.add("enter");
        word = DOOR_NUMBER_WORDS[0];
      }
    }
    ending();
  } else if (word === DOOR_NUMBER_WORDS[2]) {
    if (randomNum === 0) {
      document.querySelector(".door.second").classList.add("open");
      document
        .querySelector(".door.second")
        .previousElementSibling.classList.add("enter");
      word = DOOR_NUMBER_WORDS[1];
    } else if (randomNum === 1) {
      document.querySelector(".door.first").classList.add("open");
      document
        .querySelector(".door.first")
        .previousElementSibling.classList.add("enter");
      word = DOOR_NUMBER_WORDS[0];
    } else if (randomNum === 2) {
      const randomNumSecond = getRandomInt(2);
      if (randomNumSecond === 0) {
        document.querySelector(".door.second").classList.add("open");
        document
          .querySelector(".door.second")
          .previousElementSibling.classList.add("enter");
        word = DOOR_NUMBER_WORDS[1];
      } else if (randomNumSecond === 1) {
        document.querySelector(".door.first").classList.add("open");
        document
          .querySelector(".door.first")
          .previousElementSibling.classList.add("enter");
        word = DOOR_NUMBER_WORDS[0];
      }
    }
    ending();
  } else if (isOpen) {
    doors.forEach((door) => door.classList.remove("target-red", "open"));
    cleanButton.style.setProperty("display", "none");
    document.querySelectorAll(".goat-auto").forEach((elem) => {
      elem.classList.remove("enter");
      elem.style.setProperty("background-image", GOAT_IMG);
    });
    randomNum = getRandomInt(3);
    randomImage();
    isOpen = !isOpen;
  }
}

function ending() {
  overlay.style.setProperty("transform", "translateY(0)");
  description.textContent = `I opened the ${word} door for you. As you can see, there is a goat behind this door. I told you I know what's up. Now it's your choice: change your decision or ride the goat.`;
  beginButton.textContent = "Choose a door";
  word = "";
}

function cleanLocalStorage() {
  winsSwap.textContent = "0";
  trySwap.textContent = "0";
  winsNoSwap.textContent = "0";
  tryNoSwap.textContent = "0";
  localStorage.removeItem("statistics");
}

const localStorageStatistics = JSON.parse(localStorage.getItem("statistics"));

winsSwap.textContent = localStorageStatistics
  ? localStorageStatistics.winsSwap
  : "0";
trySwap.textContent = localStorageStatistics
  ? localStorageStatistics.trySwap
  : "0";
winsNoSwap.textContent = localStorageStatistics
  ? localStorageStatistics.winsNoSwap
  : "0";
tryNoSwap.textContent = localStorageStatistics
  ? localStorageStatistics.tryNoSwap
  : "0";

randomImage();

doors.forEach((door) => door.addEventListener("click", doorOpen));
beginButton.addEventListener("click", begin);
cleanButton.addEventListener("click", cleanLocalStorage);
