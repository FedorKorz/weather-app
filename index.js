/**
 * MVC
 * Model - управление состоянием приложения, работа со стронными данными
 * View - представление приложения (Работа c DOM)
 * Controller - логика приложения, посредник между Model и View.
 */

class WeatherAppModel {
    getWeather(cityName, fn) {

        const request = new XMLHttpRequest();
        const key = '781c836c7eb0333d1dd3d45ed4425c6c';

        request.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${key}`);
        request.onload = function (e) {
            e.preventDefault();
            let response = JSON.parse(e.currentTarget.responseText);
            let weatherObject = response.main;
            fn(weatherObject, cityName);
        }
        request.send();
    };
};

class WeatherAppController {
    constructor(model, view) {
        this._model = model;
        this._view = view;
    };

    initialize() {
        this._view.showWeather = this.showWeather.bind(this);
        this._view.render();
    };

    showWeather(cityName) {
        this._model.getWeather(cityName, this._view.render.bind(this._view));
    };
};

class WeatherAppView {

    constructor(li, btn) {
        this._li = li;
        this._btn = btn;
    };

    apndCityWeather(weatherObject, cityName) {

        const item = document.createElement('div');
        const ulList = document.querySelector('.city-list');
        let celsiusTemp = weatherObject.temp - 273;
        console.log(weatherObject);
        
        item.innerHTML =  
            `<div class="item">
                <div class="weather-overall">
                <div class="city-name">
                    <h3>${ cityName }</h3>
                </div>
                <div class="temp">
                    <img src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2016/png/iconmonstr-weather-2.png&r=0&g=0&b=0"/>
                    <span class="temp-val">${ celsiusTemp.toFixed(1) }</span>
                </div>
                </div>
                <div class="weather-params">
                <div class="pressure">
                    <span class="param">Давление</span><br>
                    <span class="value">${ weatherObject.pressure } мм рт. ст.</span>
                </div>
                <div class="wind">
                    <span class="param">Ветер</span><br>
                    <span class="value">14.0 м/с З</span> 
                </div>
                <div class="humidity">
                    <span class="param">Влажность</span><br>
                    <span class="value">${ weatherObject.humidity }%</span>
                </div>
                </div>
            </div>`;

        ulList.appendChild(item);
    }

    render(weatherObject, cityName) {

        const btnSubmit = document.getElementById('city-btn-submit');

        if (weatherObject !== undefined) {
            this.apndCityWeather(weatherObject, cityName); 
        };

        btnSubmit.onclick = () => {
            let cityName = document.getElementById('city-input').value;
            this.showWeather(`${cityName}`);
        };
    };
};

var view = new WeatherAppView();
var model = new WeatherAppModel();
var controller = new WeatherAppController(model, view);

controller.initialize();

// First  key 3da143c97d8e7fd1ae65094d23d3cf69
// Second key 781c836c7eb0333d1dd3d45ed4425c6c