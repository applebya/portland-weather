import React from "react";
import styled from "styled-components";
import {Sparklines, SparklinesLine, SparklinesReferenceLine} from "react-sparklines";

import {fadeInUp} from "./animations";
import WeatherIcon from "./WeatherIcon";

const Cards = styled.section`display: flex;`;

const Card = styled.article`
	flex: 1;
	background: white;
	border-radius: 4px;
	box-shadow: 0 0 5px rgba(0,0,0,0.5);
	margin-right: 20px;
	padding: 15px;
	color: #666;

	opacity: 0;
	animation: ${fadeInUp} .5s ease;
	animation-delay: ${p => (p.index + 1) * 0.15}s;
	animation-fill-mode: forwards;

	&:last-child {
		margin-right: 0;
	}

`;

const Table = styled.table`
	width: 100%;
	font-size: 0.85em;

	tr {
		border-bottom: 1px solid #eee;
		padding-bottom: 2px;
	}

	tr > td {
		&:nth-child(2) {
			text-align: center;
			font-weight: bold;
		}
		&:last-child {
			text-align: right;
		}
	}
`;

const Degrees = styled.sup`font-size: 0.5em;`;

const Header = styled.div`
	display: flex;

	padding-bottom: 15px;

	section {
		flex: 1;

		&:first-child {
			font-weight: bold;
		}

		&:last-child {
			text-align: right;
		}

		> span {
			font-size: 0.65em;
			font-weight: 300;
		}
	}
`;

const DayCard = ({index, date, averageTemp, timeBlocks, minTemp, maxTemp}) => (
	<Card index={index}>
		<Header>
			<section>
				{date.format("MMM Do")}
			</section>
			<section>
				<span>AVG</span>
				{" "}
				{averageTemp}
				<Degrees>&#8451;</Degrees>
			</section>
		</Header>
		<Sparklines
			data={timeBlocks.map(b => b.get("temp")).toArray()} 
			min={minTemp}
			max={maxTemp}
		>			
			<SparklinesLine color="gray" />
			<SparklinesReferenceLine type="mean" color="blue" />
		</Sparklines>
		<Table>
			<tbody>
				{timeBlocks.map(timeBlock => (
					<tr key={+timeBlock.get("timeMoment")}>
						<td>
							{timeBlock.get("timeMoment").format("h:mma")}
						</td>
						<td>
							{timeBlock.get("temp")}
							<Degrees>&#8451;</Degrees>
						</td>
						<td>						
							{timeBlock.get("title")}
							<WeatherIcon
								style={{marginBottom: "-5px"}}
								icon={timeBlock.get("icon")}
								scale={0.4}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	</Card>
);

const Container = styled.div`padding: 15px;`;

const Forecast = ({forecastDays}) => {
	// Extract min/max values for sparklines scale
	// TODO: Extract to redux reducer
	const combinedData = forecastDays.map(day => day.get("timeBlocks")).flatten(true);
	const maxTemp = combinedData.maxBy(day => day.get("temp")).get("temp");
	const minTemp = combinedData.minBy(day => day.get("temp")).get("temp");

	return (
		<Container>
			<h2>5 Day Forecast</h2>
			<Cards>
				{forecastDays.map((data, index) => (
					<DayCard
						key={+data.get("dayMoment")}
						index={index}
						date={data.get("dayMoment")}
						averageTemp={data.get("averageTemp")}
						timeBlocks={data.get("timeBlocks")}
						maxTemp={maxTemp}
						minTemp={minTemp}
					/>
				))}
			</Cards>
		</Container>
	);	
};

export default Forecast;