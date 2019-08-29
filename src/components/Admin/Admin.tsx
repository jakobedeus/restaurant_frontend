import React from "react";
import './scss/Admin.scss';
import { FaPlus } from 'react-icons/fa';

interface IState {
	formDisplay: any;
}


class Admin extends React.Component<{}, IState>  {
	constructor(props: any) {
    super(props)
    this.state = {
      formDisplay: false,
		}
		
		this.toggleForm = this.toggleForm.bind(this);
	}

	toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }
	
	
    render() {
        return(
					<div className={
						'form-container ' +
						(this.state.formDisplay ? '' : 'add-reservation')
					}>
						<div className="res-addheading" onClick={this.toggleForm}>
							<h2> <FaPlus /> Add Reservation</h2>
						</div>

						<div className="form-body">
							<form>
								<input type="text" name="name" placeholder="Full Name" />
								<input type="text" name="phone" placeholder="Phone Number" />
								<input type="email" name="email" placeholder="Email" />
								<input type="date" name="date" placeholder="Date" />

								<div className="inputGroup">
									<input id="radio1" name="radio" type="radio"/>
									<label htmlFor="radio1">18:00</label>
								</div>
								<div className="inputGroup">
									<input id="radio2" name="radio" type="radio"/>
									<label htmlFor="radio2">21:00</label>
								</div>

								{/* <input type="time" name="time" placeholder="Time" /> */}
								<textarea placeholder="Message"/>
								<input type="button" value="Add Reservation" />
							</form>
						</div>
				</div>
        )
    }
}

export default Admin;