import React from "react";
import './scss/CreateBooking.scss';

const axios = require('axios');

interface ICreateBookingState {
    bookingName: string,
    bookingPhone: any,
    bookingEmail: any,
    bookingDate: any,
    bookingTime: any,
    bookingGuests: any,
}

class CreateBooking extends React.Component<{}, ICreateBookingState>  {

    postCustomerUrl = 'http://localhost:8888/api/postBookingApi.php';

    constructor(props: any) {
        super(props);
        this.state = {
            bookingName: '',
            bookingPhone: '',
            bookingEmail: '',
            bookingDate: '',
            bookingTime: '',
            bookingGuests: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        } as Pick<ICreateBookingState, keyof ICreateBookingState>)
    }

    handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();

        let inputData = {
            bookingName: this.state.bookingName,
            bookingPhone: this.state.bookingPhone,
            bookingEmail: this.state.bookingEmail,

            bookingDate: this.state.bookingDate,
            bookingTime: this.state.bookingTime,
            bookingGuests: this.state.bookingGuests,
        }

        axios.post(this.postCustomerUrl, inputData, {
            headers: { 'Content-Type': 'text/plain;' }
        })
            .then((response: any) => {
                console.log(response)
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="card textcenter mt-3">
                <div className="card-body">
                    <form id="aptForm" noValidate={true} onSubmit={this.handleSubmit}>

                        <input type="hidden" name="" id="" value={this.state.bookingDate} />
                        <input type="hidden" name="" id="" value={this.state.bookingGuests} />
                        <input type="hidden" name="" id="" value={this.state.bookingTime} />

                        <div className="form-group form-row">
                            <label className="col-md-2 col-form-label text-md-right">
                                Name
                        </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="customerName"
                                    placeholder="Customer Name"
                                    value={this.state.bookingName}
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
                                    name="customerPhone"
                                    placeholder="Customer's Phone"
                                    value={this.state.bookingPhone}
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
                                    name="customerEmail"
                                    placeholder="Customer'email"
                                    value={this.state.bookingEmail}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row mb-0">
                            <div className="offset-md-2 col-md-10">
                                <button type="submit" className="btn btn-primary d-block ml-auto">
                                    Add customer
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