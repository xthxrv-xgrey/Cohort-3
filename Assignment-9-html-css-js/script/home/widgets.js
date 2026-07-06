// ================= ELEMENTS =================

let timeElement;
let dateElement;
let temperatureElement;
let weatherIconElement;
let weatherElement;
let locationElement;

// ================= INIT =================

export const initHomeWidgets = () => {
  timeElement = document.getElementById("time");
  dateElement = document.getElementById("date");
  temperatureElement = document.getElementById("temperature");
  weatherIconElement = document.getElementById("weatherIcon");
  weatherElement = document.getElementById("weather");
  locationElement = document
    .getElementById("locationArea")
    .querySelector("span");

  initClock();
  initLocationWeather();
};

// ================= CLOCK =================

const updateClock = () => {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  timeElement.textContent = `${hours}:${minutes}`;

  const options = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  dateElement.textContent = now
    .toLocaleDateString("en-GB", options)
    .toUpperCase();
};

const initClock = () => {
  updateClock();

  const now = new Date();
  const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

  setTimeout(() => {
    updateClock();
    setInterval(updateClock, 60000);
  }, delay);
};

// ================= WEATHER =================

const weatherInfo = (code) => {
  if (code === 0) return { icon: "☀️", text: "Clear Sky" };
  if (code === 1) return { icon: "🌤️", text: "Mainly Clear" };
  if (code === 2) return { icon: "⛅", text: "Partly Cloudy" };
  if (code === 3) return { icon: "☁️", text: "Overcast" };

  if (code >= 45 && code <= 48) return { icon: "🌫️", text: "Fog" };

  if (code >= 51 && code <= 55) return { icon: "🌦️", text: "Light Drizzle" };

  if (code >= 56 && code <= 57) return { icon: "🌧️", text: "Freezing Drizzle" };

  if (code >= 61 && code <= 65) return { icon: "🌧️", text: "Rain" };

  if (code >= 66 && code <= 67) return { icon: "🌧️", text: "Freezing Rain" };

  if (code >= 71 && code <= 75) return { icon: "❄️", text: "Snow" };

  if (code === 77) return { icon: "❄️", text: "Snow Grains" };

  if (code >= 80 && code <= 82) return { icon: "🌦️", text: "Rain Showers" };

  if (code >= 85 && code <= 86) return { icon: "🌨️", text: "Snow Showers" };

  if (code >= 95 && code <= 99) return { icon: "⛈️", text: "Thunderstorm" };

  return { icon: "🌍", text: "Unknown" };
};

async function getWeather(lat, lon) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`,
    );

    const data = await response.json();

    const temp = data.current.temperature_2m;
    const weather = weatherInfo(data.current.weather_code);

    temperatureElement.textContent = `${temp}°C`;
    weatherIconElement.textContent = weather.icon;
    weatherElement.textContent = weather.text;
  } catch {
    temperatureElement.textContent = "--°C";
    weatherIconElement.textContent = "❌";
    weatherElement.textContent = "Unavailable";
  }
}

// ================= LOCATION =================

async function getLocationName(lat, lon) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    const data = await response.json();

    const address = data.address;

    const city =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.county ||
      "Unknown";

    const country = address.country || "";

    locationElement.textContent = `📍 ${city}, ${country}`;
  } catch {
    locationElement.textContent = "📍 Unknown Location";
  }
}

// ================= LOCATION + WEATHER =================

const initLocationWeather = () => {
  if (!navigator.geolocation) {
    locationElement.textContent = "📍 Geolocation not supported";
    weatherElement.textContent = "Unavailable";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      getWeather(coords.latitude, coords.longitude);
      getLocationName(coords.latitude, coords.longitude);
    },
    () => {
      locationElement.textContent = "📍 Location permission denied";

      temperatureElement.textContent = "--°C";
      weatherIconElement.textContent = "❌";
      weatherElement.textContent = "Unavailable";
    },
  );
};
