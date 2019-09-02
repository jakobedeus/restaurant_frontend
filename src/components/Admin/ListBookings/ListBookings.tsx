import React from "react";
import './scss/ListBookings.scss';


interface IListBookingProps {
    reservations: any[];
    removeReservation(index: any): any;

}

class ListBookings extends React.Component<IListBookingProps, {}>  {

    constructor(props: any) {
        super(props);
    }

    handleRemoveReservation(index: number) {
        this.props.removeReservation(index)
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
            </li>
        ))

        return (
            <div>
                <ul>
                    {reservationList}
                </ul>
            </div>
        )
    }


}

export default ListBookings;