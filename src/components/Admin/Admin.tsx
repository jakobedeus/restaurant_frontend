import React from "react";
import './scss/Admin.scss';
import { FaPlus } from 'react-icons/fa';
import ListBookings from "./ListBookings/ListBookings";
const axios = require('axios');

interface IAdminState {
	editBookingDate: any,
    editBookingTime: any,
    editBookingNumberOfGuests: any,
    editBookingName: any,
    editBookingPhone: any,
	editBookingEmail: any,
	editBookingID: any,
	formDisplay: boolean;
	showEditReservation: boolean;
	reservations: any[];
}

class Admin extends React.Component<{}, IAdminState>  {

	getBookingsUrl = 'http://localhost:8888/api/getBookings.php';
	bookingDeleteUrl = 'http://localhost:8888/api/deleteBooking.php';
	bookingEditUrl = 'http://localhost:8888/api/updateBooking.php';
	constructor(props: any) {
		super(props)
		this.state = {
			editBookingDate: '',
			editBookingTime: '',
			editBookingNumberOfGuests: '',
			editBookingName: '',
			editBookingPhone: '',
			editBookingEmail: '',
			editBookingID: '',
			formDisplay: false,
			reservations: [],
			showEditReservation: false,
		}

		this.toggleForm = this.toggleForm.bind(this);
		this.removeReservation = this.removeReservation.bind(this);
		this.editReservation = this.editReservation.bind(this);
		this.handleEditBooking = this.handleEditBooking.bind(this);
		this.changeEditBooking = this.changeEditBooking.bind(this);
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

	editReservation(item: any) {
		console.log(item);

		// console.log(this.state)

		this.setState({
			editBookingDate: item.Date,
			editBookingTime: item.Time,
			editBookingName: item.Name,
			editBookingEmail: item.Email,
			editBookingPhone: item.Phone,
			editBookingNumberOfGuests: item.Guests,
			editBookingID: item.ReservationID,
		})

		console.log(this.state)
	}

	changeEditBooking(e: any) {
		const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        } as Pick<IAdminState, keyof IAdminState>)
        
	}
	
	handleEditBooking(e: any) {
		console.log("State:" + this.state);
        const inputData = {
            editBookingName: this.state.editBookingName,
            editBookingEmail: this.state.editBookingEmail,
            editBookingPhone: this.state.editBookingPhone,
            editBookingDate: this.state.editBookingDate,
            editBookingNumberOfGuests: this.state.editBookingNumberOfGuests,
			editBookingTime: this.state.editBookingTime,
			editBookingID: this.state.editBookingID
		}

		console.log("Hej" + inputData);
		
        // axios.put(this.bookingEditUrl, inputData, {
        //     headers: { 'Content-Type': 'text/plain;' }
        // }).then((response: any) => {
        //     console.log(response.data)
        //     console.log("Edit booking saved")
        //     // this.setState({ bookingCreateOk: !this.state.bookingCreateOk })
        // }).catch((error: any) => {
        //     console.log(error)
        // })
    }

	render() {
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

					editBookingID={this.state.editBookingID}
					editBookingDate={this.state.editBookingDate}
					editBookingTime={this.state.editBookingTime}
					editBookingNumberOfGuests={this.state.editBookingNumberOfGuests}
					editBookingName={this.state.editBookingName}
					editBookingPhone={this.state.editBookingPhone}
					editBookingEmail={this.state.editBookingEmail}

					/>
			</div>
		)
	}
}

export default Admin;