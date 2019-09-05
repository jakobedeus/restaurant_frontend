import React from "react";
import './scss/CreateBooking.scss';

interface ICreateBookingProps {
    bookingDate: any,
    bookingTime: any,
    bookingGuests: any,
    handleCreateBooking(e: any): void;
    handleCreateBookingChange(e: any): void;
}

interface ICreateBookingState {
    errors: ICreateBookingErrors,
    bookingName: any,
    bookingPhone: any,
    bookingEmail: any,
    isFormValidated: boolean,
}

export interface ICreateBookingErrors {
    bookingName: any,
    bookingPhone: any,
    bookingEmail: any,
}

const validEmailRegex =
RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


class CreateBooking extends React.Component<ICreateBookingProps, ICreateBookingState>  {

    postCustomerUrl = 'http://localhost:8888/api/postBookingApi.php';

    constructor(props: any) {
        super(props);
        this.state = {
            bookingEmail: null,
            bookingName: null,
            bookingPhone: null,
            isFormValidated: false,
            errors: {
                bookingName: '',
                bookingPhone: '',
                bookingEmail: '',
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        
        //   this.setState({ errors:  [name]:value}
        //     as Pick <ICreateBookingState, keyof ICreateBookingState>)
        this.props.handleCreateBookingChange(e);
    }

    handleSubmit(e: any) {
        e.preventDefault();

        const { name, value } = e.target;
        let errors = this.state.errors;

        switch (name) {
            case 'bookingName': 
              errors.bookingName = 
                value.length < 5
                  ? 'Full Name must be 5 characters long!'
                  : '';
              break;
            case 'bookingEmail': 
              errors.bookingEmail = 
                validEmailRegex.test(value)
                  ? ''
                  : 'Email is not valid!';
              break;
            case 'bookingPhone': 
              errors.bookingPhone = 
                value.length < 8
                  ? 'Password must be 8 characters long!'
                  : '';
              break;
            default:
              break;
          }
        this.props.handleCreateBooking(e);
    }

    render() {
        return (
            <div className="card textcenter mt-3">
                <div className="card-body">
                    <form id="aptForm" onSubmit={this.handleSubmit}>

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
                                <button disabled={!this.state.isFormValidated} type="submit" className="btn btn-primary d-block ml-auto">
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