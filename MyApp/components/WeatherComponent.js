import React, {useState, useEffect} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import axios from 'axios'

const WeatherComponent = props => {
    const {lat, lon, hour_later} = props;
    const API_key = '97abddef06b1f625921e7b5ca2e6695c';
    const [weatherData, setWeatherData] = useState(null);

    const findClosestWeather = (weatherData, targetDate) => {
      let closestWeather = null;
      let closestTimeDifference = Infinity;
    
      for (const weather of weatherData) {
        const weatherDate = new Date(weather.dt * 1000);
        const timeDifference = Math.abs(weatherDate - targetDate);
    
        if (timeDifference < closestTimeDifference) {
          closestTimeDifference = timeDifference;
          closestWeather = weather;
        }
      }
    
      return closestWeather;
    };
    
    // 스크롤을 할 때에 맞춰서 날씨가 바뀌어야 함. 지금은 그냥 고정된 시간으로 설정해놓음.
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
                );
                const weatherData = response.data.list;
                target_date = new Date();
                console.log('base_date:', target_date)
                target_date.setHours(target_date.getHours() + hour_later);
                console.log('target_date:', target_date)
                closestWeather = findClosestWeather(weatherData, target_date);
                console.log('closestWeather:', closestWeather)
                temp = closestWeather.main.temp;
                setWeatherData(temp);
            } catch (error) {
                console.error(error);
            }
        };

        fetchWeatherData();
    }, [hour_later, lat, lon]);
    
      if (!weatherData) {
        return (
          <View>
            <Text style={styles.weatherText}>Loading...</Text>
          </View>
        );
      }
    
      return (
        <View>
          {weatherData ? (
            <>
              <Text style={styles.weatherText}>   {Math.round(parseFloat(weatherData))}°C</Text>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      );

}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#FFFFFF', // 하늘색 배경
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherText: {
    fontSize:20,
    marginBottom:3
  },
});

export default WeatherComponent;
