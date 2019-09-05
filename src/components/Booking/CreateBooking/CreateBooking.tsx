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
    bookingName: any,
    bookingEmail: any,
    bookingPhone: any,
    errorName: any,
    errorEmail: any,
    errorPhone: any,
    isCheckFormValidated: boolean,
}

export interface ICreateBookingErrors {
    bookingName: any,
    bookingPhone: any,
    bookingEmail: any,
}

class CreateBooking extends React.Component<ICreateBookingProps, ICreateBookingState>  {

    postCustomerUrl = 'http://localhost:8888/api/postBookingApi.php';

    constructor(props: any) {
        super(props);
        this.state = {
            bookingName: '',
            bookingEmail: '',
            bookingPhone: '',
            errorName: '',
            errorEmail: '',
            errorPhone: '',

            isCheckFormValidated: false,

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        this.props.handleCreateBookingChange(e);
    }

    handleNameChange = (e: any) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        } as Pick<ICreateBookingState, keyof ICreateBookingState>, () => {
            this.validateName();
        });
    };

    validateName = () => {
        const { bookingName } = this.state;
        this.setState({
            errorName:
                bookingName.length > 3 ? null : 'Name must be longer than 3 characters'
        });
    }

    handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        const { bookingName } = this.state;
        alert(`Your state values: \n 
                name: ${bookingName}`);
        this.props.handleCreateBooking(e);
    }

    render() {
        // console.log(this.props.errorBookingName)
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
                                    name='bookingName'
                                    className={`form-control ${this.state.errorName ? 'is-invalid' : ''}`}
                                    id='name'
                                    placeholder='Enter name'
                                    value={this.state.bookingName}
                                    onChange={this.handleNameChange}
                                    onBlur={this.validateName}
                                />

                                <div className='invalid-feedback'>{this.state.errorName}</div>
                            </div>
                            {/* <span>{this.state.errorBookingName}</span> */}
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
                                {/* disabled={!this.state.isFormValidated} */}
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