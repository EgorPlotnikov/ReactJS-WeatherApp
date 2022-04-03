import React from "react";


const Weather = (props) => {
	return(
		<div className="infoWeather">
			{ props.city &&
				<div className="textcols">
					<div className="textcols-item">
						<p>Conditions</p>
						<p className="description"> {props.description} </p>
					</div>
					<div className="textcols-item">
						<p>Temperature</p>
						<p className="temperature"> {props.temp}° </p>
					</div>
					<div className="textcols-item">
						<p>Wind</p>
						<p className="wind"> {props.wind} mps </p>
					</div>
				</div>
			}
			<p className="error">{props.error}</p>
		</div>
	);
}

// const Weather = (props) => {
// 	return(
// 		<div className="infoWeather">
// 			{ props.city &&
// 				<div>
// 					<p> Location: {props.city}, {props.country}</p>
// 					<p> Temperature: {props.temp} °C</p>
// 					<p> Feels like: {props.feels_like}</p>
// 					<p> Air pressure: {props.pressure} millibars</p>
// 					<p> Humidity: {props.humidity} %</p>
// 					<p> Sunset: {props.sunset}</p>
// 				</div>
// 			}
// 			<p className="error">{props.error}</p>
// 		</div>
// 		);
// }

export default Weather;