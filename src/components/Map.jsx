import React, { useEffect } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import candleIcon from "../candle-icon.png";
// import candleShopIcon from "../candle-shop-icon.png";
import mapStyle from "./mapStyle.json";
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

// icon images from freesvg.org
const candle = new window.google.maps.MarkerImage(
	candleIcon,
	null /* size is determined at runtime */,
	null /* origin is 0,0 */,
	null /* anchor is bottom center of the scaled image */,
	new window.google.maps.Size(17, 32)
);

// const candleShop = new window.google.maps.MarkerImage(
// 	noelCandle24,
// 	null /* size is determined at runtime */,
// 	null /* origin is 0,0 */,
// 	null /* anchor is bottom center of the scaled image */,
// 	new window.google.maps.Size(17, 32)
// );

const candleIcons = {
	noelCandle1: noelCandle1,
	noelCandle2: noelCandle2,
	noelCandle3: noelCandle3,
	noelCandle4: noelCandle4,
	noelCandle5: noelCandle5,
	noelCandle6: noelCandle6,
	noelCandle7: noelCandle7,
	noelCandle8: noelCandle8,
	noelCandle9: noelCandle9,
	noelCandle10: noelCandle10,
	noelCandle11: noelCandle11,
	noelCandle12: noelCandle12,
	noelCandle13: noelCandle13,
	noelCandle14: noelCandle14,
	noelCandle15: noelCandle15,
	noelCandle16: noelCandle16,
	noelCandle17: noelCandle17,
	noelCandle18: noelCandle18,
	noelCandle19: noelCandle19,
	noelCandle20: noelCandle20,
	noelCandle21: noelCandle21,
	noelCandle22: noelCandle22,
	noelCandle23: noelCandle23,
};

const candleMarkers = {};

for (const icon in candleIcons) {
	candleMarkers[icon] = new window.google.maps.MarkerImage(
		candleIcons[icon],
		null /* size is determined at runtime */,
		null /* origin is 0,0 */,
		null /* anchor is bottom center of the scaled image */,
		new window.google.maps.Size(17, 32)
	);
}

// withGoogleMap takes a react component and returns one. We call these "Higher Order Components"
const MyMap = withGoogleMap((props) => (
	<GoogleMap
		options={{
			styles: mapStyle,
			gestureHandling: "greedy",
			zoomControl: false,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: false,
		}}
		ref={props.onMapLoad}
		defaultZoom={16}
		defaultCenter={{ lat: 35.6607, lng: 139.6682804608054 }}
		// onClick={props.onMapClick}
	>
		{props.markers.map((marker) => (
			<Marker
				key={marker.key}
				{...marker}
				onClick={() =>
					props.setSelectedLocation({
						key: marker.key,
						position: marker.position,
						title: marker.title,
						type: marker.type,
						link: marker.link,
					})
				}
			/>
		))}
	</GoogleMap>
));

// We use object destructuring here to shorten our code
export default function Map(props) {
	useEffect(() => {
		props.getLocation();
	}, [props]);

	const markers = [];
	if (props.userLocation) {
		const userMarker = {
			key: 0,
			position: {
				lat: props.userLocation.latitude,

				lng: props.userLocation.longitude,
			},
			title: "User Location",
		};
		markers[0] = userMarker;
	}

	for (const location of props.locations) {
		let marker = {};
		if (candleIcons[`noelCandle${location.key}`]) {
			marker = {
				optimized: false,
				zIndex: 99999999,
				key: location.key,
				position: location.position,
				title: `${location.key}. ${location.name}`,
				type: location.type,
				link: location.link,
				icon: candleMarkers[`noelCandle${location.key}`],
			};
		} else if (location.name === "気流舎 × なないろcandle") {
			marker = {
				optimized: false,
				zIndex: 99999999,
				key: location.key,
				position: location.position,
				title: `${location.key}. ${location.name}`,
				type: location.type,
				link: location.link,
				// icon: candleShop,
			};
		} else {
			marker = {
				key: location.key,
				position: location.position,
				title: location.name,
				type: location.type,
				link: location.link,
				icon: candle,
			};
		}
		markers.push(marker);
	}

	return (
		<MyMap
			className="map"
			containerElement={<div style={{ height: `85vh` }} />}
			mapElement={<div style={{ height: `85vh` }} />}
			onMapLoad={() => {}}
			onMapClick={() => {}}
			markers={markers}
			onMarkerRightClick={() => {}}
			setSelectedLocation={props.setSelectedLocation}
			// setCurrentView={props.setCurrentView}
		/>
	);
}
