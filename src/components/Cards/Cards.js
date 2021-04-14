/** @format */

import React from "react";
import "./Cards.css";

function Cards({ title, value, total_value }) {
	return (
		<div className="container">
			<div className="title"> {title}</div>
			<div className="value">{value}</div>
			<div className="total_value">{total_value} Total </div>
		</div>
	);
}

export default Cards;
