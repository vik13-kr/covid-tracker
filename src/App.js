/** @format */

import "./App.css";
import Cards from "./components/Cards/Cards";

function App() {
	return (
		<div className="app">
			<div className="header">
				<div className="page_title">
					<h2>Covid 19 Tracker</h2>
				</div>
				<div className="country_selector">Select</div>
			</div>
			<div className="body_container">
				<div className="left_container">
					<div className="cards">
						<Cards />
						<Cards />
						<Cards />
					</div>
					<div className="map"></div>
				</div>
				<div className="right_container">Hey </div>
			</div>
		</div>
	);
}

export default App;
