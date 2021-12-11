import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Map from "./Map";

function Dashboard(props) {
	const [activeShop, setActiveShop] = useState("haha");

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
		<div className="screen">
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
				activeShop={activeShop}
				setActiveShop={setActiveShop}
			/>
			{props.selectedLocation ? (
				<div className="dashboard__container">
					<div className="venue">
						<div className="venue__name">{props.selectedLocation.title}</div>
						<div className="venue__type">({props.selectedLocation.type})</div>
					</div>
					<button
						className="dashboard__btn"
						onClick={(e) => {
							e.preventDefault();
							window.location.href = `${props.selectedLocation.link}`;
						}}
					>
						Google Maps
					</button>
				</div>
			) : (
				<p className="dashboard__container">
					Click a candle
					<br />
					to learn more!
				</p>
			)}
		</div>
	);
}
export default Dashboard;
