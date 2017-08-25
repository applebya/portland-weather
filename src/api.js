import Imm from "immutable";
import Moment from "moment";

const apiKey = "7d868c20fabe272de7d6392681d2366b";
const baseURL = "http://api.openweathermap.org/data/2.5";

// Convert to unixMs before calling Moment
const makeMoment = (unixS) => Moment(unixS * 1000);

const calculateAverageTemp = (timeBlocks) => {
	const avg = timeBlocks.reduce((sum, block) => sum + block.getIn(["main", "temp"]), 0) / timeBlocks.size;

	// 2 decimal places
	return Math.round(avg);
};

export function fetchCurrentWeather(cityId) {
	const request = new Request(`${baseURL}/weather?id=${cityId}&APPID=${apiKey}&units=metric`);

	return fetch(request)
		.then(response => {
		  if (!response.ok) {
		    // TODO: UI prompt
		    console.error("Problem fetching CURRENT weather data");
		    return;
		  }

		  return response.json();
		})
		.then(data => {
			return Imm.fromJS({
				temp: Math.round(data.main.temp),
				humidity: data.main.humidity,
				title: data.weather[0].main,
				description: data.weather[0].description,
				icon: data.weather[0].icon
			});
		});
}

// Returns promise for weather forecast data
export function fetchFiveDayForecast(cityId) {
	const request = new Request(`${baseURL}/forecast?id=${cityId}&APPID=${apiKey}&units=metric`);

	return fetch(request)
		.then(response => {
		  if (!response.ok) {
		    // TODO: UI prompt
		    console.error("Problem fetching weather data");
		    return;
		  }

		  return response.json();
		})
		.then(data => {
			// Model immutable data from OpenWeatherMap for view components
			// TODO: Extract to redux reducers
			const forecastData = Imm.fromJS(data.list)
				.filterNot(item => makeMoment(item.get("dt")).isSame(Moment(), "day"))
				.groupBy(item => makeMoment(item.get("dt")).format("YYYY-MM-DD"))
				.map((timeBlocks, daystamp) => Imm.fromJS({
					dayMoment: Moment(daystamp).startOf("day"),
					averageTemp: calculateAverageTemp(timeBlocks),

					timeBlocks: timeBlocks.map(block => Imm.fromJS({
						timeMoment: makeMoment(block.get("dt")),
						temp: Math.round(block.getIn(["main", "temp"])),
						title: block.getIn(["weather", 0, "main"]),
						icon: block.getIn(["weather", 0, "icon"]),
					}))
				}))
				.toList()
				.sortBy(day => +day.get("dayMoment"));

			return forecastData;
		})
		.catch(err => {
		  console.error("Error", err);
		});
}