


const form1 = document.querySelector("#weatherAPI")
let city_name = form1.addEventListener("submit", (event) => {
    event.preventDefault();
    let input = document.querySelector("#weather").value
    loadData(input)
    
});

const APIkey = "04f7e16f42a93f7ccc0430eb3c096576"

const getDataCity = async(city) =>{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`)
    const data = await res.json()
    return data

};

const getDataZip = async(zipcode) =>{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${APIkey}`)
    const data = await res.json()
    return data
};



const loadData = async (input) => {
    if(isNaN(input)==false){
        try{
            const data = await getDataZip(input)
            createList(data.name, data.main.temp_max, data.main.temp_min, data.weather[0].main, data.main.humidity, data.main.temp, data.wind.gust, data.sys.sunrise, data.sys.sunset,data.timezone)
        }catch(error){
            alert("Invalid input")
        }
    }else{
        try{
            const data = await getDataCity(input)
            createList(data.name, data.main.temp_max, data.main.temp_min, data.weather[0].main, data.main.humidity, data.main.temp, data.wind.gust,data.sys.sunrise, data.sys.sunset,data.timezone)
        }catch(error){
            alert("Invalid input")
        }   
    }
};

const createList = (name, high, low, forecast, humidity, current, wind,sunrise,sunset,timezone) => {
    const table = `
    <table class="table">
        <thead>
          <tr>
            <th scope="col">${name}</th>
            <th scope="col">Current temperature</th>
            <th scope="col">Forecast</th>
            <th scope="col">Humidity</th>
            <th scope="col">Wind</th>
            <th scope="col">Highest temperature</th>
            <th scope="col">Lowest temperature</th>
            <th scope="col">Sunrise</th>
            <th scope="col">Sunset</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <th></th>
            <td>${converter(current)}F</td>
            <td>${forecast}</td>
            <td>${humidity}%</td>
            <td>${windconverter(wind)} mph</td>
            <td>${converter(high)}F</td>
            <td>${converter(low)}F</td>
            <td>${unixconverterAM(sunrise+timezone)} AM</td>
            <td>${unixconverterPM(sunset+timezone)} PM</td>
          </tr>
        </tbody>
    </table>
    `
    document.querySelector(".weather-info").insertAdjacentHTML('beforeend',table)
    
};

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

function converter(temp){
    return ((temp-273.15)*(9/5)+32).toFixed(0)
}

function windconverter(meter){
    return (meter*2.237).toFixed(0)
    
}
console.log(windconverter(2.24))
const clearData = () => {
    document.querySelector(".weather-info").innerHTML=""
}

function unixconverterAM(unix){
    const milliseconds = (unix+25200) * 1000
    const date = new Date(milliseconds)
    console.log(date)
    timestamp = ('0' + date.getHours()).slice(-2)+":"+('0' + date.getMinutes()).slice(-2)
    return timestamp
}
function unixconverterPM(unix){
    const milliseconds = (unix+25200) * 1000
    const date = new Date(milliseconds)
    console.log(date)
    timestamp = ('0' + (date.getHours()-12)).slice(-2)+":"+('0' + date.getMinutes()).slice(-2)
    return timestamp
}


// function winddirection(degree){
//     if (degree>337.5) return 'Northerly';
//     if (degree>292.5) return 'North Westerly';
//     if(degree>247.5) return 'Westerly';
//     if(degree>202.5) return 'South Westerly';
//     if(degree>157.5) return 'Southerly';
//     if(degree>122.5) return 'South Easterly';
//     if(degree>67.5) return 'Easterly';
//     if(degree>22.5){return 'North Easterly';}
//     return 'Northerly';

// }
// console.log(winddirection(270))
//could not get the correct direction compared to websites like weather.com