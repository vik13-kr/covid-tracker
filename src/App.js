/** @format */

import { MenuItem, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards/Cards";
import ChartComponent from "./components/Chart";
// import Chart from "./components/Chart";
import TableComponent from "./components/Table";

function App() {
	const [covidData, setCovidData] = useState({});
	const [country, setCountry] = useState("worldwide");
	const [countriesList, setCountriesList] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			let url = "";
			if (country === "worldwide") {
				url = "https://disease.sh/v3/covid-19/all";
			} else {
				url = `https://disease.sh/v3/covid-19/countries/${country}`;
			}
			const response = await fetch(url)
				.then((res) => res.json())
				.catch((error) => console.log(error));
			if (response) {
				setCovidData(response);
				// console.log(response);
			}
		};
		fetchData();
		return setCovidData({});
	}, [country]);

	useEffect(() => {
		const getCountriesList = async () => {
			const response = await fetch("https://disease.sh/v3/covid-19/countries")
				.then((res) => res.json())
				.catch((error) => console.log(error));
			// console.log(response);
			if (response) {
				let countries = [];
				response.map((item) =>
					countries.push({
						id: item?.countryInfo?._id,
						country_name: item.country,
						country_code: item?.countryInfo?.iso2,
					}),
				);
				setCountriesList(countries);
			}
		};
		getCountriesList();
	}, []);

	const handleChange = (e) => {
		setCountry(e.target.value);
	};

	// console.log(countriesList);
	// console.log(country);
	return (
		<div className="app">
			<div className="header">
				<div className="page_title">
					<h2>Covid 19 Tracker</h2>
				</div>
				<div className="country_selector">
					<TextField
						select
						variant="outlined"
						style={{ width: 200, backgroundColor: "white" }}
						value={country}
						onChange={handleChange}
					>
						<MenuItem key="worldwide" value="worldwide">
							Worldwide
						</MenuItem>
						{countriesList?.map((item) => (
							<MenuItem key={item.id} value={item.country_code}>
								{item.country_name}
							</MenuItem>
						))}
					</TextField>
				</div>
			</div>
			<div className="body_container">
				<div className="left_container">
					<div className="cards">
						<Cards
							title="Coronavirus Cases"
							value={covidData.todayCases}
							total_value={covidData.cases}
						/>
						<Cards
							title="Recovered"
							value={covidData.todayRecovered}
							total_value={covidData.recovered}
						/>
						<Cards
							title="Deaths"
							value={covidData.todayDeaths}
							total_value={covidData.deaths}
						/>
					</div>
					<div className="chart">
						<ChartComponent country={country} />
					</div>
				</div>
				<div className="right_container">
					<div className="table__container">
						<TableComponent />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
