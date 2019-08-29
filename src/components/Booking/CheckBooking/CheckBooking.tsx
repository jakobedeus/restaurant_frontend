import React from "react";
import './scss/CheckBooking.scss';

const axios = require('axios');

interface ICheckBookingState {
    date: any,
    time: any,
    numberOfGuests: any
}

class CheckBooking extends React.Component<{}, ICheckBookingState>  {
    postCustomerUrl = 'http://localhost:8888/api/checkBookingApi.php';

    constructor(props: any) {
        super(props);
        this.state = {
            date: '',
            time: '',
            numberOfGuests: ''
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
        } as Pick<ICheckBookingState, keyof ICheckBookingState>)
    }

    handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        let inputData = {
            date: this.state.date,
            // numberOfGuests: this.state.numberOfGuests,
            time: this.state.time,
        }

        axios.post(this.postCustomerUrl, inputData, {
            headers: { 'Content-Type': 'text/plain;' }
        }).then((response: any) => {
            if (response.data.length > 1) {
                console.log("fullt")
            } else {
                console.log("du får boka")
            }
        }).catch((error: any) => {
            console.log(error)
        })

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
                                    value={this.state.date}
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
                                    value={this.state.numberOfGuests}
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