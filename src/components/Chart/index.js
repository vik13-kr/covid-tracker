/** @format */

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./chart.css";
import { Chart } from "chart.js";

const borderColor = {
	cases: "#00008B",
	recovered: "#006400",
	deaths: "#DC143C",
};

function ChartComponent({ country }) {
	const [covidHistoryData, setCovidHistoryData] = useState({});
	const [numberOfDays, setNumberofDays] = useState(30);
	const [type, setType] = useState("cases");
	const [loading, setLoading] = useState(true);

	function getValues(type = "cases") {
		let object = covidHistoryData?.[type];
		let data = [];
		for (const property in object) {
			// console.log(property);
			data.push(object[property]);
		}
		// console.log(data);
		return data;
	}

	useEffect(() => {
		let url = "";
		if (country === "worldwide") {
			url = `https://disease.sh/v3/covid-19/historical/all?lastdays=${numberOfDays}`;
		} else {
			url = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=${numberOfDays}`;
		}
		console.log(url);
		async function getCountryHistoryData() {
			const response = await fetch(url)
				.then((res) => res.json())
				.catch((err) => console.log(err));
			// console.log(response);
			if (response) {
				if (country === "worldwide") {
					setCovidHistoryData(response);
				} else {
					setCovidHistoryData(response?.timeline);
				}
			}
			setLoading(false);
		}
		getCountryHistoryData();
		return setLoading(true);
	}, [country]);

	function getLabel() {
		const label = [];
		const object = covidHistoryData?.deaths;
		for (const i in object) {
			label.push(i);
		}

		return label;
	}

	const data = {
		labels: getLabel(),
		datasets: [
			{
				label: type,
				data: getValues(type),
				fill: false,
				tension: 0.1,
				borderColor: borderColor[type],
			},
		],
	};

	function handleTypes(arg) {
		setType(arg);
	}

	console.log("covidHistoryData...", covidHistoryData);
	console.log(country);
	console.log(loading);
	if (loading) return <div>Loading</div>;
	return (
		<>
			<div>
				<button onClick={() => handleTypes("cases")}>Cases</button>
				<button onClick={() => handleTypes("recovered")}>Recovered</button>
				<button onClick={() => handleTypes("deaths")}>Deaths</button>
			</div>

			<div className="chart_container">
				<Line
					data={data}
					options={{
						maintainAspectRatio: false,
						indexAxis: "y",
						scales: {
							y: {
								min: 0,
								ticks: {
									stepSize: 50000000,
								},
							},
							x: {
								beginAtZero: true,
							},
						},
					}}
				/>
			</div>
		</>
	);
}

export default ChartComponent;
