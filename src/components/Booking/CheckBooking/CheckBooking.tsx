import React from "react";
import './scss/CheckBooking.scss';

interface ICheckBookingProps {
    handleCheckBooking(e: any): void;
    handleCheckBookingChange(e: any): void;
    selectOnChange(e: any): void;
    numberOfGuestsState: string;
    isCheckFormValidated: boolean;
}

const moment = require('moment');

class CheckBooking extends React.Component<ICheckBookingProps, {}>  {

    constructor(props: any) {
        super(props);

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

        if (GivenDate > CurrentDate) {
            e.preventDefault();
            this.props.handleCheckBookingChange(e);
        } else {
            alert('You cant book in the past.');
        }
    }

    handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
        
        e.preventDefault();
        this.props.handleCheckBookingChange(e);
    }

    handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        this.props.handleCheckBooking(e);
    }

    render() {
        return (

            <div className="container">
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
                                    onChange={this.handleDateChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label className="col-md-2 col-form-label text-md-right" htmlFor="time">
                                Time
                            </label>
                            <div className="col-md-10">
                                <label htmlFor="time18">18.00</label>
                                <input type="radio" name="bookingTime" id="time18" value="18" checked onChange={this.handleTimeChange} />

                                <label htmlFor="time21">21.00</label>
                                <input type="radio" name="bookingTime" id="time21" value="21" onChange={this.handleTimeChange} />

                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label className="col-md-2 col-form-label text-md-right">
                                Guests
                        </label>
                            <div className="col-md-10">
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
                            <button type="submit" className="btn btn-primary">
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