import React from "react";
import './scss/Booking.scss';
import CheckBooking from "./CheckBooking/CheckBooking";
import CreateBooking, { ICreateBookingState } from "./CreateBooking/CreateBooking";
import CompleteBooking from "./CompleteBooking/CompleteBooking";

interface IBookingState {
    bookingDate: string,
    bookingTime: string,
    bookingNumberOfGuests: number,
    bookingName: string,
    bookingPhone: number,
    bookingEmail: string,
    bookingCheckOk: boolean,
    bookingCreateOk: boolean,
    isCheckFormValidated: boolean,
}

var moment = require('moment');
const axios = require('axios');

class Booking extends React.Component<{}, IBookingState>  {

    constructor(props: any) {
        super(props)

        this.state = {
            bookingDate: moment().format('YYYY-MM-DD'),
            bookingTime: '18:00',
            bookingNumberOfGuests: 1,
            bookingName: '',
            bookingPhone: 0,
            bookingEmail: '',
            bookingCheckOk: false,
            bookingCreateOk: false,
            isCheckFormValidated: false,
        }

        this.handleCheckBookingChange = this.handleCheckBookingChange.bind(this);
        this.handleCheckBooking = this.handleCheckBooking.bind(this);

        this.handleCreateBooking = this.handleCreateBooking.bind(this);
        this.handleCreateBookingChange = this.handleCreateBookingChange.bind(this);

        this.handleNewBooking = this.handleNewBooking.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    checkBookingUrl = 'http://localhost:8888/api/checkBooking.php';
    postBookingUrl = 'http://localhost:8888/api/postBooking.php';

    handleCheckBooking() {
        axios.get(this.checkBookingUrl, {
            params: {
                bookingDate: JSON.stringify(this.state.bookingDate),
                bookingNumberOfGuests: this.state.bookingNumberOfGuests,
                bookingTime: JSON.stringify(this.state.bookingTime),
            }
        }).then((response: any) => {
            if (response.data.length > 14) {
                alert("The selected date and time are not available. Select another time or date")
            } else {
                this.setState({
                    bookingCheckOk: !this.state.bookingCheckOk
                })
            }
        })
    }

    handleCreateBooking(userInfo: ICreateBookingState) {
         // Since we are using lifting state up we can acess some of the variables we need through state and some 
        // are passed to this functions as parameters of a certain interface type.
        // Put these two sources of information together into 1 object to send to database.


            let postData = {
                bookingName: userInfo.bookingName,
                bookingEmail: userInfo.bookingEmail,
                bookingPhone: userInfo.bookingPhone,
                bookingDate: this.state.bookingDate,
                bookingTime: this.state.bookingTime,
                bookingGuests: this.state.bookingNumberOfGuests,
            }

            axios.post(this.postBookingUrl, postData, {
                headers: { 'Content-Type': 'text/plain;' }
            }).then((response: any) => {
                this.setState({ bookingCreateOk: !this.state.bookingCreateOk })
            })
    }

    handleCheckBookingChange(e: any) {
        // Set changes to from props to local state.
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
         // Reset state booleans, which resets the booking process.
        this.setState({ bookingCheckOk: false, bookingCreateOk: false })

    }

    handleSelect(e: any) {
        this.setState({
            bookingNumberOfGuests: e.target.value,
        });
    }
    render() {
        return (
            <div className="booking-container">
                
                <h1 className="banner">
                    <span>NO NAME RESTAURANT</span>
                    &nbsp; - SERVICE TILL 11 PM ON FRI & SAT!
                </h1>
            
                {/* Check boolean value to present correct component */}
                {!this.state.bookingCreateOk && <CheckBooking
                    isCheckFormValidated={this.state.isCheckFormValidated}
                    handleCheckBooking={this.handleCheckBooking}
                    handleCheckBookingChange={this.handleCheckBookingChange}
                    selectOnChange={this.handleSelect}
                    numberOfGuestsState={this.state.bookingNumberOfGuests} />
                }

                {/* Check boolean value to present correct component */}
                {this.state.bookingCheckOk && !this.state.bookingCreateOk && <CreateBooking
                    bookingDate={this.state.bookingDate}
                    bookingGuests={this.state.bookingNumberOfGuests}
                    bookingTime={this.state.bookingTime}
                    handleCreateBooking={this.handleCreateBooking}
                    handleCreateBookingChange={this.handleCreateBookingChange} />}

                {/* Check boolean value to present correct component */}
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