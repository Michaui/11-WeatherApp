import "./style.css";

// @param {Object.<string, string>} query - An object with string keys and string values.
async function getWeather(queryPara) {
  const query = new URLSearchParams(queryPara);

  query.append("units", "metric");
  query.append("appID", import.meta.env.VITE_OPENWEATHERMAP_API_KEY);
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${query.toString()}`
  );

/*
Wenn das JSON der Funktion übergeben wird, muss das JSON nicht aufgelöst werden,
weil .then() eine funktion eines promise ist -> Dass die gleiche Funktion hat, wie das promise.
Siehe Funktionsaufruf: getWeather({q:'Duisburg'}).then(console.log);

//return data.json();

Hier ist eine Erklärung und ein überarbeitetes Beispiel:
fetch() ist asynchron: Die fetch-Funktion ruft eine Netzwerkanfrage ab und gibt ein Promise zurück. Wenn die Anfrage abgeschlossen ist, wird das Promise mit einem Response-Objekt aufgelöst.
Response.json() ist ebenfalls asynchron: Die Methode json() des Response-Objekts liest den Body der Antwort und gibt ebenfalls ein Promise zurück, das mit den geparsten JSON-Daten aufgelöst wird.
*/
const dataWeather = await data.json()

showWeatherData(dataWeather);
// console.log(dataWeather.weather[0].description); 
};

// async function getWeatherByZip(zip){
//     return getWeather({zip})
// }

//OBJEKT WRAPPER
// getWeatherByZip({zip: "94040,us}) => getWeatherByZip("94040,us")
async function getWeatherByZip(countryCode) {
  return getWeather({ zip: countryCode });
}

getWeather({q:'Duisburg'});
// getWeather({lat: "44.43", lon: "10.99"}).then(console.log);
// getWeatherByZip("47057,de").then(console.log);

function showWeatherData(weatherJSON){
    const json = weatherJSON;
    console.log(json);

    // Nicht mehr notwending, weil in der URL optional unit:metric als default definiert wird. 
    // const tempKelvin = weatherJSON.main.temp;
    // const currentTempCel = tempKelvin - 273.15; 
    // const currentTempFar = (tempKelvin - 273.15) * 9/5 + 32;
    // console.log(tempKelvin);

    const currentTempCel = weatherJSON.main.temp;
    const currentTempFar = currentTempCel * 9/5 + 32;
    console.log(currentTempCel);
    console.log(currentTempFar.toFixed(2));

    const location = weatherJSON.name;
    console.log(location);

    const weatherDescription = weatherJSON.weather[0].description;
    console.log(weatherDescription);
}