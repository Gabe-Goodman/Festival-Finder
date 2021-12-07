import React, { useEffect, useRef } from "react";
import { google, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import candleIcon from "../candle_icon.png";
import mapStyle from "./mapStyle.json";

// icon images from freesvg.org
const shop = new window.google.maps.MarkerImage(
	candleIcon,
	null /* size is determined at runtime */,
	null /* origin is 0,0 */,
	null /* anchor is bottom center of the scaled image */,
	new window.google.maps.Size(32, 32)
);

// withGoogleMap takes a react component and returns one. We call these "Higher Order Components"
const MyMap = withGoogleMap((props) => (
	<GoogleMap
		options={{
			styles: mapStyle,
			gestureHandling: "greedy",
		}}
		ref={props.onMapLoad}
		defaultZoom={16.35}
		defaultCenter={{ lat: 35.66125607391368, lng: 139.6682804608054 }}
		// onClick={props.onMapClick}
	>
		{props.markers.map((marker) => (
			// <Marker
			// 	title={"The marker`s title will appear as a tooltip."}
			// 	name={"SOMA"}
			// 	position={{ lat: 35.661608726745186, lng: 139.66727301061846 }}
			// />
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
	}, []);

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
		const marker = {
			key: location.key,
			position: location.position,
			title: location.name,
			type: location.type,
			link: location.link,
			icon: shop,
		};
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
