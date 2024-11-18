// Get all the tab buttons and content sections
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-section");
const searchInput = document.getElementById("searchInput");

// Function to switch tabs and show corresponding content
function switchTab(event) {
  tabs.forEach((tab) => tab.classList.remove("active"));

  event.target.classList.add("active");

  const placeholderText = event.target.getAttribute("data-placeholder");

  searchInput.placeholder = placeholderText;

  tabContents.forEach((content) => content.classList.remove("active"));

  const tabId = event.target.getAttribute("data-id");
  const activeContent = document.getElementById(tabId);

  if (activeContent) {
    activeContent.classList.add("active");
  } else {
    console.error(`No content found for tabId: ${tabId}`);
  }
}

// Add event listeners to each tab
tabs.forEach((tab) => tab.addEventListener("click", switchTab));

// Optionally, initialize the first tab as active on page load
document.querySelector(".tab.active").click();

// Budget Estimator Script
const accommodationInput = document.getElementById("accommodation");
const flightsInput = document.getElementById("flight-price");
const foodInput = document.getElementById("food");
const activitiesInput = document.getElementById("activities");

const accommodationValue = document.getElementById("accommodationValue");
const flightsValue = document.getElementById("flightsValue");
const foodValue = document.getElementById("foodValue");
const activitiesValue = document.getElementById("activitiesValue");
const totalBudget = document.getElementById("totalBudget");

function updateBudget() {
  const accommodationCost = parseInt(accommodationInput.value);
  const flightsCost = parseInt(flightsInput.value);
  const foodCost = parseInt(foodInput.value);
  const activitiesCost = parseInt(activitiesInput.value);

  accommodationValue.textContent = `$${accommodationCost}`;
  flightsValue.textContent = `$${flightsCost}`;
  foodValue.textContent = `$${foodCost}`;
  activitiesValue.textContent = `$${activitiesCost}`;

  const total =
    accommodationCost * 7 + flightsCost + foodCost * 7 + activitiesCost * 7;

  totalBudget.textContent = `$${total}`;
}

accommodationInput.addEventListener("input", updateBudget);
flightsInput.addEventListener("input", updateBudget);
foodInput.addEventListener("input", updateBudget);
activitiesInput.addEventListener("input", updateBudget);

updateBudget();
