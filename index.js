/**
 * MVC
 * Model - управление состоянием приложения, работа со стронными данными
 * View - представление приложения (Работа c DOM)
 * Controller - логика приложения, посредник между Model и View.
 */

/**
 * 1. Пользователь пишет название города и нажимает кнопку поиск.
 *  1.1. Во View нужно сделать addEventlistener
 *  2.2. Вызывется функция, которая должна делать запрос к серверу.
 *  2.3. Получив ответ вызываем функцию рендер в контроллере.
 *
 *
 *       class Controller {
 *           constructor(view, model)
 *           initialize() {
 *              this.view.showWeather = showWeather // хз как
 *           }
 *           showWeather(cityName) {
 *              this.view(this.model.getWeather(cityName))
 *           }
 *       }
 *
 *
 *      class View {
 *          render(viewModel) {
 *               <input>'viewModel'</input>
 *               <button id='addCity'></button>
 *               addCity.addEventListener('click', showWeather(cityName));
 *          }
 *      }
 *
 *      class Model {
 *          getWeather() return data
 *      }
 *
 *      var view = new View();
 *      var model = new Model();
 *      var controller = new Controller(view, model);
 *      controller.initialize();
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
        // this._model.getWeather(cityName, this._view.render.bind(this));
        this._model.getWeather(cityName, this._view.render.bind(this._view));
    };
};

class WeatherAppView {

    constructor(li, btn) {
        this._li = li;
        this._btn = btn;
    };

    apndCityWeather(weatherObject) {
        const li = document.createElement('li');
        const ulList = document.querySelector('.city-list');

        li.textContent = JSON.stringify(weatherObject);

        ulList.appendChild(li);
    }

    render(weatherObject, cityName) {

        const btnSubmit = document.getElementById('city-btn-submit');

        if (weatherObject !== undefined) {
            this.apndCityWeather(weatherObject, cityName); // View не имеет своего контекста...
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