import React from "react";
import './scss/Booking.scss';
import CheckBooking from "./CheckBooking/CheckBooking";
import CreateBooking, { ICreateBookingState } from "./CreateBooking/CreateBooking";
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
            bookingNumberOfGuests: '1',
            bookingName: '',
            bookingPhone: '',
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
            console.log(response)
            if (response.data.length > 15) {
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

    

    handleCreateBooking(userInfo: ICreateBookingState) {

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
                console.log(response.data)
                console.log("Booking created")
                this.setState({ bookingCreateOk: !this.state.bookingCreateOk })
            }).catch((error: any) => {
                console.log(error)
            })

        // });

        

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
        this.setState({ bookingCheckOk: false, bookingCreateOk: false })

    }

    handleSelect(e: any) {
        this.setState({
            bookingNumberOfGuests: e.target.value,
        });
    }
    render() {
        console.log(this.state)
        return (
            <div className="booking-container">
                
                <h1 className="banner">
                    <span>NO NAME RESTAURANT</span>
                    &nbsp; - SERVICE TILL 11 PM ON FRI & SAT!
                </h1>
            
                {!this.state.bookingCreateOk && <CheckBooking
                    isCheckFormValidated={this.state.isCheckFormValidated}
                    handleCheckBooking={this.handleCheckBooking}
                    handleCheckBookingChange={this.handleCheckBookingChange}
                    selectOnChange={this.handleSelect}
                    numberOfGuestsState={this.state.bookingNumberOfGuests} />
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