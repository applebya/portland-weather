import test from "blue-tape";
import {fetchFiveDayForecast, fetchCurrentWeather} from "./api";

const cityId = "5746545";

test("Can load 5 day forecast", t => {
	fetchFiveDayForecast();
});