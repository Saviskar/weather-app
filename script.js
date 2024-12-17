const apiKey = "b71d6b3147b3dc05e5e2639effdb9142";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

searchButton.addEventListener("click", getLocation);
locationInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getLocation();
  }
});

function getLocation() {
  const location = locationInput.value.trim();
  if (location) {
    fetchWeather(location);
  } else {
    alert("Please enter a location!");
  }
}

async function fetchWeather(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        "City not found or an error occurred while fetching data."
      );
    }

    const data = await response.json();
    locationElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;
  } catch (error) {
    alert(error.message);
    console.error("Error fetching weather data:", error);
  }
}
