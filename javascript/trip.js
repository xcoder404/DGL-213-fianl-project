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

const accessToken = "YtDK9zA1oCtWt12VR3J79t3Zn75W"; // Your actual access token for Amadeus API
const openCageApiKey = "f8d0ab157ad74cf7bbeccde988871b91"; // Your OpenCage API key
const hotelsSection = document.getElementById("hotels"); // Section to display hotels
const hotelCards = document.getElementById("hotel-cards");

async function fetchHotels() {
  const cityCode = document.getElementById("searchInput").value;
  const cityConverted = cityCode.trim().substring(0, 3).toUpperCase();

  // Clear previous results
  hotelCards.innerHTML = "";

  if (!cityConverted) {
    hotelsSection.innerHTML = "<p>Please enter a valid city code.</p>";
    return;
  }

  try {
    // Fetch hotels by city code
    const response = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?radius=1&radiusUnit=KM&cityCode=${cityConverted}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    
console.log(data);
    // Check if there are hotels
    if (data.data && data.data.length > 0) {
      // Process each hotel
      for (let i = 0; i < Math.min(data.data.length, 6); i++) {
        const hotel = data.data[i];
        const latitude = hotel.geoCode.latitude;
        const longitude = hotel.geoCode.longitude;
        
        // Fetch the address from OpenCage API
        const address = await getAddressFromCoordinates(latitude, longitude);
        
        const hotelCard = `
          <div class="hotel-card">  
            <h3>${hotel.name}</h3>
            <p><strong>Hotel ID:</strong> ${hotel.hotelId}</p>
            <p><strong>Location:</strong> ${address}</p>
            <p><strong>Last Updated:</strong> ${new Date(hotel.lastUpdate).toLocaleDateString()}</p>
          </div>
        `;
        hotelCards.innerHTML += hotelCard;
      }
    } else {
      hotelCards.innerHTML = "<p>No hotels found for the entered city code.</p>";
    }
  } catch (error) {
    console.error(error);
    hotelCards.innerHTML = "<p>An error occurred while fetching hotel data. Please try again later.</p>";
  }
}

// Function to convert latitude and longitude to address using OpenCage API
async function getAddressFromCoordinates(lat, lng) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${openCageApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0].formatted;
    } else {
      return "Address not found";
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Error fetching address";
  }
}


