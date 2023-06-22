import React, {useState, useEffect} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import axios from 'axios'

const WeatherComponent = props => {
    const {lat, lon} = props;
    const API_key = 'f26de7840a935d2a51fe65f348576b55';
    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(
                    //https://api.openweathermap.org/data/3.0/onecall?lat=37.7858&lon=127.404&appid=f26de7840a935d2a51fe65f348576b55
                    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_key}`
                );
                //console.log(JSON.parse(JSON.stringify(response.data)).hourly[2].temp);
                setWeatherData(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(response.data)).current)).temp);
            } catch (error) {
                console.error(error);
            }
        };

        fetchWeatherData();
    }, []);
    
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
              <Text style={styles.weatherText}>   {Math.round(parseFloat(weatherData)-273)}°C</Text>
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
