import React, { Component } from 'react';
import styled from 'styled-components'
import Imm from 'immutable'

import {fetchFiveDayForecast, fetchCurrentWeather} from './api'
import backgroundImg from './images/portland-bg.jpg'
import Forecast from './Forecast'
import CurrentWeather from './CurrentWeather';
import Loader from './Loader'
import 'bootstrap-grid'

const cityId = '5746545';

const AppContainer = styled.div`  
  overflow: none;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${backgroundImg}) center center no-repeat;
  background-size: cover;
`

const BackgroundLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: url(${backgroundImg}) center center no-repeat;
  background-size: cover;
  filter: ${p => p.isLoaded ? 'blur(5px)' : 'none'};
  transition: filter 1s ease, opacity 1s ease;

  &::before {
    z-index: 1;
    position: absolute;
    top: 0;
    content: '';
    width: 100%;
    height: 100%;

    background: black;
    transition: opacity 2s ease;
    opacity: ${p => p.isLoaded ? 0.05 : 0.65}
  }
`

const MainContainer = styled.div.attrs({className: 'container'})`
  z-index: 100;
`

class App extends Component {
  state = {
    isPreLoading: true,
    forecastDays: Imm.fromJS([]),
    currentWeather: Imm.fromJS({})
  }
  componentWillMount() {    
    // Force loading animation for a few seconds
    setTimeout(() => {
      this.setState({isPreLoading: false})
    }, 2000);
    
    // Fetch forecast
    Promise.all([fetchFiveDayForecast(cityId), fetchCurrentWeather(cityId)])
      .then(([forecastDays, currentWeather]) => {
        this.setState({
          forecastDays,
          currentWeather
        });
      })
      .catch(err => {
        console.error(err);
        alert("Sorry, we couldn't fetch the forecast, please check your network connection.")
      })
  }
  render() {
    const {isPreLoading, forecastDays, currentWeather} = this.state;
    const isLoading = isPreLoading || forecastDays.size === 0;

    return (
      <AppContainer>
        <BackgroundLayer isLoaded={!isLoading} />
        <MainContainer>
          {!isLoading
            ? [
                <CurrentWeather
                  key="current"
                  icon={currentWeather.get('icon')}
                  temp={currentWeather.get('temp')}
                  title={currentWeather.get('title')}
                  description={currentWeather.get('description')}
                />,
                <Forecast
                  key="forecast"
                  forecastDays={forecastDays}
                />
              ]
            : <Loader />
          }
        </MainContainer>
      </AppContainer>
    );
  }
}

export default App;
