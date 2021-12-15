import React, { useEffect } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import candleIcon from "../candle-icon.png";
import candleShopIcon from "../candle-shop-icon.png";
import mapStyle from "./mapStyle.json";

// icon images from freesvg.org
const candle = new window.google.maps.MarkerImage(
	candleIcon,
	null /* size is determined at runtime */,
	null /* origin is 0,0 */,
	null /* anchor is bottom center of the scaled image */,
	new window.google.maps.Size(17, 32)
);

const candleShop = new window.google.maps.MarkerImage(
	candleShopIcon,
	null /* size is determined at runtime */,
	null /* origin is 0,0 */,
	null /* anchor is bottom center of the scaled image */,
	new window.google.maps.Size(17, 32)
);

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
		if (location.name === "気流舎 × なないろcandle") {
			marker = {
				optimized: false,
				zIndex: 99999999,
				key: location.key,
				position: location.position,
				title: location.name,
				type: location.type,
				link: location.link,
				icon: candleShop,
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
