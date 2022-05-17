import React from "react";
import {DebounceInput} from "react-debounce-input";

const Form = (props) => (
			<form onSubmit = {props.weatherMethod}>
			<input type="text" name = "city" placeholder = " City"/>
				<br></br>
			<button> Check Weather </button>
			</form>
	)

export default Form;