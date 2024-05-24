var startPos;
export var latitude;
export var longitude;
let initialized = false;
// Nur für das Google Maps Canvas notwendig.
// var map;

export function init() {
  if (navigator.geolocation) {
    document.getElementById("support").innerHTML =
      "<p style='color:green'>Great! This browser supports HTML5 Geolocation</p>";
    navigator.geolocation.getCurrentPosition(
      updateLocation,
      handleLocationError,
      {
        timeout: 50000,
      }
    );

    //navigator.geolocation.watchPosition(updateCurrPosition,handleLocationError);
  } else {
    document.getElementById("support").innerHTML =
      "<p style='color:red'>Oops! This browser does not support HTML5 Geolocation</p>";
  }
}

function updateLocation(position) {
  startPos = position;

  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  //   console.log(latitude, longitude);
  initialized = true; // Markiere die Initialisierung als abgeschlossen

  //document.getElementById("startLat").innerHTML = latitude;
  //document.getElementById("startLon").innerHTML = longitude;

  //GOOGLE MAPS MAP_CANVAS
  //   var coords = new google.maps.LatLng(latitude, longitude);

  //   var mapOptions = {
  //     zoom: 10,
  //     center: coords,
  //     mapTypeControl: false,
  //     navigationControlOptions: {
  //       style: google.maps.NavigationControlStyle.SMALL,
  //     },
  //     mapTypeId: google.maps.MapTypeId.ROADMAP,
  //   };

  //   map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

  //   var marker = new google.maps.Marker({
  //     position: coords,
  //     map: map,
  //     title: "Your current location!",
  //   });
}

function handleLocationError(error) {
  switch (error.code) {
    case 0:
      updateStatus(
        "There was an error while retrieving your location: " + error.message
      );
      break;

    case 1:
      updateStatus(
        "The user prevented this page from retrieving the location."
      );
      break;

    case 2:
      updateStatus(
        "The browser was unable to determine your location: " + error.message
      );

      break;

    case 3:
      updateStatus("The browser timed out before retrieving the location.");

      break;
  }
}

function updateStatus(msg) {
  document.getElementById("divStatus").innerHTML = msg;
}

export function isInitialized() {
  return initialized;
}
