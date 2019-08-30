import React from "react";
import './scss/Booking.scss';
import CheckBooking from "./CheckBooking/CheckBooking";
import CreateBooking, { ICreateBookingState } from "./CreateBooking/CreateBooking";
import CompleteBooking from "./CompleteBooking/CompleteBooking";

export interface ICheckBookingState {
    date: any,
    time: any,
    numberOfGuests: any,
    bookingOk: boolean,
}

export interface ICreateBooking {
    bookingName: any,
    bookingPhone: any,
    bookingEmail: any,
}

interface IBookingState {
    checkReservation: ICheckBookingState,
    createReservation: ICreateBookingState,
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
                bookingOk: false
            },
            createReservation: {
                bookingName: '',
                bookingPhone: '',
                bookingEmail: '',
            },
        }

        this.handleCheckBookingChange = this.handleCheckBookingChange.bind(this);
        this.handleCheckBooking = this.handleCheckBooking.bind(this);

        this.handleCreateBooking = this.handleCreateBooking.bind(this);
        this.handleCreateBookingChange = this.handleCreateBookingChange.bind(this);
    }
    
    checkCustomerUrl = 'http://localhost:8888/api/checkBookingApi.php';
    postCustomerUrl = 'http://localhost:8888/api/postBookingApi.php';

    handleCheckBooking() {
        let inputData = {
            date: this.state.checkReservation.date,
            numberOfGuests: this.state.checkReservation.numberOfGuests,
            time: this.state.checkReservation.time,
        }

        axios.post(this.checkCustomerUrl, inputData, {
            headers: { 'Content-Type': 'text/plain;' }
        }).then((response: any) => {
            if (response.data.length > 1) {
                alert("The selected date and time are not available. Select another time or date")
            } else {
                this.setState({
                    checkReservation: {
                          ...this.state.checkReservation,
                          bookingOk: !this.state.checkReservation.bookingOk
                    }
                })
                
            }
        }).catch((error: any) => {
            console.log(error)
        })
    }

    handleCreateBooking() {
        // let inputData = {
        //     bookingName: this.state.createReservation.bookingName,
        //     bookingEmail: this.state.createReservation.bookingEmail,
        //     bookingPhone: this.state.createReservation.bookingPhone,
        // }

        // axios.post(this.postCustomerUrl, inputData, {
        //     headers: { 'Content-Type': 'text/plain;' }
        // }).then((response: any) => {
        //     console.log(response.data)
        // }).catch((error: any) => {
        //     console.log(error)
        // })
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

    handleCreateBookingChange(e: any) {
        const target = e.target;
        const name = target.name;

        this.setState({
            createReservation: {
                  ...this.state.createReservation,
                  [name]: e.target.value
            }
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="container">
                <CheckBooking 
                    handleCheckBooking={this.handleCheckBooking}
                    handleCheckBookingChange={this.handleCheckBookingChange}/>

                    {this.state.checkReservation.bookingOk && <CreateBooking
                        bookingDate={this.state.checkReservation.date}
                        bookingGuests={this.state.checkReservation.numberOfGuests}
                        bookingTime={this.state.checkReservation.time}
                        handleCreateBooking={this.handleCreateBooking}
                        handleCreateBookingChange={this.handleCreateBookingChange}/> }

            </div>
        )
    }


}

export default Booking;