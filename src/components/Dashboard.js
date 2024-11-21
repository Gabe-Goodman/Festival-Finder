import "./Dashboard.css";
import Map from "./Map";
import logo from "../noel-logo.png";

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
	};

	return (
		<div className="screen">
			<div className="dashboard__header">
				<img
					alt="Logo"
					className="logo"
					src={logo}
					onClick={() => window.open("https://komichinonoel.info/", "_blank")}
				/>
				<text className="header__button__label">
					お気に入りの <br />
					キャンドルに投票しよう
				</text>
				<button
					className="header__button"
					onClick={() =>
						window.open("https://forms.gle/uEqzwB1fGVb8FgsS8", "_blank")
					}
				>
					小径のノエル賞
				</button>
			</div>
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
					<div className="venue">
						<div className="venue__name">{props.selectedLocation.title}</div>
						<div className="venue__type">{props.selectedLocation.type}</div>
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
					キャンドルを
					<br />
					クリックしてね！
				</p>
			)}
		</div>
	);
}
export default Dashboard;
