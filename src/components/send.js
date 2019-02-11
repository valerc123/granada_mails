import React, {Component} from 'react'
import '../css/send.css'

class Nuevo extends Component {
        state ={
              form:{},
              status: 400,
     
        }	
        handleSubject = (event) => {
                this.setState({
                    form: {
                        ...this.state.form,
                        subject: event.target.value
                    }
                })
            
        }
        handleReceiver = (event) => {
            this.setState({
                form: {
                    ...this.state.form,
                    receiver: event.target.value
                }
            })
        }   
        handleDescription = (event) => {
            this.setState({
                form: {
                    ...this.state.form,
                    description: event.target.value
                }
            })
        }
            
        handleSubmit = async (event) => {
            event.preventDefault()
            console.log(this.state.form);
            const response = await fetch('https://prueba-seleccion-granada.herokuapp.com/send',
            {
                method: 'POST',
                headers: { 'Content-Type' : "Application/json"},
                body: JSON.stringify(this.state.form)
            })
            const json = await response.json();
            alert(json.message);
        }
    render(){
        return(
            <div className="new">
                <form className="form" onSubmit={this.handleSubmit}>
                    <label>
                        Asunto:  
                        <input type="text" maxLength={50}  required="required" onChange={this.handleSubject} />
                    </label> 
                    <label>
                        Destinatario:  
                        <input type="email" required="required" onChange={this.handleReceiver} />
                    </label>
                    <label>
                        Contenido:  <br></br>
                        <textarea type="text" onChange={this.handleDescription}></textarea>
                    </label>
                    <input className="btn" type="submit" value="Enviar" />
                </form>
            </div>
        )
    }
}
export default Nuevo