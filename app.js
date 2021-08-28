let address = document.querySelector('#city_name');
let buttom = document.querySelector('#buttom_get_address');
let AppApi = 'aa8bcae49111843a295ac4c34e9f1c2c';
let locationj = document.querySelector('#location');
let box_caner = document.querySelector('.box_caner');
let box_show_weather = document.querySelector('.show_weather');
let name_location = document.querySelector('#name_location');
let icon_weather = document.querySelector('#icon_weather');

buttom.onclick = function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+address.value+'&appid='+AppApi+'&lang=vi&units=metric')
    .then(response => response.json())
    .then(data => {
        Showweather(data)
    });
}

locationj.onclick = function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude; 
            fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid='+AppApi+'&lang=vi&units=metric')
            .then(response => response.json())
            .then(data => {
                Showweather(data)
            });
        });
    }
}

function Showweather(data){
    box_caner.style.display = 'none';
    box_show_weather.style.display = 'block';
    name_location.innerHTML = data.name;

    let weather = data.weather[0];
    let main = data.main;
    let sys = data.sys;
    let clouds = data.clouds;
    let wind = data.wind;

    icon_weather.src = 'images/'+weather.icon+'@2x.png';
    document.querySelector('#description').innerHTML = weather.description;

    document.querySelector('#temp').innerHTML = main.temp;
    document.querySelector('#humidity').innerHTML = main.humidity;

    document.querySelector('#sunrise').innerHTML = convertTime(sys.sunrise);
    document.querySelector('#sunset').innerHTML = convertTime(sys.sunset);

    document.querySelector('#speed').innerHTML = wind.speed;
    document.querySelector('#deg').innerHTML = wind.deg;
    document.querySelector('#gust').innerHTML = wind.gust;

    document.querySelector('#all').innerHTML = clouds.all;

    console.log(data);
}

function convertTime(time){
    let unix_timestamp = time
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + 's';

return formattedTime;
}


