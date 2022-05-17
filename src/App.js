import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "f3e5af7ee89dfe97ddee0861ca62501c";

class App extends React.Component {

	state = {
		temp: undefined,
		description: undefined,
		wind: undefined,
		city: undefined,
		error: undefined,
	}

	constructor(props) {
		super(props);
		this.state = {
			latitude: null,
			longitude: null,
			userCity: null
		};
		this.getLocation = this.getLocation.bind(this);
		this.getCoordinates = this.getCoordinates.bind(this);
		this.getUserCity = this.getUserCity.bind(this);
	}

	getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.getCoordinates);
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	}

	getCoordinates(position) {
		console.log(position);
		this.setState({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
		this.getUserCity();
	}

	getUserCity = async (e) => {
		const api_url = await
			fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${this.state.latitude}&longitude=${this.state.longitude}&localityLanguage=en` );
		const data = await api_url.json();
		console.log(data);

		this.setState({
			userCity: data.city
		});
		console.log(this.state.userCity)
		this.getAutoWeather();
	}

	getAutoWeather = async (e) => {
		let city = ""
		city = this.state.userCity;

		if(city) {
			const api_url = await
				fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
			const data = await api_url.json();
			console.log(data);

			this.setState({
				temp: Math.round(data.main.temp),
				description: data.weather[0].description,
				wind: Math.round(data.wind.speed),
				city: data.name,
				error: undefined
			});
		}
	}

	gettingWeather = async (e) => {
		e.preventDefault()
		let city = ""
		city = e.target.elements.city.value;

		if(city)
		{
		const api_url = await
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric` );
		const data = await api_url.json();
		console.log(data);

		this.setState({
			temp: Math.round(data.main.temp),
			description: data.weather[0].description,
			wind: Math.round(data.wind.speed),
			city: data.name,
			error: undefined
			});
		}
		else
		{
			this.setState({
			temp: undefined,
			description: undefined,
			wind: undefined,
			city: undefined,
			error: "Search City"
			});
		}
	}

	componentDidMount() {
		this.getLocation();
	}

	render() {
		return (
			<div className = "wrapper">
				<div className="main">
					<div className="container">
						<div className="row">
							<div className="form">
								<Form  weatherMethod = {this.gettingWeather} />
								{/*<button onClick={this.getLocation}>Auto</button>*/}
								<Weather
									temp = {this.state.temp}
									description = {this.state.description}
									wind = {this.state.wind}
									city = {this.state.city}
									error = {this.state.error}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}	

export default App;