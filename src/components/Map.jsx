import React, { useEffect, useMemo } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import candleIcon from "../candle-icon.png";
import visitedCandleIcon from "../visited-candle-icon.png";
import noelCandle1 from "../noelCandle-1.png";
import noelCandle2 from "../noelCandle-2.png";
import noelCandle3 from "../noelCandle-3.png";
import noelCandle4 from "../noelCandle-4.png";
import noelCandle5 from "../noelCandle-5.png";
import noelCandle6 from "../noelCandle-6.png";
import noelCandle7 from "../noelCandle-7.png";
import noelCandle8 from "../noelCandle-8.png";
import noelCandle9 from "../noelCandle-9.png";
import noelCandle10 from "../noelCandle-10.png";
import noelCandle11 from "../noelCandle-11.png";
import noelCandle12 from "../noelCandle-12.png";
import noelCandle13 from "../noelCandle-13.png";
import noelCandle14 from "../noelCandle-14.png";
import noelCandle15 from "../noelCandle-15.png";
import noelCandle16 from "../noelCandle-16.png";
import noelCandle17 from "../noelCandle-17.png";
import noelCandle18 from "../noelCandle-18.png";
import noelCandle19 from "../noelCandle-19.png";
import noelCandle20 from "../noelCandle-20.png";
import noelCandle21 from "../noelCandle-21.png";
import noelCandle22 from "../noelCandle-22.png";
import noelCandle23 from "../noelCandle-23.png";
import noelCandle24 from "../noelCandle-24.png";
import mapStyle from "./mapStyle.json";

// Unique icons for each location
const candleIcons = {
	1: noelCandle1,
	2: noelCandle2,
	3: noelCandle3,
	4: noelCandle4,
	5: noelCandle5,
	6: noelCandle6,
	7: noelCandle7,
	8: noelCandle8,
	9: noelCandle9,
	10: noelCandle10,
	11: noelCandle11,
	12: noelCandle12,
	13: noelCandle13,
	14: noelCandle14,
	15: noelCandle15,
	16: noelCandle16,
	17: noelCandle17,
	18: noelCandle18,
	19: noelCandle19,
	20: noelCandle20,
	21: noelCandle21,
	22: noelCandle22,
	23: noelCandle23,
	24: noelCandle24,
};

const createMarkerIcon = (key, isVisited) => {
	if (isVisited) {
		return visitedCandleIcon; // Use visited icon for visited locations
	}
	return candleIcons[key] || candleIcon; // Unique icon or default
};

const mapContainerStyle = {
	height: "85vh",
	width: "100%",
};

const center = { lat: 35.6607, lng: 139.6682804608054 };

export default function Map(props) {
	useEffect(() => {
		props.getLocation();
	}, [props]);

	return (
		<GoogleMap
			mapContainerStyle={mapContainerStyle}
			zoom={16}
			center={center}
			options={{
				styles: mapStyle,
				gestureHandling: "greedy",
				disableDefaultUI: true,
			}}
		>
			{props.locations.map((location) => (
				<Marker
					key={location.key}
					position={location.position}
					title={location.name}
					icon={createMarkerIcon(
						location.key,
						props.visitedLocations.includes(location.key)
					)}
					onClick={() =>
						props.setSelectedLocation({
							key: location.key,
							position: location.position,
							title: location.name,
							type: location.type,
							link: location.link, // Include link for selected location
						})
					}
				/>
			))}
		</GoogleMap>
	);
}
