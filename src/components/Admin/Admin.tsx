import React from "react";
import './scss/Admin.scss';
import ListBookings from "./ListBookings/ListBookings";
const axios = require('axios');

interface IAdminState {
	reservations: IAdminDetails[],
	showEditReservation: boolean,
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
		}

		this.removeReservation = this.removeReservation.bind(this);
		this.editReservation = this.editReservation.bind(this);
		this.handleEditBooking = this.handleEditBooking.bind(this);
	}

	componentDidMount() {
		axios.get(this.getBookingsUrl, {

		}).then((response: any) => {
			console.log(response.data)

			this.setState({
				reservations: response.data
			})

		})
		// .catch((error: any) => {
		// 	// console.log(error)
		// })
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

		});
	}

	handleEditBooking = (dataToBeEdited: any) => {
		console.log(dataToBeEdited);

		axios.put(this.bookingEditUrl, dataToBeEdited, {
			headers: { 'Content-Type': 'text/plain;' },
		}).then((response: any) => {
			console.log("Edit booking saved")
		}).catch((error: any) => {
			console.log(error)
		})
	}

	render() {

		return (
			<ListBookings
				reservationProps={this.state.reservations}
				removeReservation={this.removeReservation}
				editReservationProps={this.state.showEditReservation}
				editReservationState={this.editReservation}
				submitBooking={this.handleEditBooking}
			/>
		)
	}
}

export default Admin;