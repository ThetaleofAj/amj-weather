import React, {useState} from "react";
import keys from "./keys";
import 'bootstrap/dist/css/bootstrap.min.css';
import image from './lsk2.jpg';

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

function App(){
  const dateSettigs = (d) => {
    let date = String(new window.Date());
    date = date.slice(3,15);
    return date;
  };
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState ([]);
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setQuery("");
        setWeather(result);
        console.log(result);
         });
      
    }
  };
  
  return(
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 18
            ? "App hot"
            : "App cold"
          : "App"
      }
    >
   <main>
     <div className= "search-container">
      <input type='text' placeholder='Whats your location?....' className='search-bar'
       onChange={(e) => setQuery(e.target.value)}
       value={query}
       onKeyPress={search}
       />

     </div>
    {typeof weather.main != "undefined" ? (
      <card className = "card1"> <small>Zambia weather</small>
      <div className="row px-3 mt-3 mb-3">
      <div className="text-center"> <img className="image" src={image} alt="City image"/> </div>
      <div className="location-container">
        <div className="Location" >
        {weather.name}, {weather.sys.country}
        </div>
        <div className="date">{dateSettigs(new Date())}</div>
      </div>
      <div className="weather-container">
        <div className="temperature" class="large-font mr-3">
        {Math.round(weather.main.temp)}°C
        </div>
        <div className="weather">{weather.weather[0].description}</div>
      </div>
      </div>
      </card>
    ) : (
      ""
    )}
   </main>
  </div> 
  );
     }

     
export default App;
