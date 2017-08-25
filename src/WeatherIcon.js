import styled from "styled-components";

const defaultSize = 50;

const calculateScale = p => ((p.scale ? p.scale * defaultSize : defaultSize) + "px");

// Uses OpenWeatherMap's icon system
const WeatherIcon = styled.img.attrs({src: p => `http://openweathermap.org/img/w/${p.icon}.png`})`
	width: ${calculateScale};
	height: ${calculateScale};
`;

export default WeatherIcon;