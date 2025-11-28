import React, { useState, useEffect, useCallback } from 'react';

export default function ApiTemplate() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [list, setList] = useState([]); 
  const [locationLoading, setLocationLoading] = useState(false);

  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const GEO_URL = 'https://api.openweathermap.org/geo/1.0/reverse';
  const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedCity = useDebounce(city, 2000); 

  const fetchData = useCallback(async (cityName) => {
    if (!API_KEY) {
      setError('Missing OpenWeather API key (VITE_OPENWEATHER_KEY)');
      return;
    }
    if (!cityName?.trim()) {
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const url = `${BASE_URL}?q=${encodeURIComponent(cityName.trim())}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
      setList((prevList) => {
        if (!prevList.some(item => item.name === result.name)) {
          return [...prevList, { 
            name: result.name, 
            temp: result.main.temp, 
            feels_like: result.main.feels_like,
            humidity: result.main.humidity,
            pressure: result.main.pressure,
            visibility: result.visibility,
            wind_speed: result.wind.speed,
            weather: result.weather[0].description,
            weather_main: result.weather[0].main
          }];
        }
        return prevList;
      });

      console.log('API Data:', JSON.stringify(result, null, 2));
    } catch (err) {
      setError(err.message);
      setData(null);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [API_KEY, BASE_URL]);

  useEffect(() => {
    if (debouncedCity) {
      fetchData(debouncedCity);
    } else {
      setData(null);
    }
  }, [debouncedCity, fetchData]);

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const geoUrl = `${GEO_URL}?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
          
          const geoResponse = await fetch(geoUrl);
          const geoData = await geoResponse.json();
          
          if (geoData[0]) {
            const cityName = geoData[0].name;
            setCity(cityName); 
          } else {
            setError('Could not find city for your location');
          }
        } catch (err) {
          setError('Failed to get location name');
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        setError(`Location error: ${error.message}`);
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const deleteIt = () => {
    setList([]);
  };

  const clearentry = () => {
    setCity('');
  };

  return (
    <div style={{ padding: '20px'}}>
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection: "column", 
        gap: "20px",
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <h1 style={{fontFamily:"sans-serif",color:"white"}}>Live Weather Search</h1>
        <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '400px' }}>
          <div style={{display:"grid",gridTemplateColumns: "2fr 1fr",gap:'10px', width: '100%'}}>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Type city name"
              style={{
                padding: '12px', 
                border: '2px solid #795484', 
                borderRadius: '8px',
                fontSize: '16px',
                color:"white",
                backgroundColor:"black"
              }}
            />
            <button 
              onClick={getCurrentLocation} 
              disabled={locationLoading}
              style={{ 
                padding: '12px 8px', 
                background: '#8546d6', 
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: locationLoading ? 'not-allowed' : 'pointer',
                fontSize: '14px'
              }}
            >
              {locationLoading ? 'Locating...' : 'My Location'}
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '400px' }}>
          <button 
            onClick={clearentry} 
            style={{ 
              flex: 1,
              padding: '12px 24px', 
              background: '#9c2dcb', 
              color: 'white',
              border: 'none',
              borderRadius: '8px',
            }}
          >
            Clear Entry
          </button>
          <button 
            onClick={deleteIt} 
            style={{ 
              flex: 1,
              padding: '12px 24px', 
              background: '#9c2dcb', 
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: list.length === 0 ? 'not-allowed' : 'pointer',
              opacity: list.length === 0 ? 0.5 : 1
            }}
            disabled={list.length === 0}
          >
            Clear List ({list.length})
          </button>
        </div>
        {loading && <p><img src="https://i.pinimg.com/originals/e2/81/b4/e281b46fe1ca49e93c515014ad278f0c.gif" style={{height:"100px",width:"150px"}} alt="" /></p>}
        {error && <p style={{ color: 'red' }}> {error}</p>}
        
        {data && !error && (
          <div style={{ 
            background: 'linear-gradient(90deg, #94229e 0%, #2f137c 100%)', 
            color: 'white',
            padding: '25px', 
            borderRadius: '20px', 
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            width: '100%',
            maxWidth: '400px'
          }}>
            <h2>{data.name}, {data.sys.country}</h2>
            <p style={{ fontSize: '3.5em', margin: '0', fontWeight: 'bold' }}>
              {Math.round(data.main.temp)}°C
            </p>
            <p style={{ fontSize: '1.2em', margin: '5px 0 0 0' }}>
              {data.weather[0].main} - {data.weather[0].description}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
              <div>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Feels Like: {Math.round(data.main.feels_like)}°C</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Humidity: {data.main.humidity}%</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Pressure: {data.main.pressure} hPa</p>
              </div>
              <div>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Visibility: {Math.round(data.visibility/1000)} km</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Wind: {data.wind.speed} m/s</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Clouds: {data.clouds.all}%</p>
              </div>
            </div>
          </div>
        )}
        {list.length > 0 && (
          <div style={{ width: '100%' }}>
            <h4 style={{color: 'white', fontFamily: 'sans-serif'}}>Cities Viewed ({list.length}):</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {list.map((cityItem, index) => (
                <li key={index} style={{ 
                  padding: '12px', 
                  margin: '8px 0', 
                  background: '#000000', 
                  borderRadius: '10px',
                  border: '4px solid #7d92a9',
                  color:"white",
                  fontFamily:"sans-serif"
                }}>
                  <strong>{cityItem.name}</strong> - 
                  {Math.round(cityItem.temp)}°C (Feels: {Math.round(cityItem.feels_like)}°) - 
                  {cityItem.humidity}% humidity - {cityItem.wind_speed} m/s wind - {cityItem.weather}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
