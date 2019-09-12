import React from "react";
import './scss/CreateBooking.scss';

interface ICreateBookingProps {
    bookingDate: any,
    bookingTime: any,
    bookingGuests: any,
    handleCreateBooking(e: any): void;
    handleCreateBookingChange(e: any): void;
}

export interface ICreateBookingState {
    bookingName: any,
    bookingEmail: any,
    bookingPhone: any,
    bookingGDPR: boolean,
    errorName: any,
    errorEmail: any,
    errorPhone: any,
    errorGDPR: any,
    isCheckFormValidated: boolean,
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
            bookingName: '',
            bookingEmail: '',
            bookingPhone: '',
            bookingGDPR: false,
            errorName: '',
            errorEmail: '',
            errorPhone: '',
            errorGDPR: '',

            isCheckFormValidated: false,

        }
        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleGDPRChange = this.handleGDPRChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleGDPRChange = this.handleGDPRChange.bind(this);
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

    handleEmailChange = (e: any) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        } as Pick<ICreateBookingState, keyof ICreateBookingState>, () => {
            this.validateEmail();
        });
    };

    validateEmail = () => {
        const { bookingEmail } = this.state;
        this.setState({
            errorEmail:
                validEmailRegex.test(bookingEmail) ? null : 'Email is invalid'
        });
    }

    handlePhoneChange = (e: any) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        } as Pick<ICreateBookingState, keyof ICreateBookingState>, () => {
            this.validatePhone();
        });
    };

    validatePhone = () => {
        const { bookingPhone } = this.state;
        this.setState({
            errorPhone:
                bookingPhone.length > 7 ? null : 'Phone number must be min 7 digits'
        });
    }

    handleGDPRChange = (e: any) => {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        this.setState({ bookingGDPR: value }, () => {
            this.validateGDPR();
        });
    };

    validateGDPR = () => {
        const { bookingGDPR } = this.state;
        this.setState({
            errorGDPR:
                bookingGDPR === true ? null : 'You need to accept GDPR terms'
        });
    }

    handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        if (this.state.bookingGDPR === true) {
            this.props.handleCreateBooking(this.state);

        } else if (this.state.bookingName.length == 0) {
            this.setState({ errorName: "Name must be longer than 3 characters"})

        }  else if ( this.state.bookingPhone.length == 0) {
            this.setState({ errorPhone: "Phone number must be min 7 digits"})

        } else if ( validEmailRegex.test(this.state.bookingEmail) == false) {
            this.setState({ errorEmail: "Email is invalid"})

        }  
        else {
            this.validateGDPR()
        }
    } 

    render() {
        return (
            <div className="container">
                <h2 className="availability-text">Table available for &nbsp;
                    <span>{this.props.bookingGuests}</span> people on &nbsp;   
                    <span>{this.props.bookingDate}</span> at &nbsp;  
                    <span>{this.props.bookingTime}</span>
                </h2>
                <div className="reservation-create-block">
                    <form onSubmit={this.handleSubmit}>
                        <div className="inputs-group">

                            <input type="hidden" name="" id="" value={this.props.bookingDate} />
                            <input type="hidden" name="" id="" value={this.props.bookingGuests} />
                            <input type="hidden" name="" id="" value={this.props.bookingTime} />

                            <div className="form-group-name form-row">
                                <label htmlFor="bookingName">
                                    Name
                                </label>
                                <input
                                    name='bookingName'
                                    className={`form-control ${this.state.errorName ? 'is-invalid' : ''}`}
                                    id='bookingnName'
                                    value={this.state.bookingName}
                                    onChange={this.handleNameChange}
                                    onBlur={this.validateName}
                                />

                                <div className='invalid-feedback'>
                                    {this.state.errorName}
                                </div>
                            </div>
        
                            <div className="form-group-phone form-row">
                                <label htmlFor="bookingPhone">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${this.state.errorPhone ? 'is-invalid' : ''}`}
                                    name="bookingPhone"
                                    value={this.state.bookingPhone}
                                    onChange={this.handlePhoneChange}
                                    onBlur={this.validatePhone}
                                />
                                <div className='invalid-feedback'>
                                    {this.state.errorPhone}
                                </div>
                            </div>
                        

                            <div className="form-group-email form-row">
                                <label htmlFor="bookingEmail">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${this.state.errorEmail ? 'is-invalid' : ''}`}
                                    name="bookingEmail"
                                    value={this.state.bookingEmail}
                                    onChange={this.handleEmailChange}
                                    onBlur={this.validateEmail}
                                />
                                <div className='invalid-feedback'>
                                    {this.state.errorEmail}
                                </div>
                            </div>
                        </div>
                      
                        <div className="gdpr-row">
                            <div className="form-gdpr form-row">
                                <label htmlFor="GDPR">
                                    Accept GDPR's terms
                                </label>
                                <input
                                    type="checkbox"
                                    className={`form-control ${this.state.errorGDPR ? 'is-invalid' : ''}`}
                                    name="GDPR"
                                    checked={this.state.bookingGDPR}
                                    onChange={this.handleGDPRChange}
                                    onBlur={this.validateGDPR}
                                />
                                <div className='gdpr-unchecked'>
                                    {this.state.errorGDPR}
                                </div>
                            </div>
                            <button type="submit" className="btn-create-booking">
                                    Add reservation
                            </button>
                         
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateBooking;