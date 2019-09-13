import React from "react";
import './scss/Admin.scss';
import ListBookings, { IListBookingDetails } from "./ListBookings/ListBookings";
const axios = require('axios');

interface IAdminState {
	reservations: IAdminDetails[],
	showEditReservation: boolean,
}

export interface IAdminDetails {
	Date: string,
	Time: string,
	Guests: number,
	Name: string,
	Phone: number,
	Email: string,
	ReservationID: number,
	CustomerID: number,
	isInEditMode: boolean;
}

class Admin extends React.Component<{}, IAdminState>  {

	constructor(props: any) {
		super(props)
		this.state = {
			reservations: [],
			showEditReservation: false,
		}

		this.removeReservation = this.removeReservation.bind(this);
		this.handleEditBooking = this.handleEditBooking.bind(this);
	}

	getBookingsUrl = 'http://localhost:8888/api/getBookings.php';
	deleteBookingUrl = 'http://localhost:8888/api/deleteBooking.php';
	updateBookingUrl = 'http://localhost:8888/api/updateBooking.php';

	componentDidMount() {
		// Fetch all reservations and set it to state
		axios.get(this.getBookingsUrl, {
		}).then((response: any) => {
			this.setState({
				reservations: response.data
			})
		})
	}

	removeReservation = (ReservationID: number) => {
		// Use variable sent from form to delete entire reservation.
		axios.delete(
			this.deleteBookingUrl,
			{
				data:
					JSON.stringify({ ReservationID: ReservationID })
			}).then((response: any) => {
				// .filter is another way of removing wanted item from array.
				this.setState({ reservations: this.state.reservations.filter(item => item.ReservationID != ReservationID) });
			});
	}

	handleEditBooking = (dataToBeEdited: IListBookingDetails) => {
		// Recieve data from form which user wants to edit, and make request.
		axios.put(this.updateBookingUrl, JSON.stringify(dataToBeEdited), {
			headers: { 'Content-Type': 'text/plain;' },
		}).then((response: any) => {
		})
	}

	render() {
		return (
			<ListBookings
				reservationProps={this.state.reservations}
				removeReservation={this.removeReservation}
				editReservationProps={this.state.showEditReservation}
				submitBooking={this.handleEditBooking}
			/>
		)
	}
}

export default Admin;