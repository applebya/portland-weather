import React from "react";
import styled from "styled-components";

import WeatherIcon from "./WeatherIcon";

const Container = styled.section`
	color: white;
	display: flex;
	justify-content: center;
	align-items: center;
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

const Degrees = styled.sup`font-size: 0.5em;`;

const CurrentWeather = ({icon, temp, title, description}) => (
	<Container>
		<CircleContainer>
			<div>
				<WeatherIcon icon={icon} />
				<Temperature>
					{temp}
					<Degrees>&#8451;</Degrees>
				</Temperature>
				<Title>{title}</Title>
				<Description>({description})</Description>
			</div>
		</CircleContainer>
	</Container>
);

export default CurrentWeather;