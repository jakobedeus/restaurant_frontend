import React from "react";
import './scss/CompleteBooking.scss';

interface ICompleteBookingProps {
    handleNewBooking(): void;
}

class CompleteBooking extends React.Component<ICompleteBookingProps, {}>  {
    constructor(props: any) {
        super(props);
        this.newBooking = this.newBooking.bind(this); 
    }

    newBooking() {
        this.props.handleNewBooking();
    }

    render() {
        return (
            <div className="container">
                <div className="reservation-complete-block">
                    <h2>Reservation completed</h2>
                    <p>Thank you! A confermation email has been sent to you.</p>

                    <div className="button-complete">
                        <button onClick={this.newBooking} className="btn-back">Go back</button>
                    </div>
                </div>
            </div>
        )
    }


}

export default CompleteBooking;