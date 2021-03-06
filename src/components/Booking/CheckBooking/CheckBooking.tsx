import React from "react";
import './scss/CheckBooking.scss';

interface ICheckBookingProps {
    handleCheckBooking(e: any): void;
    handleCheckBookingChange(e: any): void;
    selectOnChange(e: any): void;
    numberOfGuestsState: number;
    isCheckFormValidated: boolean;
    
}

interface ICheckBookingState {
    CurrentDate: any,
}

const moment = require('moment');

class CheckBooking extends React.Component<ICheckBookingProps, ICheckBookingState>  {

    // Using lifting state up for some information but still using local state within component for some data.


    constructor(props: any) {
        super(props);

        this.state = {
            CurrentDate: moment().format('YYYY-MM-DD'),
        }

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(e: any) {
        e.preventDefault();
        this.props.selectOnChange(e);
    }

    handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        var CurrentDate = moment().format('YYYY-MM-DD');
        var GivenDate = e.target.value;

        this.setState({ CurrentDate: GivenDate})
        // Check if date from user input is in the past
        if (GivenDate > CurrentDate) {
            e.preventDefault();
            this.props.handleCheckBookingChange(e);
        } else {
            alert("You can't book in the past.");
        }
    }

    handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.handleCheckBookingChange(e);
    }

    handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        this.props.handleCheckBooking(e);
    }
    

    render() {

        return (

            <div className="container">
                <h2>Make a reservation</h2>
                <div className="reservation-check-block">
                    <form id="reservation-form" onSubmit={this.handleSubmit}>
                        <div className="inputs-group">
                        <div className="form-group-date form-row">
                            <label className="date">
                                Date
                             </label>
                            <div className="date-input">
                                <input 
                                    type="date"
                                    className="form-control"
                                    name="bookingDate"
                                    placeholder="Date"
                                    value={this.state.CurrentDate}
                                    onChange={this.handleDateChange}
                                />
                            </div>
                        </div>

                        <div className="form-group-time form-row">
                            <label className="time">
                                Time
                            </label>
                            <div className="radio-toolbar">
                                <label htmlFor="time18">18:00</label>
                                <input type="radio" name="bookingTime" id="time18" value="18:00" onChange={this.handleTimeChange} defaultChecked={true}/>
                            </div>    
                            <div className="radio-toolbar">
                                <label htmlFor="time21">21:00</label>
                                <input type="radio" name="bookingTime" id="time21" value="21:00" onChange={this.handleTimeChange} />
                            </div>
                            
                        </div>

                        <div className="form-group-guests form-row">
                            <label className="guests">
                                Guests
                        </label>
                            <div className="input-select-guests" >
                                <select name="bookingNumberOfGuests" onChange={this.handleSelectChange} value={this.props.numberOfGuestsState}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>
                        </div>
                        </div>

                        <div className="button-check">
                            <button type="submit" className="btn-check">
                                Check Availability
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        )
    }


}

export default CheckBooking;