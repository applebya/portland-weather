import React from "react";
import styled from "styled-components";

import WeatherIcon from "./WeatherIcon";
import TempView from "./TempView";

const Container = styled.section`
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 15px;
`;

const Temperature = styled.span`
	font-size: 4em;
	font-weight: 200;
`;

const Title = styled.div``;
const Description = styled.div`opacity: 0.65;`;

const CircleContainer = styled.div`
	background: rgba(0,0,0,0.25);
	border: 2px solid white;
	border-radius: 50%;
	width: 200px;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const CurrentWeather = ({icon, temp, title, description, isMetric}) => (
	<Container>
		<CircleContainer>
			<div>
				<WeatherIcon icon={icon} />
				<Temperature>
					<TempView temp={temp} isMetric={isMetric} />
				</Temperature>
				<Title>{title}</Title>
				<Description>({description})</Description>
			</div>
		</CircleContainer>
	</Container>
);

export default CurrentWeather;