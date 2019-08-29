import React from "react";
import './scss/Booking.scss';
import CheckBooking from "./CheckBooking/CheckBooking";
import CreateBooking from "./CreateBooking/CreateBooking";
import CompleteBooking from "./CompleteBooking/CompleteBooking";



class Booking extends React.Component<{}, {}>  {

    render() {
        return (
            <div className="container">
                <CheckBooking />
                <CreateBooking />
                <CompleteBooking />
            </div>
        )
    }


}

export default Booking;