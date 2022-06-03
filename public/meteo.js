(async function () {
  try {
    let weatherRes;
    let placeRes;
    if (place) {
      weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely&units=metric&lang=fr&appid=547118fa980c7a360bf93ab887af0a20`
      );
    } else {
      responses = await axios.all([
        axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely&units=metric&lang=fr&appid=547118fa980c7a360bf93ab887af0a20`
        ),
        axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=1c98dab0742c4436935e48a704cb73c5`
        ),
      ]);
      weatherRes = responses[0];
      placeRes = responses[1];

      place =
        placeRes.data.results[0].components.town ||
        placeRes.data.results[0].formatted;
      document.title = "Météo — " + place;
    }

    const { current, hourly, daily } = weatherRes.data;
    //current
    const icon = document.querySelector("#icon");
    document.querySelector("#place").innerText = "Météo — " + place;
    document.querySelector("#currentTemp").innerText = Math.round(current.temp);
    document.querySelector("#temp sup").innerText = "°C";
    document.querySelector("#description").innerText =
      current.weather[0].description.replace(/^\w/, (c) => c.toUpperCase());
    icon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`
    );
    icon.classList.add("icon");

    document.querySelector("#feels_like").innerText =
      Math.round(current.feels_like) + " °C";

    document.querySelector("#humidity").innerText =
      Math.round(current.humidity) + " %";

    document.querySelector("#pressure").innerText =
      Math.round(current.pressure) + " mb";

    document.querySelector("#visibility").innerText =
      Math.round(current.visibility / 1000) + " km";

    document.querySelector("#wind").innerText =
      Math.round(current.wind_speed * 3.6) + " km/h";

    document.querySelector(
      "#wind-arrow-icon"
    ).style.transform = `rotate(${current.wind_deg}deg)`;

    document.querySelector("#uvi").innerText =
      Math.round(current.uvi) + " sur 10";

    //hourly
    for (let i = 1; i < 5; i++) {
      const date = new Date(hourly[i].dt * 1000);
      const formattedTime = `${date.getHours()}h00`;
      const parentDiv = document.querySelector(`#hour${i}`);
      parentDiv.querySelector(".time").innerText = formattedTime;
      parentDiv
        .querySelector(".forecastIcon")
        .setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${hourly[i].weather[0].icon}@4x.png`
        );
      parentDiv.querySelector(".temp p").innerText = Math.round(hourly[i].temp);
      parentDiv.querySelector(".temp sup").innerText = "°C";
      parentDiv.querySelector(".precipitations p").innerText =
        Math.round(hourly[i].pop * 100) + "%";
    }
    //daily
    const weekdayForm = window.innerWidth > 350 ? "long" : "short";
    for (let i = 1; i < 5; i++) {
      const dailyDate = new Date(daily[i].dt * 1000);
      let formattedDay = dailyDate.toLocaleString("fr-CA", {
        weekday: weekdayForm,
      });
      if (weekdayForm === "short") {
        formattedDay = formattedDay.slice(0, -1);
      }
      const parentDiv = document.querySelector(`#day${i}`);
      parentDiv.querySelector(".day").innerText = formattedDay;
      parentDiv
        .querySelector(".forecastIcon")
        .setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${daily[i].weather[0].icon}@4x.png`
        );
      parentDiv.querySelector(".temp .min").innerText = Math.round(
        daily[i].temp.min
      );
      parentDiv.querySelector(".temp .max").innerText = Math.round(
        daily[i].temp.max
      );
      parentDiv.querySelector(".precipitations p").innerText =
        Math.round(daily[i].pop * 100) + "%";
    }
    ajustFooter();
  } catch (error) {
    alertMsg(error.name, error.message);
  }
})();
