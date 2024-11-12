const words = [
  { text: "Trip", icon: "fas fa-plane" },
  { text: "Flight", icon: "fas fa-plane-departure" },
  { text: "Stay", icon: "fas fa-hotel" },
  { text: "Journey", icon: "fas fa-route" },
  { text: "Adventure", icon: "fas fa-hiking" },
];

let currentIndex = 0;
let isDeleting = false;
let textElement = document.getElementById("dynamic-text");
let displayText = "";
let typeSpeed;

function typeAnimation() {
  const { text, icon } = words[currentIndex];

  if (isDeleting) {
    displayText = displayText.slice(0, -1);
  } else {
    displayText = text.slice(0, displayText.length + 1);
  }

  textElement.innerHTML = `${displayText} ${
    displayText.length === text.length ? `<i class="${icon}"></i>` : ""
  }`;

  typeSpeed = isDeleting ? 50 : 150;

  if (!isDeleting && displayText === text) {
    typeSpeed = 1000;
    isDeleting = true;
  } else if (isDeleting && displayText === "") {
    isDeleting = false;
    currentIndex = (currentIndex + 1) % words.length;
    typeSpeed = 500;
  }

  setTimeout(typeAnimation, typeSpeed);
}

typeAnimation();
