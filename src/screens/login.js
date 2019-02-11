import React, {Component} from 'react';
import Home from './home';
import '../css/send.css'

class Login extends Component{
   state ={
		 form:{},
		 status: 400
	 }	
	 handleUsuario = (event) => {
			this.setState({
				form: {
					...this.state.form,
					user : event.target.value
				}
			})
	 }
	 handlePassword = (event) => {
		this.setState({
			form: {
				...this.state.form,
				password: event.target.value
			}
		})
  }
	handleSubmit= (event) => {
		event.preventDefault();
		fetch('https://prueba-seleccion-granada.herokuapp.com/login',
		{
			method: 'POST',
			headers: { 'Content-Type' : "Application/json"},
			body: JSON.stringify(this.state.form)
		})
		.catch(err => console.error(err))
		.then(res => {
			localStorage.setItem("status", res.status)
			this.setState({
				status: res.status
			})

		}) 
	}
  render(){
			if(this.state.status === 400)
			{
				return (
					<div className="container">
						<form className="form" onSubmit={this.handleSubmit}>
							<label className="label">
								Name: <br></br>
							<input type="text"  onChange={this.handleUsuario} />
							</label>
							<label className="label">
							Password: <br></br>
							<input type="text"  onChange={this.handlePassword} />
							</label>
							<input className="botn" type="submit" value="Ingresar" />
						</form>
					</div>
				)
			}
			else{
				return (
					<Home />
				)
			}
   }
}
export default Login;