import React from "react";
import './scss/CheckBooking.scss';

interface ICheckBookingState {
    date: any,
    time: any,
    numberOfGuests: any,
}

interface ICheckBookingProps {
    date: any,
    time: any,
    numberOfGuests: any,
    handleCheckBooking(e: any): void;
    handleCheckBookingChange(e: any): void;
}

class CheckBooking extends React.Component<ICheckBookingProps, ICheckBookingState>  {


    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                                    type="text"
                                    className="form-control"
                                    name="date"
                                    placeholder="Date"
                                    value={this.props.date}
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
                                <input type="radio" name="time" id="time18" value="18" onChange={this.handleChange} />

                                <label htmlFor="time21">21.00</label>
                                <input type="radio" name="time" id="time21" value="21" onChange={this.handleChange} />

                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label className="col-md-2 col-form-label text-md-right">
                                Guests
                        </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="numberOfGuests"
                                    placeholder="Number of guests"
                                    value={this.props.numberOfGuests}
                                    onChange={this.handleChange}
                                />
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