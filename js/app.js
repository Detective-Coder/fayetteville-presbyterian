  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCkvjgzgZKvLj0RWf4fmpEusdL3kwGTi9Y",
    authDomain: "contactform-2c899.firebaseapp.com",
    databaseURL: "https://contactform-2c899.firebaseio.com",
    projectId: "contactform-2c899",
    storageBucket: "contactform-2c899.appspot.com",
    messagingSenderId: "582480679139",
    appId: "1:582480679139:web:db83434aac0386e5f075d6",
    measurementId: "G-LTE2Q0CZT1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

// Smooth Scrolling
$('nav a, .btn').on('click', function(event) {
  if (this.hash !== '') {
    event.preventDefault();

    const hash = this.hash;

    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - 100
      },
      800
    );
  }
});

// Carousel Slide
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

// Buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

// Counter
let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

// Button Listeners
nextBtn.addEventListener('click', () => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter++;
  carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

prevBtn.addEventListener('click', () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter--;
  carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

carouselSlide.addEventListener('transitionend', () => {
  if (carouselImages[counter].id === 'lastClone') {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }
  if (carouselImages[counter].id === 'firstClone') {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }
});

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();

  // Get values
  var firstName = getInputVal('firstName');
  var lastName = getInputVal('lastName');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveMessage(firstName, lastName, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function() {
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(firstName, lastName, email, phone, message) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    message: message
  });
}