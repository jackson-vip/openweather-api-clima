// váriaveis e Seleção de elementos

const apikey = 'a86cef5d737bf78ed19d3e0aa53cdfd5';
const apiCountryURL = "https://flagsapi.com/BR/flat/16.png";

const cityinput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const hunidityElement = document.querySelector("#hunidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-date")

// FUNÇÕES

const getWeatherDate = async(city) => {
    
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&lang=pt_br&units=metric`;

    // A palavra-chave await só pode ser usada dentro de uma função assíncrona.
    // A palavra-chave await faz com que a função pause a execução e espere por uma promessa resolvida antes de continuar:
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    
    // Para consultar os dados recebidos da nossa API descomente a linha abaixo.
    // console.log(data);

    return data  
};

// fun.  
const showWeatherData = async(city) =>{
    const data = await getWeatherDate(city);
    incoCountry = data.sys.country;
    
    cityElement.innerText = data.name; 
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", `https://flagsapi.com/${incoCountry}/flat/16.png`);
    hunidityElement.innerText = `${data.main.humidity} %`;
    windElement.innerText = `${data.wind.speed} km/h`;

    weatherContainer.classList.remove("hide");
};

// EVENTOS 

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
 
    const city = cityinput.value; 
        
    showWeatherData(city); 
});

cityinput.addEventListener("keyup", (e) =>{

    if (e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
    }
});