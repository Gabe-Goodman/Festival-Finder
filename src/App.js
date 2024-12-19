import React, { useState, useEffect } from "react";
import { Dashboard } from "./components";
import data from "./data.json";

function App() {
	// state
	const [locations, setLocations] = useState(data);
	const [userLocation, setUserLocation] = useState();
	const [selectedLocation, setSelectedLocation] = useState();
	const [visitedLocations, setVisitedLocations] = useState(
		JSON.parse(localStorage.getItem("visitedLocations")) || []
	);

	// Persist visited locations to localStorage
	useEffect(() => {
		localStorage.setItem("visitedLocations", JSON.stringify(visitedLocations));
	}, [visitedLocations]);

	const handleVisited = (key) => {
		if (!visitedLocations.includes(key)) {
			setVisitedLocations([...visitedLocations, key]);
		}
	};

	return (
		<div className="app">
			<Dashboard
				locations={locations}
				setLocations={setLocations}
				userLocation={userLocation}
				setUserLocation={setUserLocation}
				selectedLocation={selectedLocation}
				setSelectedLocation={setSelectedLocation}
				handleVisited={handleVisited}
				visitedLocations={visitedLocations}
			/>
		</div>
	);
}

export default App;
