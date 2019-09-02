import React from "react";
import './scss/ListBookings.scss';


interface IListBookingProps {
    reservations: any[];
    removeReservation(index: any): any;
    editReservationState(index: any): any;
    submitBooking(e: any): any;
    handleChangeBooking(e: any): any;
    editReservationProps: boolean;
}

class ListBookings extends React.Component<IListBookingProps, {}>  {

    constructor(props: any) {
        super(props);
        
        this.handleSubmitChange = this.handleSubmitChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.submitEditBooking = this.submitEditBooking.bind(this);
    }

    handleRemoveReservation(index: number) {
        this.props.removeReservation(index)
    }

    handleEditReservation(index: number) {
        this.props.editReservationState(index)
    }

    handleSubmitChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        this.props.handleChangeBooking(e);
    }

    submitEditBooking(e: { preventDefault: () => void; }) {
        e.preventDefault();
        this.props.submitBooking(e);
    }

    handleSelectChange(e: any) {
        e.preventDefault();
        this.props.handleChangeBooking(e);
    }


    render() {
        const reservationList = this.props.reservations.map((item, index) => (
            <li key={index}>
                ReservationID: {item.ReservationID}
                Name: {item.Name}
                Email: {item.Email}
                Phone: {item.Phone}
                Date: {item.Date}
                Time: {item.Time}
                Guests: {item.Guests}
                <button onClick={this.handleRemoveReservation.bind(this, item.ReservationID)}>Remove</button>
                <button onClick={this.handleEditReservation.bind(this, item.ReservationID)}>Edit</button>
            </li>
        ))

        const editReservationList = this.props.reservations.map((item, index) => (
            <li key={index}>
                <form action="" onSubmit={this.submitEditBooking}>
                    ReservationID: {item.ReservationID}
                    <input type="text" name="" id="" value={item.Name} onChange={this.handleSubmitChange} />
                    <input type="text" name="" id="" value={item.Email} onChange={this.handleSubmitChange} />
                    <input type="text" name="" id="" value={item.Phone} onChange={this.handleSubmitChange} />
                    <input type="date" name="" id="" value={item.Date}  onChange={this.handleSubmitChange}/>
                    
                    <select name="bookingTime" value={item.Time}>
                        <option value="18">18</option>
                        <option value="21">21</option>
                    </select>

                    <select name="bookingNumberOfGuests" value={item.Guests} onChange={this.handleSelectChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>

                    <button onClick={this.handleRemoveReservation.bind(this, item.ReservationID)}>Save</button>

                </form>
            </li>
        ))

        return (
            <div>
                <ul>
                    {this.props.editReservationProps && editReservationList}
                    {!this.props.editReservationProps && reservationList}
                </ul>
            </div>
        )
    }


}

export default ListBookings;