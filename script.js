
let themeButton = document.getElementById("theme-button");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("click", toggleDarkMode);
const reduceMotionButton = document.getElementById('reduce-motion-button');
const toggleReduceMotion = () => {
  document.body.classList.toggle("reduce-motion");
}
reduceMotionButton.addEventListener('click', toggleReduceMotion);
let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}
let revealableContainers = document.querySelectorAll(".revealable");
const reveal = () => {
  for (let p = 0; p < revealableContainers.length; p++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[p].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      /* add the active class to the revealableContainer's classlist */
      revealableContainers[p].classList.add("active");
    } else {
      /* remove the active class to the revealableContainer's classlist */
      revealableContainers[p].classList.remove("active");
    }
  }
}
window.addEventListener('scroll', reveal);
const addSignature = (person) => {
  // Write your code to manipulate the DOM here
  let signaturesContainer = document.querySelector(".signatures");
  let newSignature = document.createElement("p");
  newSignature.textContent = "🖊️ " + person.firstName + " from " + person.homeTown + " supports this.";
  signaturesContainer.appendChild(newSignature);

  let countElement = document.getElementById('counter');
  let currentCount = parseInt(countElement.innerText.split(' ')[1]);
  let newCount = currentCount + 1;
  countElement.innerText = "🖊️ " + newCount + " people have signed this petition and support this cause.";
}
const validateForm = () => {
  let firstName = document.getElementById('firstName').value;
  let homeTown = document.getElementById('homeTown').value;

  const person = { firstName, homeTown };

  let containsErrors = false;

  var petitionInputs = document.getElementById("sign-petition").elements;

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length <= 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    } else {
      petitionInputs[i].classList.remove('error');
    }
  }

  const email = document.getElementById('email');
  if (email.value.includes('.com') || email.value.includes('.org')) {
    email.classList.remove('error');
  } else {
    containsErrors = true;
    email.classList.add('error');
  }

  if (containsErrors == false) {
    addSignature(person);
    toggleModal(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
}

let scaleFactor = 1;

const scaleImage = () => {
  const modalImage = document.getElementById('modal-image');
  if (scaleFactor == 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }
  modalImage.style.transform = `scale(${scaleFactor})`;
}

const toggleModal = (person) => {
  let modal = document.getElementById("thanks-modal");
  let modalContent = document.getElementById("thanks-modal-content");
  modal.style.display = "flex";
  modalContent.textContent = "Thank you so much for supporting education, " + person.firstName + "! Shoutout to everyone from " + person.homeTown + "!";

  let intervalId = setInterval(scaleImage, 500);

  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId); // Clear the interval when the modal closes
  }, 4000);

}
let signNowButton = document.getElementById("sign-now-button");
signNowButton.addEventListener('click', validateForm);


// const closeModal = () => {
//   let modal = document.getElementById("thanks-modal");
//   modal.style.display = "none";
// }
// // Event listener for the close modal button
// const closeModalButton = document.getElementById("close-modal");
// closeModalButton.addEventListener('click', closeModal);
// document.getElementById('close-modal').addEventListener('click', () => {
//   document.getElementById('thanks-modal').style.display = 'none';
// });
let closeButton = document.getElementById("close-modal");
if (closeButton) {
  closeButton.addEventListener('click', () => {
    document.getElementById('thanks-modal').style.display = 'none';});
}