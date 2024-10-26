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
            displayWeather(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function displayWeather(data) {
    const weather = `
        <h2>Počasí v ${data.name}</h2>
        <p>Teplota: ${data.main.temp} °C</p>
        <p>Popis: ${data.weather[0].description}</p>
        <p>Vlhkost: ${data.main.humidity}%</p>
    `;
    document.getElementById('weatherResult').innerHTML = weather;
}
