function getForecast(city) {
    const apiKey = '7ead51f4d43b3ee0ac451738a3ea079d';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=cz`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function displayForecast(data) {
    let forecastHtml = '';
    data.list.forEach((item, index) => {
        if (index % 8 === 0) { // Každý den má 8 intervalů po 3 hodinách
            forecastHtml += `
                <div class="dayForecast">
                    <h3>${new Date(item.dt * 1000).toLocaleDateString()}</h3>
                    <p>Průměrná teplota: ${item.main.temp} °C</p>
                    <p>${item.weather[0].description}</p>
                    <p>Vlhkost: ${item.main.humidity}%</p>
                </div>
            `;
        }
    });
    document.getElementById('forecastHeader').style.display = 'block'; // Zobrazí nadpis
    document.getElementById('forecastWeatherResult').style.display = 'flex'; // Zobrazí předpověď
    document.getElementById('forecastWeatherResult').innerHTML = forecastHtml;
}

function displayWeather(data) {
    const weather = `
        <h2>Aktuální počasí ve městě: ${data.name}</h2>
        <p>Teplota: ${data.main.temp} °C</p>
        <p>Aktuální situace: ${data.weather[0].description}</p>
        <p>Vlhkost: ${data.main.humidity}%</p>
    `;
    document.getElementById('currentWeatherResult').innerHTML = weather;
    document.getElementById('currentWeatherResult').style.display = 'block'; // Zobrazí výsledek
}

function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '7ead51f4d43b3ee0ac451738a3ea079d';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=cz`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Přidáno pro diagnostiku
            displayWeather(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

