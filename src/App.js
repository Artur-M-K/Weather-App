import React, {useEffect, useState} from 'react';
import './App.css';

import SearchResult from './components/SearchResult';
import Weather from './components/Weather';
import Search from './components/Search';
import Choose from './components/Choose';
import Error from './components/Error';

function App() {

  const [searchResult, setSearchResult] = useState();
  const [cityData, setCityData] = useState([]);
  const [weather, setWeather] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();
  // const [latPos, setLatPos] = useState();
  // const [longPos, setLongPos] = useState();

  let lat = 0;
  let long = 0;
  let city = '';

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position)=> {
  //     setLatPos(position.coords.latitude);
  //     setLongPos(position.coords.longitude);

  // })
  
  // },[]);
    
  

  useEffect(() => {
    const API = `https://api.climacell.co/v3/weather/nowcast?lat=${lat}&lon=${long}&unit_system=si&timestep=60&start_time=now&fields=cloud_cover&fields=precipitation&fields=weather_code&fields=baro_pressure&fields=wind_speed&fields=humidity&fields=temp&apikey=8BB99d2Fe9dpRTWhP16ayEEqZlWEQVQo`;

    fetch(API)
    .then(response => {
      if(response.ok) {
        return response;
      } 
      throw Error(response.status)
    })
    .then(response => response.json())
    .then(data => {
      setWeather(data);
      
    })

    const DAILY = `https://api.climacell.co/v3/weather/forecast/daily?lat=${lat}&lon=${long}&unit_system=si&start_time=now&fields=temp&fields=precipitation&fields=precipitation_probability&fields=sunrise&fields=sunset&fields=weather_code&fields=wind_direction&apikey=8BB99d2Fe9dpRTWhP16ayEEqZlWEQVQo`;

    fetch(DAILY)
    .then(response => {
      if(response.ok) {
        return response;
      } 
      throw Error(response.status)
    })
    .then(response => response.json())
    .then(data => {
      setDailyWeather(data.slice(0,7));
      
    })

  }, [cityData])

  // console.log(latPos, longPos)
  const handleSubmit = () => {
    console.log(searchResult)
    if (searchResult === undefined || searchResult === '') {
      setError("This field can't be empty!!! , please write a city name");
      setIsError(true);
    } else if (searchResult.toString().length < 3) {
      setError('write min 3 characters');
      setIsError(true);
    }else{
      
      setIsError(false);
      const API = `http://api.positionstack.com/v1/forward?access_key=5904a60050be0602ed8567eba311f76b
&query=${searchResult}&limit=1`;

    fetch(API)
    .then(response => {
      if (response.ok) {
        return response;
      }
      throw Error(response.status)
    })
    .then(response => response.json())
    .then(data => {
      if (data.data.length<1) {
        setError("can't find this name in database, please write correct name");
      setIsError(true);
      } else {
        setCityData(data);
      }
      
      
      })
    }
  }
    

  const searchResults = cityData.data;
    let result = null;
    if (searchResults !== undefined) {
        result = searchResults.map((item,index) => (
          lat = item.latitude,
          long = item.longitude,
          city = item.name,
            <div key={index} className='list-group-item list-group-item-dark'>
              <p>country: <span>{`${item.country}`}</span> continent: <span>{item.continent}</span></p> 
                <h2>{`${item.label} / (${item.country_code})`}</h2>
                          
            </div>
        ));
    } else {
      result = (<div className='list-group-item list-group-item-dark'>
      <p>country: <span>{`N/A`}</span> continent: <span>N/A</span></p> 
        <h2>{``}</h2>
        </div>)
    }

    const handleClick = () => {
      setIsActive(!isActive);
      
  }
  const handleSearch = (e) => {
    setSearchResult(e.target.value);
  }
  
  return (
    <div className="container-fluid">
      <Search 
      search={handleSearch} submit={handleSubmit}
      />
      {isError?<Error error={error}/>:null}
      <SearchResult 
        result={result}
      />
      <Choose 
        isActive={isActive} 
        click={handleClick}>
      </Choose>
      <Weather 
        data={lat !== 0?weather:undefined} 
        dataDaily={lat !== 0?dailyWeather:undefined}
        city={city} 
        isActive={isActive}/>
        <footer>&copy; Copyright 2021 Artur Kosmatka</footer>
    </div>
  );
}

export default App;
