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


class WeatherCityModel {
    getWeather(city, fn) {
        console.log(city);

        var request = new XMLHttpRequest();

        request.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=781c836c7eb0333d1dd3d45ed4425c6c`);
        request.onload = function (e) {
            e.preventDefault();
            var response = JSON.parse(e.currentTarget.responseText);
            // var temp = response.main.temp;
            var temp = 36;
            console.log('Model:  ' + city);
            fn(temp);
        }
        request.send();
    }
}

class WeatherCityController {
    constructor(model, view) {
        this._model = model;
        this._view = view;
    }

    initialize() {
        this._view.showWeather = this.showWeather.bind(this);
        this._view.render();
    }

    showWeather(cityName) {
        // this._model.getWeather(cityName, this.getWeatherView.bind(this));
        this._model.getWeather(cityName, this._view.render.bind(this));
    }

    // getWeatherView(data) {
    //     this._view.render(data);
    // }
}

class WeatherCityView {

    constructor(li, btn) {
        this._li = li;
        this._btn = btn;
    }

    render(data) {
        var cityName = document.getElementById('city-input').value;
        var liCity = document.getElementById('city-temp');
        var btnSubmit = document.getElementById('city-btn-submit');
        
        console.log('Rednder: ' + cityName);

        liCity.innerHTML = '<h3>' + data + '</h3>';
        btnSubmit.addEventListener('click', this.showWeather(`${cityName}`), false);
    }
}

var model = new WeatherCityModel();
var view = new WeatherCityView();
var controller = new WeatherCityController(model, view);

controller.initialize();

// First  key 3da143c97d8e7fd1ae65094d23d3cf69
// Second key 781c836c7eb0333d1dd3d45ed4425c6c