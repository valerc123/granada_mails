import React, {Component} from 'react';
import Send from './send';
import '../css/send.css';


class Inbox extends Component{
    state = {
		data:[],
		displaySend: false,
		displayInbox: true
	}
	
	handleDelete =  async (event) => {
		const response = await fetch('https://prueba-seleccion-granada.herokuapp.com/inbox/delete',
		{
			method: 'DELETE',
			headers: { 'Content-Type' : "Application/json"},
			body: JSON.stringify({ "id" : [parseInt(event.target.dataset.id)] })
		})
		const json = await response.json();
		if (json.message === "Operación exitosa"){
			alert(json.data[0].subject + " fue borrado con exito");
		}else{
			alert(json.message);
		}
		
	}

	handleUpdate  =  async (event) => {
		let new_status = !(event.target.dataset.state ==="true");
		let toggle_status =  new_status == true ? ": fue marcado como favorito": ": fue removido de favoritos"
		const response = await fetch('https://prueba-seleccion-granada.herokuapp.com/inbox/favorite/' + parseInt(event.target.dataset.id),
		{
			method: 'PUT',
			headers: { 'Content-Type' : "Application/json"},
			body: JSON.stringify({"favorite": new_status})
		})
		const json = await response.json();
		if (json.message === "Operación exitosa"){
			alert(json.data.subject + toggle_status);
		}else{
			alert(json.message);
		}
	}

    async componentDidMount(){
        const response = await fetch('https://prueba-seleccion-granada.herokuapp.com/inbox');   
        const json = await response.json()
        this.setState({
            data: json.data
        })
		}

		onClick = event => {
			if(event === 'send')
			{
				this.setState({displaySend: true, displayInbox: false})
			}
			if(event === 'inbox')
			{
				this.setState({displayInbox: true, displaySend: false})
			}
		}

    render(){
			console.log(this.state.data)
        return (
			<div className="main">
				<div className="menu">
					<button className="boton" onClick={() => this.onClick('send')}>Nuevo</button>
					<button className="boton" onClick={() => this.onClick('inbox')}>Bandeja de entrada</button>
				</div>
				<div className="contenido" style={{display : this.state.displayInbox ? 'block' : 'none'}}>
					{
						this.state.data.length > 0 ?
						this.state.data.map(data => {
							return(
								<div className="mensaje" key={data.id}>
									<h3>
										{data.subject}
									</h3>
									<p>
										{data.description}
									</p>
									<input type="button" className="button" data-id={data.id} onClick={this.handleDelete}  value = "Delete"/>
									<input type="button" className="button" data-id={data.id} onClick={this.handleUpdate}  value = "Favorite" data-state = {data.favorite} />
								</div>
							)
						})
						:
						<div>No hay mensajes</div>
					}
				</div>
				<div style= {{display : this.state.displaySend ? 'block' : 'none'}}>
					<Send />
				</div>
			</div>
        )
    }
}
export default Inbox