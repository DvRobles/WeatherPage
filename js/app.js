// Selectores
const fetchWeatherButton = document.getElementById('fetch-weather');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');
const toggleModeButton = document.getElementById('toggle-mode');
const body = document.body;

// Función para obtener clima
async function fetchWeather() {
    const apiKey = 'e052fa8bbfbd25faa4601dbbfa57c1fd';
    const city = cityInput.value.trim();
  
    if (!city) {
      weatherResult.textContent = 'Please enter a city name.';
      return;
    }
  
    try {
      const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`);
      const data = await response.json();
  
      if (data.error) {
        weatherResult.textContent = 'City not found. Please try again.';
      } else {
        const { observation_time, temperature, weather_descriptions, weather_icons, humidity } = data.current;
  
        // Actualizar el favicon dinámicamente
        const iconUrl = weather_icons[0]; // Obtener la URL del icono del clima
        updateFavicon(iconUrl); // Llamar a la función que actualiza el favicon
  
        weatherResult.innerHTML = `
            <p><strong>City:</strong> ${data.location.name}</p>
            <p><strong>Temperature:</strong> ${temperature} °C</p>
            <div class="weather-condition">
                <img src="${weather_icons[0]}" alt="Weather icon">
                <p><strong>Condition:</strong> ${weather_descriptions[0]}</p>
            </div>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Observation Time:</strong> ${observation_time}</p>
        `;
        }
    } catch (error) {
        weatherResult.textContent = 'Error fetching data. Please try again later.';
    }
}

// Función para actualizar el favicon
function updateFavicon(iconUrl) {
    // Buscar el elemento link con rel="icon" en el head
    let favicon = document.querySelector('link[rel="icon"]');

    // Si no existe el favicon, lo creamos
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
    }

    // Actualizar la URL del favicon con el icono de la API
    favicon.href = iconUrl;
}


// Evento para el botón de obtener clima
fetchWeatherButton.addEventListener('click', fetchWeather);

// Función para alternar entre modo claro y oscuro
toggleModeButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});
