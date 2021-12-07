import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Map from "./Map";

function Dashboard(props) {
	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(getCoordinates);
		}
	};

	const getCoordinates = (position) => {
		props.setUserLocation({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		});
		console.log(props.userLocation);
	};

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
			/>
			{props.selectedLocation ? (
				<div className="dashboard__container">
					<div className="venue__name">{props.selectedLocation.title}</div>
					<div>({props.selectedLocation.type})</div>
					<button
						className="dashboard__btn"
						onClick={(e) => {
							e.preventDefault();
							window.location.href = `${props.selectedLocation.link}`;
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
