import React from "react";
import './scss/Admin.scss';
import ListBookings from "./ListBookings/ListBookings";
const axios = require('axios');

interface IAdminState {
	reservations: IAdminDetails[],
	showEditReservation: boolean,
	formDisplay: boolean,
}

export interface IAdminDetails {
	Date: any,
	Time: any,
	Guests: any,
	Name: any,
	Phone: any,
	Email: any,
	ReservationID: any,
	CustomerID: any,
	isInEditMode: boolean;
}

class Admin extends React.Component<{}, IAdminState>  {

	getBookingsUrl = 'http://localhost:8888/api/getBookings.php';
	bookingDeleteUrl = 'http://localhost:8888/api/deleteBooking.php';
	bookingEditUrl = 'http://localhost:8888/api/updateBooking.php';
	constructor(props: any) {
		super(props)
		this.state = {
			reservations: [],
			showEditReservation: false,
			formDisplay: false,
		}

		this.toggleForm = this.toggleForm.bind(this);
		this.removeReservation = this.removeReservation.bind(this);
		this.editReservation = this.editReservation.bind(this);
		this.handleEditBooking = this.handleEditBooking.bind(this);
	}

	toggleForm() {
		// this.setState({
		// 	formDisplay: !this.state.formDisplay
		// })
	}

	componentDidMount() {
		axios.get(this.getBookingsUrl, {

		}).then((response: any) => {
			console.log(response.data)

			this.setState({
				reservations: response.data
			})

		}).catch((error: any) => {
			console.log(error)
		})
	}

	removeReservation(ReservationID: number) {
		axios.delete(
			this.bookingDeleteUrl,
			{
				data:
					JSON.stringify({ ReservationID: ReservationID })
			}).then((response: any) => {
				this.state.reservations.map((item, index) => (
					this.state.reservations.splice(index, 1)
				))
				this.setState({ reservations: this.state.reservations });
			});
	}

	editReservation(item: any) {
		const reservations = this.state.reservations;
		this.setState({
			reservations: [...reservations],
			showEditReservation: true
		}, () => {
			// console.log(this.state)
		});
	}

	handleEditBooking =(dataToBeEdited: any)=> {
		console.log(dataToBeEdited);

		axios.put(this.bookingEditUrl, dataToBeEdited, {
			headers: { 'Content-Type': 'text/plain;' },
		}).then((response: any) => {
			// alert("hej")
			console.log("Edit booking saved")
		}).catch((error: any) => {
			console.log(error)
		})
	}

	render() {
		// console.log("State", this.state.reservations)
		// console.log(this.state)
		return (
			<div>
				{/* <div className={
					'form-container ' +
					(this.state.formDisplay ? '' : 'add-reservation')
				}>
					<div className="res-addheading" onClick={this.toggleForm}>
						{/* <h2> <FaPlus /> Add Reservation</h2> */}
					</div>

					<div className="form-body">
						<form>
							<input type="text" name="name" placeholder="Full Name" />
							<input type="text" name="phone" placeholder="Phone Number" />
							<input type="email" name="email" placeholder="Email" />
							<input type="date" name="date" placeholder="Date" />

							<div className="inputGroup">
								<input id="radio1" name="radio" type="radio" />
								<label htmlFor="radio1">18:00</label>
							</div>
							<div className="inputGroup">
								<input id="radio2" name="radio" type="radio" />
								<label htmlFor="radio2">21:00</label>
							</div>

							{/* <input type="time" name="time" placeholder="Time" /> */}
				{/* <textarea placeholder="Message" />
							<input type="button" value="Add Reservation" />
						</form>
					</div> */}
				{/* </div> } */}
				<ListBookings
					reservationProps={this.state.reservations}
					removeReservation={this.removeReservation}
					editReservationProps={this.state.showEditReservation}
					editReservationState={this.editReservation}
					submitBooking={this.handleEditBooking}
				/>
			</div>
		)
	}
}

export default Admin;