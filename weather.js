let city = document.getElementById("city");
        let degree = document.getElementById("degree");
        let humidity = document.getElementById("humidity");
        let pressure = document.getElementById("pressure");
        let wind = document.getElementById("wind");
        let sunr = document.getElementById("sunrise");
        let suns = document.getElementById("sunset");
        let image = document.getElementById("image");
        let clear = document.getElementById("clear");
        let state = document.getElementById("country");
        let input = document.getElementById("input");
        let btn = document.getElementById("btn");

        // let std = document.getElementById("student");
        // std.setAttribute('src', pic);

        function getCelcius(data) {
            return Math.round(parseFloat(data) - 273.15);
        }

        function getHour(time) {
            let hour = new Date(time * 1000).getHours();
            return adjustTime(parseInt(hour));
        }

        function getMinute(time) {
            let min = new Date(time * 1000).getMinutes();
            return adjustTime(parseInt(min));
        }

        function adjustTime(time) {
            return time < 10 ? "0" + time : time;
        }

        input.addEventListener('focusin', () => {
            input.style.border = "1px solid #bc9a70";
        });

        async function weather() {

            let place = "xonqa"
            if (input.value != "") {
                place = input.value;
            }

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=81a5d39de1b847d6a3b7fbc04912b1f4`;
            let weatherData = await fetch(url);

            if (weatherData.status == "404" || weatherData.status == "400") {
                input.style.border = "2px solid red";
                return;
            }

            let weather = await weatherData.json();

            if (weather.cod) {
                degree.textContent = getCelcius(weather.main.temp);
                city.textContent = weather.name;
                humidity.textContent = weather.main.humidity;
                pressure.textContent = weather.main.pressure;
                clear.textContent = weather.weather[0].description;

                let icon = weather.weather[0].icon;
                image.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@4x.png`);

                wind.textContent = weather.wind.speed;

                let { country, sunrise, sunset } = weather.sys;

                state.textContent = country;

                let riseHour = getHour(sunrise);
                let setHour = getHour(sunset);
                let riseMin = getMinute(sunrise);
                let setMin = getMinute(sunset);

                sunr.textContent = `${riseHour}:${riseMin}`;
                suns.textContent = `${setHour}:${setMin}`;
            }
        }

        btn.addEventListener('click', weather);
        window.onload = weather;