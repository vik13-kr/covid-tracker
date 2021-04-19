/** @format */

import React, { useEffect, useState } from "react";
import "./table.css";
import { Table, TableCell, TableRow } from "@material-ui/core";

function TableComponent() {
	const [countryAndCases, setCountryAndCases] = useState(null);

	function sortByCases(countriesAndCasesArray) {
		countriesAndCasesArray.sort(function (a, b) {
			if (a.cases > b.cases) {
				return -1;
			} else {
				return 1;
			}
		});
		// console.log(countriesAndCasesArray);
		return countriesAndCasesArray.slice(0, 15);
	}

	useEffect(() => {
		async function getCovidCasesByCountries() {
			const response = await fetch("https://disease.sh/v3/covid-19/countries")
				.then((res) => res.json())
				.catch((error) => console.log(error));
			if (response) {
				let countriesAndCasesArray = [];
				response.map((item) => {
					countriesAndCasesArray.push({
						id: item.countryInfo._id,
						country: item.country,
						cases: item.cases,
					});
				});
				let sortedData = sortByCases(countriesAndCasesArray);
				// console.log(sortedData);
				setCountryAndCases(sortedData);
			}
		}
		getCovidCasesByCountries();
	}, []);

	// console.log(countryAndCases);

	return (
		<>
			<div className="table_title">Live cases by countries</div>
			<div className="table_container">
				<Table>
					{countryAndCases?.map((item) => (
						<TableRow key={item.id} hover className="row">
							<TableCell align="left">{item.country}</TableCell>
							<TableCell align="right">{item.cases}</TableCell>
						</TableRow>
					))}
				</Table>
			</div>
		</>
	);
}

export default TableComponent;
