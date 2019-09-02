import React from "react";
import './scss/Admin.scss';
import { FaPlus } from 'react-icons/fa';
import ListBookings from "./ListBookings/ListBookings";
const axios = require('axios');

interface IAdminState {
	editBookingDate: any,
    editBookingTime: any,
    editBookingNumberOfGuests: any,
    editbookingName: any,
    editbookingPhone: any,
	editbookingEmail: any,
	formDisplay: boolean;
	showEditReservation: boolean;
	reservations: [];
}

class Admin extends React.Component<{}, IAdminState>  {

	getBookingsUrl = 'http://localhost:8888/api/getBookings.php';
	bookingDeleteUrl = 'http://localhost:8888/api/deleteBooking.php';
	constructor(props: any) {
		super(props)
		this.state = {
			editBookingDate: '',
			editBookingTime: '',
			editBookingNumberOfGuests: '',
			editbookingName: '',
			editbookingPhone: '',
			editbookingEmail: '',
			formDisplay: false,
			reservations: [],
			showEditReservation: false,
		}

		this.toggleForm = this.toggleForm.bind(this);
		this.removeReservation = this.removeReservation.bind(this);
		this.editReservation = this.editReservation.bind(this);
		this.handleChangeEditBooking = this.handleChangeEditBooking.bind(this);
		this.handleEditBooking = this.handleEditBooking.bind(this);
	}

	toggleForm() {
		this.setState({
			formDisplay: !this.state.formDisplay
		})
	}


	componentDidMount() {
		axios.get(this.getBookingsUrl, {

		}).then((response: any) => {
			// console.log(response.data)
			this.setState({ reservations: response.data})

		}).catch((error: any) => {
			console.log(error)
		})
	}

	removeReservation(ReservationID: number) {
		axios.delete(
			this.bookingDeleteUrl, 
				{ data : 
					JSON.stringify({ ReservationID: ReservationID })
				}).then((response:any ) => {
					this.state.reservations.map( (item, index) => (
						this.state.reservations.splice(index, 1)
					))
			  this.setState({ reservations: this.state.reservations });
		  });
	}

	editReservation(ReservationID: number) {
		this.setState({
			showEditReservation: !this.state.showEditReservation
		})
	}

	changeEditBooking(e: any) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        } as Pick<IAdminState, keyof IAdminState>)
	}
	
	handleChangeEditBooking() {

	}
	handleEditBooking() {
        // let inputData = {
        //     bookingName: this.state.bookingName,
        //     bookingEmail: this.state.bookingEmail,
        //     bookingPhone: this.state.bookingPhone,
        //     bookingDate: this.state.bookingDate,
        //     bookingNumberOfGuests: this.state.bookingNumberOfGuests,
        //     bookingTime: this.state.bookingTime,
        // }
        // axios.post(this.postBookingUrl, inputData, {
        //     headers: { 'Content-Type': 'text/plain;' }
        // }).then((response: any) => {
        //     console.log(response.data)
        //     console.log("Booking created")
        //     this.setState({ bookingCreateOk: !this.state.bookingCreateOk })
        // }).catch((error: any) => {
        //     console.log(error)
        // })
    }

	render() {
		console.log(this.state)
		return (
			<div>
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
								<input id="radio1" name="radio" type="radio" />
								<label htmlFor="radio1">18:00</label>
							</div>
							<div className="inputGroup">
								<input id="radio2" name="radio" type="radio" />
								<label htmlFor="radio2">21:00</label>
							</div>

							{/* <input type="time" name="time" placeholder="Time" /> */}
							<textarea placeholder="Message" />
							<input type="button" value="Add Reservation" />
						</form>
					</div>
				</div>
				<ListBookings 
					reservations={this.state.reservations}
					removeReservation={this.removeReservation}
					editReservationProps={this.state.showEditReservation}
					editReservationState={this.editReservation}
					submitBooking={this.handleEditBooking}
					handleChangeBooking={this.changeEditBooking}

					/>
			</div>
		)
	}
}

export default Admin;