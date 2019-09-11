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
            <div className="reservation-complete-block">
                <div>Thank you for your reservation</div>

                <button onClick={this.newBooking}>Go back</button>
            </div>
        )
    }


}

export default CompleteBooking;