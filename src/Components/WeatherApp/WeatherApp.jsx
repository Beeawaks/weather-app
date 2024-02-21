import React, { useState } from "react"
import './WeatherApp.css'

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';


const WeatherApp = () => {

    let api_key = "YOUR_API_KEY"
    const [wicon, setWicon] = useState(clear_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value === ""){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");
        const type = document.getElementsByClassName("weather-type");
        const feelsLike = document.getElementsByClassName("feels-like");
        const pressure = document.getElementsByClassName("pressure-rate");
        const tempMin = document.getElementsByClassName("temp-min");
        const tempMax = document.getElementsByClassName("temp-max");


        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp) + " °C";
        location[0].innerHTML = data.name;
        type[0].innerHTML = data.weather[0].main;
        feelsLike[0].innerHTML = Math.floor(data.main.feels_like) + " °C";
        pressure[0].innerHTML = Math.floor(data.main.pressure) + " hPa";
        tempMin[0].innerHTML = Math.floor(data.main.temp_min) + " °C";
        tempMax[0].innerHTML = Math.floor(data.main.temp_max) + " °C";

        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
            setWicon(snow_icon);
        }
        else{
            setWicon(clear_icon);
        }
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

  return (
    <div className="container">
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder="Search" onKeyDown={(e) => {
                                                                                if (e.key === "Enter")
                                                                                    search();
            }}/>
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="" />
        </div>
        <div className="weather-type">-</div>
        <div className="weather-temp">-</div>
        <div className="weather-location">-</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} className="icon" alt="" />
                <div className="data">
                    <div className="humidity-percent">-</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} className="icon" alt="" />
                <div className="data">
                    <div className="wind-rate">-</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>

        <div className="detail-button">
            {isOpen ? (
                <button onClick={toggleDropdown} style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'white',
                    padding: '15px 32px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '20px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    borderRadius: '8px',
                  }}>Hide Details</button>
                ) : (
                <button onClick={toggleDropdown} style={{
                    backgroundColor: 'transparent', 
                    border: 'none',
                    color: 'white',
                    padding: '15px 32px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '20px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    borderRadius: '8px',
                  }}>Show Details</button>
                )}
            {isOpen && (
                <>
                <div className="detail-container">
                    <div className="element">
                        <div className="data">
                            <div className="feels-like">-</div>
                            <div className="text">Feels Like</div>
                        </div>
                    </div>
                    <div className="element">
                        <div className="data">
                            <div className="pressure-rate">-</div>
                            <div className="text">Pressure</div>
                        </div>
                    </div>
                </div>

                <div className="detail-container">
                    <div className="element">
                        <div className="data">
                            <div className="temp-min">-</div>
                            <div className="text">Temperature (Min)</div>
                        </div>
                    </div>
                    <div className="element">
                        <div className="data">
                            <div className="temp-max">-</div>
                            <div className="text">Temperature (Max)</div>
                        </div>
                    </div>
                </div>

                </>
            )}
        </div>
    </div>
  )
};

export default WeatherApp;
