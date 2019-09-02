import React from "react";
import './scss/CheckBooking.scss';

interface ICheckBookingProps {
    handleCheckBooking(e: any): void;
    handleCheckBookingChange(e: any): void;
    selectOnChange(e: any): void;
    numberOfGuestsState: string;
}

class CheckBooking extends React.Component<ICheckBookingProps, {}>  {

    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(e:any) {
        e.preventDefault();
        this.props.selectOnChange(e);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        this.props.handleCheckBookingChange(e);
    }

    handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        this.props.handleCheckBooking(e);
    }

    render() {
        return (
            <div className="card textcenter mt-3">
                <div className="card-body">
                    <form id="aptForm" noValidate={true} onSubmit={this.handleSubmit}>
                        <div className="form-group form-row">
                            <label className="col-md-2 col-form-label text-md-right">
                                Date
                        </label>
                            <div className="col-md-10">
                                <input
                                    type="date"
                                    className="form-control"
                                    name="bookingDate"
                                    placeholder="Date"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label className="col-md-2 col-form-label text-md-right" htmlFor="time">
                                Time
                            </label>
                            <div className="col-md-10">
                                <label htmlFor="time18">18.00</label>
                                <input type="radio" name="bookingTime" id="time18" value="18" onChange={this.handleChange} />

                                <label htmlFor="time21">21.00</label>
                                <input type="radio" name="bookingTime" id="time21" value="21" onChange={this.handleChange} />

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

                        <div className="form-group form-row mb-0">
                            <div className="offset-md-2 col-md-10">
                                <button type="submit" className="btn btn-primary d-block ml-auto">
                                    Check Availability
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


}

export default CheckBooking;