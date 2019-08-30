import React from "react";
import './scss/CreateBooking.scss';

const axios = require('axios');


interface ICreateBookingProps {
    bookingDate: any,
    bookingTime: any,
    bookingGuests: any,
    handleCreateBooking(e: any): void;
    handleCreateBookingChange(e: any): void;
}

class CreateBooking extends React.Component<ICreateBookingProps, {}>  {

    postCustomerUrl = 'http://localhost:8888/api/postBookingApi.php';

    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        this.props.handleCreateBookingChange(e);
    }

    handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        this.props.handleCreateBooking(e);
    }

    render() {
        return (
            <div className="card textcenter mt-3">
                <div className="card-body">
                    <form id="aptForm" noValidate={true} onSubmit={this.handleSubmit}>

                        <input type="hidden" name="" id="" value={this.props.bookingDate} />
                        <input type="hidden" name="" id="" value={this.props.bookingGuests} />
                        <input type="hidden" name="" id="" value={this.props.bookingTime} /> 

                        <div className="form-group form-row">
                            <label className="col-md-2 col-form-label text-md-right">
                                Name
                        </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="bookingName"
                                    placeholder="Customer Name"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label className="col-md-2 col-form-label text-md-right" htmlFor="customerPhone">
                                Phone
                        </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="bookingPhone"
                                    placeholder="Customer's Phone"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label className="col-md-2 col-form-label text-md-right" htmlFor="customerEmail">
                                Email
                        </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="bookingEmail"
                                    placeholder="Customer'email"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row mb-0">
                            <div className="offset-md-2 col-md-10">
                                <button type="submit" className="btn btn-primary d-block ml-auto">
                                    Add reservation
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateBooking;