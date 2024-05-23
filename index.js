const API_KEY = "6d91fca354786ff4a31b0e0181de84cd";

const fetchData = (position) => {
  const { latitude, longitude } = position.coords;
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => setWeatherData(data));
};

const setWeatherData = (data) => {
  console.log(data);
  const weatherData = {
    location: data.name,
    description: data.weather[0].main,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    temperature: data.main.temp,
    date: getDate(),
  };
  Object.keys(weatherData).forEach((key) => {
    document.getElementById(key).textContent = weatherData[key];
  });
  cleanUp();
};

const  cleanUp = ()=>{
    let container=document.getElementById('container');
    let loader =document.getElementById('loader');

    loader.style.display='none';
    container.style.display='flex';

}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0'+(date.getMonth()+ 1)).slice(-2)}-${date.getFullYear()}`
}

const onload = () => {
  navigator.geolocation.getCurrentPosition(fetchData);
};
