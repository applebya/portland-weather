import React from "react";
import styled from "styled-components";

import IconSrc from "./images/day.svg";

const Container = styled.div`
	z-index: 100;
	color: white;
	flex: 1;
	text-align: center;
	color: white;
	font-size: 2em;
`;

const LoaderIcon = styled.img.attrs({src: IconSrc})`
	width: 200px;
	height: 200px;
`;

const Loader = () => (
	<Container>
		<div>
			<section>
				<LoaderIcon />
			</section>
			Loading Portland Weather...
		</div>
	</Container>
);

export default Loader;