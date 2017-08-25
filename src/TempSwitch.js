import React from "react";
import styled from "styled-components";

const Switch = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;

	display: flex;
	border-radius: 4px;
	border: 2px solid white;
	background: rgba(255,255,255,0.25);
	color: white;
	cursor: pointer;
`;

const TempType = styled.section`
	padding: 5px 8px;
	background: rgba(255,255,255,0.25);
	opacity: ${p => p.isActive ? 1 : 0.5};
`;

const TempSwitch = ({isMetric, onToggle}) => (
	<Switch onClick={onToggle}>
		<TempType isActive={isMetric}>&#8451;</TempType>
		<TempType isActive={!isMetric}>&#8457;</TempType>
	</Switch>
);

export default TempSwitch;