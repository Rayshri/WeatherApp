function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("failed");
    }
    loadLocalStorageItems();
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=0bda8162eb27abb639d50407de3249ba&units=metric';
    dataFetch(url, true);
}

function addNewCity() {
    document.querySelector(".weatherSearch__button").addEventListener("click", function() {
    const cityName = prompt("Please enter here your new city", " ");
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=0bda8162eb27abb639d50407de3249ba&units=metric";    
    dataFetch(url);
    // Give cityName with it so it can store
    saveLocalStorageItem(cityName);
    });
}

//If data isn't current 
function dataFetch(url, current = false) {
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    //Data that isn't current.
                    
                    const section = document.createElement("section");
                    section.classList.add('weatherAdd');
                    
                    const cityname = document.createElement("p");
                    cityname.innerHTML = data.name;
                    section.appendChild(cityname);

                    const temp = document.createElement("p");
                    temp.innerHTML = data.main.temp + " °C";
                    section.appendChild(temp);

                    const iconurl = document.createElement("img");
                    iconurl.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                    section.appendChild(iconurl);

                    const type = document.createElement("p");
                    type.innerHTML = data.weather[0].description;
                    section.appendChild(type);

                    if(current) {
                        section.innerHTML += " Current Weather";
                    }
                    return render(section);
                });
            } else {
                console.log("failed");
            }
        });
}

function render(element) {
    return document.body.appendChild(element);
}

function getElement() {
    const section = document.createElement('section');
    section.setAttribute('class', 'cityAdd');
    document.body.appendChild(section);
}

// Save the city name to the localStorage
function saveLocalStorageItem(cityName) {
    // Get the current weateritems
    let weatheritem = JSON.parse(window.localStorage.getItem("cityname"));
    // If there is no weatheritems, create new Array
    if (!weatheritem) {
      weatheritem = [];
    };
    // Add the cityname to the array
    weatheritem.push(cityName);
    // Set the item
    window.localStorage.setItem("cityname", JSON.stringify(weatheritem));
}

function loadLocalStorageItems() {
    // Get the weatheritems
    const weatheritem = JSON.parse(window.localStorage.getItem("cityname"));
    // If there are no weatheritems, do nothing
    if (!weatheritem) {
      return false;
    }
    // Do something for each item
    weatheritem.forEach(function(cityName) {
      // Call the API to get the data
      const url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=0bda8162eb27abb639d50407de3249ba&units=metric"; 
      // Call the fetch to generate Added weather based on the data
      dataFetch(url);
    });
}

getLocation();
addNewCity();