import "./style.css";
import { init, latitude, longitude, isInitialized } from './location.js';


document.addEventListener('DOMContentLoaded', (event) => {
  init();
  
  // Überprüfe kontinuierlich, ob init() abgeschlossen ist, mit einem Intervall von 100 Millisekunden
  setTimeout(() => {
    if (isInitialized()) {
      console.log(latitude, longitude); // Hier kannst du auf latitude und longitude zugreifen
      // latitude.toFixed(2);
      // longitude.toFixed(2);
      getWeather({lat: `${latitude}`, lon: `${longitude}`})
    }
  }, 100);
});


// console.log(latitude, longitude); // Auf die latitude und longitude zugreifen


//.value macht hier kein Sinn, weil zum Zeitpunkt vom Seitenaufruf nichts drin steht. 
//let locationField = document.getElementById('locationField').value; 
let locationField = document.getElementById('locationField'); 
locationField.addEventListener('keypress', handleEvent); 

let searchBtn = document.getElementById('searchBtn').addEventListener('click', handleEvent);

function handleEvent(event){
  if(event.key == 'Enter' || event.type === 'click'){
    let locationFieldValue = locationField.value.trim(); 
    let regex = /^\d+,[a-zA-Z]{2}$/; //Validierung von PLZ Eingabe z.B.: 59555,de
    /*
      ^: Der Anker "^" stellt sicher, dass der reguläre Ausdruck am Anfang des Strings passt.
      \d+: Übereinstimmung mit einer oder mehreren Ziffern.
      ,: Übereinstimmung mit einem Komma.
      [a-zA-Z]+: Übereinstimmung mit einem oder mehreren Buchstaben (Groß- oder Kleinbuchstaben).
      $: Der Anker "$" stellt sicher, dass der reguläre Ausdruck am Ende des Strings passt.
    */
  
    //Wenn locationFieldValue Zahlen gefolgt von Komma und Buchstabe ist. 
    if(regex.test(locationFieldValue) && locationFieldValue !== ''){
      //getWeatherByZip("47057,de")
      getWeatherByZip(locationFieldValue); 
    } 
    //Wenn locationFieldValue nur Text bzw. Stadt ist 
    if(/[a-zA-Z]/.test(locationFieldValue) && locationFieldValue !== ''){
      //getWeather({q:'Mainz'})
      getWeather({q:locationFieldValue})
    }
    if(true){
      //MUSS NOCH DEFINIERT WERDEN LOG, LON 
    }
    else {
      console.log("SCHEI?E")
    }
  }
}

// @param {Object.<string, string>} query - An object with string keys and string values.
async function getWeather(queryPara) {
  const query = new URLSearchParams(queryPara);

  query.append("units", "metric");
  query.append("appID", import.meta.env.VITE_OPENWEATHERMAP_API_KEY);
  const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?${query.toString()}`
  );

  const dataWeather = await data.json();
  //return dataWeather; -> Nur notwendig, wenn Funktionsaufruf mit .then(console.log); ausgeführt wird. 
  //console.log(dataWeather.weather[0].description); 
  showWeatherData(dataWeather);
};

/*
Wenn das JSON der Funktion übergeben wird, muss das JSON nicht aufgelöst werden, weil .then() eine funktion eines promise ist -> Dass die gleiche Funktion hat, wie das promise.
Siehe Funktionsaufruf: getWeather({q:'Duisburg'}).then(console.log);
//return data.json();

Hier ist eine Erklärung und ein überarbeitetes Beispiel:
fetch() ist asynchron: Die fetch-Funktion ruft eine Netzwerkanfrage ab und gibt ein Promise zurück. Wenn die Anfrage abgeschlossen ist, wird das Promise mit einem Response-Objekt aufgelöst.
Response.json() ist ebenfalls asynchron: Die Methode json() des Response-Objekts liest den Body der Antwort und gibt ebenfalls ein Promise zurück, das mit den geparsten JSON-Daten aufgelöst wird.
*/

//OBJEKT WRAPPER
// getWeatherByZip({zip: "94040,us}) => getWeatherByZip("94040,us")
async function getWeatherByZip(countryCode) {
  // das "return" ist nur notwendig, wenn der Aufruf der Funktion ein .then folgt, damit die verarbeiteten Daten dargestellt werden können. -> getWeatherByZip("47057,de").then(console.log);
  // return getWeather({ zip: countryCode });
  getWeather({ zip: countryCode });
}


function showWeatherData(weatherJSON){
    const json = weatherJSON;
    console.log(json);

    // Nicht mehr notwending, weil in der URL optional unit:metric als default definiert wird. 
    // const tempKelvin = weatherJSON.main.temp;
    // const currentTempCel = tempKelvin - 273.15; 
    // const currentTempFar = (tempKelvin - 273.15) * 9/5 + 32;
    // console.log(tempKelvin);

    const currentTempCel = document.getElementById('tempState').innerText = weatherJSON.main.temp;
    // Durch die Klammern bei (currentTempCel * 9/5 + 32) besteht die Möglichkeit eine weitere Funktion anzuhängen
    document.getElementById('tempStateFar').innerText = (currentTempCel * 9/5 + 32).toFixed(2);
    document.getElementById('locationState').innerText = weatherJSON.name;
  
    document.getElementById('weatherState').innerText = weatherJSON.weather[0].description;
}

// getWeather({q:'Mainz'}).then(console.log);
// getWeather({lat: "44.43", lon: "10.99"}).then(console.log);
// getWeatherByZip("47057,de").then(console.log);

// getWeather({lat: "44.43", lon: "10.99"})

//Toggle zwischen Celsius und Fahrenheit
//Giphy Bild einbinden (API)
//Projekt designen & stylen