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

export interface ICreateBooking {
    bookingName: any,
    bookingPhone: any,
    bookingEmail: any,
}

interface IBookingState {
    checkReservation: ICheckBookingState,
    createReservation: ICreateBooking,
}

const axios = require('axios');

class Booking extends React.Component<{}, IBookingState>  {
    
    constructor(props: any) {
        super(props)

        this.state = {
            checkReservation: {
                date: '',
                time: '',
                numberOfGuests: '',
            },
            createReservation: {
                bookingName: '',
                bookingPhone: '',
                bookingEmail: '',
            },
        }

        this.handleCheckBookingChange = this.handleCheckBookingChange.bind(this);
        this.handleCheckBooking = this.handleCheckBooking.bind(this);
    }
    
    checkCustomerUrl = 'http://localhost:8888/api/checkBookingApi.php';
    postCustomerUrl = 'http://localhost:8888/api/postBookingApi.php';

    handleCheckBooking(e: any) {

        let inputData = {
            date: this.state.checkReservation.date,
            numberOfGuests: this.state.checkReservation.numberOfGuests,
            time: this.state.checkReservation.time,
        }

        axios.post(this.checkCustomerUrl, inputData, {
            headers: { 'Content-Type': 'text/plain;' }
        }).then((response: any) => {
            if (response.data.length > 1) {
                console.log("fullt")
            } else {
                console.log("du får boka")
            }
        }).catch((error: any) => {
            console.log(error)
        })
    }

    handleCheckBookingChange(e: any) {
        const target = e.target;
        const name = target.name;

        this.setState({
            checkReservation: {
                  ...this.state.checkReservation,
                  [name]: e.target.value
            }
        })
    }

    render() {
        console.log(this.state)


        return (
            <div className="container">
                <CheckBooking 
                    // date={this.state.checkReservation} 
                    // time={this.state.time} 
                    // numberOfGuests={this.state.numberOfGuests} 
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