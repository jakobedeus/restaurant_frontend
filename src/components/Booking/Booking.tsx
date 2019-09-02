import React from "react";
import './scss/Booking.scss';
import CheckBooking from "./CheckBooking/CheckBooking";
import CreateBooking from "./CreateBooking/CreateBooking";
import CompleteBooking from "./CompleteBooking/CompleteBooking";

interface IBookingState {
    bookingDate: any,
    bookingTime: any,
    bookingNumberOfGuests: any,
    bookingName: any,
    bookingPhone: any,
    bookingEmail: any,
    bookingCheckOk: boolean,
    bookingCreateOk: boolean,
}

const axios = require('axios');

class Booking extends React.Component<{}, IBookingState>  {

    constructor(props: any) {
        super(props)

        this.state = {
            bookingDate: '',
            bookingTime: '',
            bookingNumberOfGuests: '',
            bookingName: '',
            bookingPhone: '',
            bookingEmail: '',
            bookingCheckOk: false,
            bookingCreateOk: false,
        }

        this.handleCheckBookingChange = this.handleCheckBookingChange.bind(this);
        this.handleCheckBooking = this.handleCheckBooking.bind(this);

        this.handleCreateBooking = this.handleCreateBooking.bind(this);
        this.handleCreateBookingChange = this.handleCreateBookingChange.bind(this);

        this.handleNewBooking = this.handleNewBooking.bind(this);
    }

    checkBookingUrl = 'http://localhost:8888/api/checkBooking.php';
    postBookingUrl = 'http://localhost:8888/api/postBooking.php';

    handleCheckBooking() {

        axios.get(this.checkBookingUrl, {
            params: {
                bookingDate: this.state.bookingDate,
                bookingNumberOfGuests: this.state.bookingNumberOfGuests,
                bookingTime: this.state.bookingTime,
            }
        }).then((response: any) => {
            console.log(response)
            if (response.data.length > 1) {

                alert("The selected date and time are not available. Select another time or date")
            } else {
                this.setState({
                    bookingCheckOk: !this.state.bookingCheckOk
                })
                console.log(response)

            }
        }).catch((error: any) => {
            console.log(error)
        })
    }

    handleCreateBooking() {
        let inputData = {
            bookingName: this.state.bookingName,
            bookingEmail: this.state.bookingEmail,
            bookingPhone: this.state.bookingPhone,
            bookingDate: this.state.bookingDate,
            bookingNumberOfGuests: this.state.bookingNumberOfGuests,
            bookingTime: this.state.bookingTime,
        }
        axios.post(this.postBookingUrl, inputData, {
            headers: { 'Content-Type': 'text/plain;' }
        }).then((response: any) => {
            console.log(response.data)
            console.log("Booking created")
            this.setState({ bookingCreateOk: !this.state.bookingCreateOk })
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
        } as Pick<IBookingState, keyof IBookingState>)
    }

    handleCreateBookingChange(e: any) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        } as Pick<IBookingState, keyof IBookingState>)
    }

    handleNewBooking() {
        this.setState({ bookingCheckOk: false, bookingCreateOk: false})

    }

    render() {
        console.log(this.state)
        return (
            <div className="container">

                {!this.state.bookingCreateOk && <CheckBooking
                    handleCheckBooking={this.handleCheckBooking}
                    handleCheckBookingChange={this.handleCheckBookingChange} />
                }

                {this.state.bookingCheckOk && !this.state.bookingCreateOk && <CreateBooking
                    bookingDate={this.state.bookingDate}
                    bookingGuests={this.state.bookingNumberOfGuests}
                    bookingTime={this.state.bookingTime}
                    handleCreateBooking={this.handleCreateBooking}
                    handleCreateBookingChange={this.handleCreateBookingChange} />}

                {this.state.bookingCreateOk &&
                    <CompleteBooking
                    handleNewBooking={this.handleNewBooking}
                    />
                }

            </div>
        )
    }


}

export default Booking;