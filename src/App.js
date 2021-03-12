import React, {useState} from "react";
import keys from "./keys";
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBInput, MDBCol } from "mdbreact";


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
        
         }
         );
      
    }
  };
  return(
    <main>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <div>
    <MDBCol md="6">
      <MDBInput hint="What's your location..." type="text" containerClass="active-pink active-pink-2 mt-0 mb-3"  onChange={(e) => setQuery(e.target.value)} value={query}
       onKeyPress={search} />
    </MDBCol>
     {typeof weather.main != "undefined" ? (
       <div className="container-fluid px-1 px-sm-3 py-5 mx-auto">
       <div className="row d-flex justify-content-center">
         <div className="row card0">
           <div className="card1 col-lg-8 col-md-7"> <small className="Title">AMJWEATHER</small>
             <div className="text-center"></div>
             <div className="row px-3 mt-3 mb-3">
               <h1 className="Temperature"> {Math.round(weather.main.temp)}°C</h1>
               <div className="div1">
                <h2 className="Location">{weather.name}, {weather.sys.country}</h2> <small className="Date">{dateSettigs(new Date())}</small>
               </div>
               <div className="d-flex flex-column text-center">
               </div>
             </div>
           </div>
           <div className="card2 col-lg-4 col-md-5">
             <div className="mr-5">
               <p className="light-text suggestion"></p>
               <p className="light-text suggestion"></p>
               <p className="light-text suggestion"></p>
               <p className="light-text suggestion"></p>
               <div className="line my-5" />
               <p className="weatherDetails">Weather Details</p>
               <div className="row px-3">
                 <p className="light-text">Weather Description</p>
                 <p className="ml-auto">{weather.weather[0].main}</p>
               </div>
               <div className="row px-3">
                 <p className="light-text">Feels Like</p>
                 <p className="ml-auto">{Math.round(weather.main.feels_like)}°C</p>
               </div>
               <div className="row px-3">
                 <p className="light-text">Humidity</p>
                 <p className="ml-auto">{weather.main.humidity}</p>
               </div>
               <div className="row px-3">
                 <p className="light-text">Wind</p>
                 <p className="ml-auto">{weather.wind.speed}km/h</p>
               </div>
               <div className="line mt-3" />
             </div>
           </div>
         </div>
       </div>
     </div>
      
        ) : (
          <p className="errorMessage"></p>
        )}
  </div>
  </main> 
  );
  
}
     
export default App;
