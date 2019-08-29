import React from "react";
import './scss/Booking.scss';
import CheckBooking from "./CheckBooking/CheckBooking";
import CreateBooking, { ICreateBooking } from "./CreateBooking/CreateBooking";
import CompleteBooking from "./CompleteBooking/CompleteBooking";

export interface ICheckBookingState {
    date: any,
    time: any,
    numberOfGuests: any,
}

interface IBookingState {
    checkReservation: ICheckBookingState[],
    createReservation: ICreateBooking[],
}

const axios = require('axios');


class Booking extends React.Component<{}, ICheckBookingState>  {
    constructor(props: any) {
        super(props)

        this.state = {
            date: '',
            time: '',
            numberOfGuests: '',
        }

        this.handleCheckBookingChange = this.handleCheckBookingChange.bind(this);
        this.handleCheckBooking = this.handleCheckBooking.bind(this);
    }
    
    checkCustomerUrl = 'http://localhost:8888/api/checkBookingApi.php';
    postCustomerUrl = 'http://localhost:8888/api/postBookingApi.php';

    handleCheckBooking(e: any) {
        let inputData = {
            date: this.state.date,
            // numberOfGuests: this.state.numberOfGuests,
            time: this.state.time,
        }

        axios.post(this.checkCustomerUrl, inputData, {
            headers: { 'Content-Type': 'text/plain;' }
        }).then((response: any) => {
            if (response.data.length > 1) {
                console.log("fullt")
            } else {
                console.log("du får boka")
                // this.setState({date: })
            }
        }).catch((error: any) => {
            console.log(error)
        })
    }

    handleCheckBookingChange(e: any) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        } as Pick<ICheckBookingState, keyof ICheckBookingState>)
    }

    handleCreateChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        } as Pick<ICheckBookingState, keyof ICheckBookingState>)
    }

    render() {
        return (
            <div className="container">
                <CheckBooking 
                    date={this.state.date} 
                    time={this.state.time} 
                    numberOfGuests={this.state.numberOfGuests} 
                    handleCheckBooking={this.handleCheckBooking}
                    handleCheckBookingChange={this.handleCheckBookingChange}/>

                {/* <CreateBooking
                    booking={this.state.checkReservation}
                    // bookingDate={this.state.date}
                    // bookingTime={this.state.time}
                    // bookingGuests={this.state.numberOfGuests}
                    />
                <CompleteBooking /> */}
            </div>
        )
    }


}

export default Booking;