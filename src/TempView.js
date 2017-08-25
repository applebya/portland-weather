import React from "react";
import styled from "styled-components";

const Degrees = styled.sup`font-size: 0.5em;`;

// Handles temperature view & conversion when not isMetric
const TempView = ({temp, isMetric}) => {
	const units = isMetric ? "°C" : "°F";
	const temperature = isMetric ? temp : Math.round((temp * 1.8) + 32);

	return (
		<span>
			{temperature}
			<Degrees>{units}</Degrees>
		</span>		
	);
};

export default TempView;