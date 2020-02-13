function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("failed");
    }
}

let weatherAddcity = localStorage.getItem("weathercity");
// let weatherAddtemp = localStorage.getItem("weathertemp");
// let weatherAddiconurl = localStorage.getItem("weathericonurl");
// let weatherAddtype = localStorage.getItem("weathertype");
let weatherShow = JSON.parse(weatherAddcity);

//If data isn't current 
function dataFetch(url, current = false) {
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    //Data that isn't current.
                    let section = document.createElement("section");
                    section.classList.add('weatherAdd');

                    let cityname = document.createElement("p");
                    cityname.innerHTML = data.name;
                    section.appendChild(cityname);

                    let temp = document.createElement("p");
                    temp.innerHTML = data.main.temp + " °C";
                    section.appendChild(temp);

                    let iconurl = document.createElement("img");
                    iconurl.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                    section.appendChild(iconurl);

                    let type = document.createElement("p");
                    type.innerHTML = data.weather[0]["description"];
                    section.appendChild(type);

                    return render(section);
                    localStorage.setItem("weathercity", JSON.stringify(data.name));
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
    let section = document.createElement('section');
    section.setAttribute('class', 'cityAdd');
    document.body.appendChild(section);
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=0bda8162eb27abb639d50407de3249ba&units=metric';
    dataFetch(url);
}

function addNewCity() {
    document.querySelector(".weatherSearch__button").addEventListener("click", function() {
    let cityName = prompt("Please enter here your new city", " ");
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=0bda8162eb27abb639d50407de3249ba&units=metric";

    dataFetch(url);
    });
}

getLocation();
addNewCity();


