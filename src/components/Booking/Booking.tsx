import React from "react";
import './scss/Booking.scss';

const axios = require('axios');

interface ICustomerState {
    customerName: any,
    customerPhone: any,
    customerEmail: any
}

class Booking extends React.Component<{}, ICustomerState>  {

    postCustomerUrl = 'http://localhost:8888/restaurant_backend/api/postcustomers.php';

    constructor(props: any) {
        super(props);
        this.state = {
            customerName: '',
            customerPhone: '',
            customerEmail: ''
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
        } as Pick<ICustomerState, keyof ICustomerState>)
    }

    handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        
        axios.post(this.postCustomerUrl, {
            customerName: this.state.customerName,
            customerPhone: this.state.customerPhone,
            customerEmail: this.state.customerEmail
        })
            .then((result: any) => {
                console.log(result);
            })

        this.setState({
            customerName: '',
            customerPhone: '',
            customerEmail: ''
        });
    }

    render() {
        return (
            <div className="card textcenter mt-3">
                <div className="card-body">
                    <form id="aptForm" noValidate={true} onSubmit={this.handleSubmit}>
                        <div className="form-group form-row">
                            <label className="col-md-2 col-form-label text-md-right"
                            >
                                Name
                  </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="customerName"
                                    placeholder="Customer Name"
                                    value={this.state.customerName}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label
                                className="col-md-2 col-form-label text-md-right"
                                htmlFor="customerPhone"
                            >
                                Phone
                  </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="customerPhone"
                                    placeholder="Customer's Phone"
                                    value={this.state.customerPhone}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label
                                className="col-md-2 col-form-label text-md-right"
                                htmlFor="customerEmail"
                            >
                                Email
                  </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="customerEmail"
                                    placeholder="Customer'email"
                                    value={this.state.customerEmail}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row mb-0">
                            <div className="offset-md-2 col-md-10">
                                <button
                                    type="submit"
                                    className="btn btn-primary d-block ml-auto"
                                >
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

export default Booking;