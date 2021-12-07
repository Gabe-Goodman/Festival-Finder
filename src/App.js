import React, { useEffect, useState } from "react";
import { Dashboard, Map } from "./components";
import data from "./data.json";

function App() {
	//state
	const [locations, setLocations] = useState(data);
	const [userLocation, setUserLocation] = useState();
	const [selectedLocation, setSelectedLocation] = useState();

	return (
		<div className="app">
			<Dashboard
				locations={locations}
				setLocations={setLocations}
				userLocation={userLocation}
				setUserLocation={setUserLocation}
				selectedLocation={selectedLocation}
				setSelectedLocation={setSelectedLocation}
			/>
		</div>
	);
}
export default App;
