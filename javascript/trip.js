// Get all the tab buttons and content sections
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-section");
const searchInput = document.getElementById("searchInput");
const flightSearchBar = document.querySelector(".flight-search-bar"); // Select flight search bar
const commonSearchBar = document.querySelector(".search-bar"); // Select common search bar

// Function to switch tabs and show corresponding content
function switchTab(event) {
  tabs.forEach((tab) => tab.classList.remove("active"));

  event.target.classList.add("active");

  const placeholderText = event.target.getAttribute("data-placeholder");

  if (event.target.dataset.id === "flights") {
    // Hide the common search bar and show the flight search bar for the "Flights" tab
    commonSearchBar.style.display = "none";
    flightSearchBar.style.display = "flex";
  } else {
    // Show the common search bar for all other tabs
    commonSearchBar.style.display = "block";
    flightSearchBar.style.display = "none";
  }

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

const accessToken = "qaUVBNGPPVy8wCIFXSvNKut9ILls"; // Your actual access token for Amadeus API
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
            <p><strong>Last Updated:</strong> ${new Date(
              hotel.lastUpdate
            ).toLocaleDateString()}</p>
          </div>
        `;
        hotelCards.innerHTML += hotelCard;
      }
    } else {
      hotelCards.innerHTML =
        "<p>No hotels found for the entered city code.</p>";
    }
  } catch (error) {
    console.error(error);
    hotelCards.innerHTML =
      "<p>An error occurred while fetching hotel data. Please try again later.</p>";
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
const apiKey = "DtsZ84QAEMOegXnk69X9w8nbsKL8PZaf";
const thingsToDoSection = document.getElementById("things-card");

// Fetch attractions from Ticketmaster API
async function fetchAttractions() {
  const query = document.getElementById("searchInput").value.trim();

  // Clear previous results
  thingsToDoSection.innerHTML = "";

  if (!query) {
    thingsToDoSection.innerHTML = "<p>Please enter a valid query.</p>";
    return;
  }

  try {
    // Fetch attractions from Ticketmaster API
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=${query}&apikey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    if (data._embedded && data._embedded.attractions && data._embedded.attractions.length > 0) {
      const attractions = data._embedded.attractions;

      // Display first 6 attractions
      attractions.slice(0, 6).forEach((attraction) => {
        const attractionCard = `
          <div class="attraction-card">
            <h3>${attraction.name}</h3>
            <p><strong>Type:</strong> ${attraction.classifications[0].segment.name}</p>
            <p><strong>Description:</strong> ${attraction.description ? attraction.description : 'No description available.'}</p>
            <a href="${attraction.url}" target="_blank" class="details-link">View Details</a>
          </div>
        `;
        thingsToDoSection.innerHTML += attractionCard;
      });
    } else {
      thingsToDoSection.innerHTML = "<p>No attractions found for the entered query.</p>";
    }
  } catch (error) {
    console.error(error);
    thingsToDoSection.innerHTML = "<p>An error occurred while fetching attractions. Please try again later.</p>";
  }
}



async function fetchFlights() {
  const apiKey = "a44cbb0f8c034d489048ae55f61d116d"; 
  const departureCode = document.getElementById("departureInput").value.trim().toUpperCase();
  const arrivalCode = document.getElementById("arrivalInput").value.trim().toUpperCase();
  const flightResults = document.getElementById("flight-card");

  // Clear previous results
  flightResults.innerHTML = "";

  if (!departureCode || !arrivalCode) {
      flightResults.innerHTML = "<p>Please enter valid airport codes.</p>";
      return;
  }

  try {
      const response = await fetch(
          `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&dep_iata=${departureCode}&arr_iata=${arrivalCode}&flight_status=scheduled`
      );

      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      if (data.data && data.data.length > 0) {
          data.data.slice(0, 6).forEach((flight) => {
              const flightCard = `
                  <div class="flight-card">
                      <h3>${flight.airline.name}</h3>
                      <p><strong>Flight Number:</strong> ${flight.flight.number}</p>
                      <p><strong>Departure:</strong> ${flight.departure.iata} at ${flight.departure.scheduled}</p>
                      <p><strong>Arrival:</strong> ${flight.arrival.iata} at ${flight.arrival.scheduled}</p>
                      <p><strong>Status:</strong> ${flight.flight_status}</p>
                  </div>
              `;
              flightResults.innerHTML += flightCard;
          });
      } else {
          flightResults.innerHTML = "<p>No flights found for the entered route.</p>";
      }
  } catch (error) {
      console.error(error);
      flightResults.innerHTML = "<p>An error occurred while fetching flight data. Please try again later.</p>";
  }
}

