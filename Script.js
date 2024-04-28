
    const apiKey = "b2936d1df1822277ee11a17ec0e1aecb";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const search = document.querySelector(".search input");
    const button = document.querySelector(".search button");
    const Icon = document.querySelector(".weather-icon");
    const erImg = document.querySelector(".error");
    const weatherContainer = document.querySelector(".weather"); 

    




    async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        erImg.innerHTML = ""; 

        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            const img = document.createElement("img");
            const msg = document.createElement("p");

            img.src = "ICONS/NotFound.avif.png";

            img.style.width = "350px"; 
            img.style.height = "auto"; 
            img.style.padding = "10px"; 
            img.style.marginTop = "10px";

            msg.innerHTML = "Oh no! Looks Like Your Location Does Not Exist";

            erImg.appendChild(msg);
            erImg.appendChild(img);
            
            
            weatherContainer.style.display = "none";
        } else {
            var data = await response.json();
            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";
            document.querySelector(".pressure").innerHTML = data.main.pressure + "hPa";
            document.querySelector(".feels-like").innerHTML = Math.round(data.main.feels_like) + "°c";

            switch (data.weather[0].main) {
                case "Clouds":
                    Icon.src = "ICONS/svg/wi-cloudy.svg";
                    break;
                case "Clear":
                    Icon.src = "ICONS/svg/wi-day-sunny.svg";
                    break;
                case "Rain":
                    Icon.src = "ICONS/svg/wi-rain.svg";
                    break;
                case "Drizzle":
                    Icon.src = "ICONS/svg/wi-rain-mix.svg";
                    break;
                case "Mist":
                    Icon.src = "ICONS/svg/wi-day-fog.svg";
                    break;
            }

            
            weatherContainer.style.display = "block";
            
           
            document.querySelector(".error").style.display = "none";
        }
    }

    button.addEventListener("click", () => {
        if(search.value === ""){
        alert ("Well this is embarassing! You forgot to fill in the field");
    }else{

   
        checkWeather(search.value);
    }
    }
    );
    const checkEnterKey = (event) => {
        if (event.key === "Enter") {
          if (search.value === "") {
            alert("Well, this is embarrassing! You forgot to fill in the field.");
          } else {
            checkWeather(search.value);
          }
        }
      };
      
      search.addEventListener("keyup", checkEnterKey);
      

    
 