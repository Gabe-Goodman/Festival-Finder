import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Map from "./Map";

function Dashboard(props) {
	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				getCoordinates
				// handleLocationError
			);
		}
		// else alert("Geolocation is not supported by this browser.");
	};

	const getCoordinates = (position) => {
		props.setUserLocation({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		});
		console.log(props.userLocation);
	};

	// function onMarkerClick(marker) {
	//   props.setSelectedLocation(marker);
	// }

	return (
		<div>
			{/* <div className="dashboard__header">
				<div>{"Click a candle"}</div>
				<div>{"to learn more!"}</div>
			</div> */}
			<Map
				id="map"
				getLocation={getLocation}
				locations={props.locations}
				userLocation={props.userLocation}
				selectedLocation={props.selectedLocation}
				setSelectedLocation={props.setSelectedLocation}
				// setCurrentView={setCurrentView}
			/>
			{props.selectedLocation ? (
				<div className="dashboard__container">
					<div className="venue__name">{props.selectedLocation.title}</div>
					<div>({props.selectedLocation.type})</div>
					<button
						className="dashboard__btn"
						onClick={(e) => {
							e.preventDefault();
							window.open(`${props.selectedLocation.link}`, "_blank");
						}}
					>
						Take me there!
					</button>
				</div>
			) : (
				<div className="dashboard__container">
					<div>{"Click a candle"}</div>
					<div>{"to learn more!"}</div>
				</div>
			)}
		</div>
	);
}
export default Dashboard;
