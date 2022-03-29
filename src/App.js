import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "f3e5af7ee89dfe97ddee0861ca62501c";

class App extends React.Component {

	state = {
		temp: undefined,
		city: undefined,
		country: undefined,
		pressure: undefined,
		sunset: undefined,
		error: undefined,
		feels_like: undefined,
		humidity: undefined
	}

	gettingWeather = async (e) => {
		e.preventDefault();
		const city = e.target.elements.city.value;
		
		
		if(city){

		const api_url = await
		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric` );
		const data = await api_url.json();

		var sunset = data.sys.sunset;
		var date = new Date();
		date.setTime(sunset);
		var sunset_date =date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

		this.setState({
			temp: data.main.temp,
			city: data.name,
			country: data.sys.country,
			pressure: data.main.pressure,
			sunset: sunset_date,
			error: undefined,
			feels_like: data.main.feels_like,
			humidity: data.main.humidity
			});
		} else {
			this.setState({
			temp: undefined,
			city: undefined,
			country: undefined,
			pressure: undefined,
			sunset: undefined,
			error: "Search City",
			feels_like: undefined,
			humidity: undefined
			});
		}
	}



	render() {
		return (
			<div className = "wrapper">
				<div className="main">
					<div className="container">
						<div className="row">
							<div className="col-sm-5 info">
								<Info />
							</div>
							<div className="col-sm-7 form">
								<Form  weatherMethod = {this.gettingWeather} />
								<Weather
									temp = {this.state.temp}
									city = {this.state.city}
									country = {this.state.country}
									pressure = {this.state.pressure}
									sunset = {this.state.sunset}
									error = {this.state.error}
									feels_like = {this.state.feels_like}
									humidity = {this.state.humidity}
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