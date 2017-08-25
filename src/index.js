import React from "react";
import ReactDOM from "react-dom";
import {injectGlobal} from "styled-components";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// GLobal styles, custom font
injectGlobal`
	@import url('https://fonts.googleapis.com/css?family=Exo+2:300,600,700');

	html, body, #root {
		font-family: 'Exo 2', sans-serif;
		margin: 0;
		padding: 0;
		min-height: 100%;
		height: 100%;
		width: 100%;
		background: black;
		color: white;
	}
`;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
