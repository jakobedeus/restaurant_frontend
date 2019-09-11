import React from "react";
import './scss/ListBookings.scss';
import { FaTrashAlt } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';

interface IListBookingProps {
    reservationProps: IListBookingDetails[],
    removeReservation(index: number): void,
    submitBooking(dataToBeEdited: IListBookingDetails): void,
    editReservationProps: boolean,
}

export interface IListBookingDetails {
    Date: string,
    Time: number,
    Guests: number,
    Name: string,
    Phone: number,
    Email: string,
    ReservationID: number,
    CustomerID: number,
    isInEditMode: boolean;
}

interface IListBookingState {
    reservationsState: IListBookingDetails[]
}

class ListBookings extends React.Component<IListBookingProps, IListBookingState>  {

    constructor(props: any) {
        super(props);

        this.state = {
            reservationsState: []
        }

        this.handleEditNameChange = this.handleEditNameChange.bind(this);
        this.handleEditDateChange = this.handleEditDateChange.bind(this);
        this.handleEditTimeChange = this.handleEditTimeChange.bind(this);
        this.handleEditEmailChange = this.handleEditEmailChange.bind(this);
        this.handleEditGuestChange = this.handleEditGuestChange.bind(this);
        this.handleEditPhoneChange = this.handleEditPhoneChange.bind(this);
    }

    handleRemoveReservation(ReservationIDToRemove: number) {
        this.props.removeReservation(ReservationIDToRemove)
    }

    handleEditReservation(index: number){
        let reservations = this.state.reservationsState;
        reservations[index].isInEditMode = true;
        this.setState({ reservationsState: reservations });
    }

    handleEditNameChange(e: any) {
        // Sets value of property in state to e.target.value through tabindex, index is used from the loop.
        const target = e.target;
        const value = target.value;
        // Make a copy of state to modify
        let reservations = this.state.reservationsState;
        reservations[target.tabIndex].Name = value;

        // Set state to modified state
        this.setState({
            reservationsState: reservations
        });
    }

    handleEditDateChange(e: any) {
        const target = e.target;
        const value = target.value;
        let reservations = this.state.reservationsState;
        reservations[target.tabIndex].Date = value;

        this.setState({
            reservationsState: reservations
        });
    }

    handleEditPhoneChange(e: any) {
        const target = e.target;
        const value = target.value;
        let reservations = this.state.reservationsState;
        reservations[target.tabIndex].Phone = value;

        this.setState({
            reservationsState: reservations
        });
    }

    handleEditEmailChange(e: any) {
        const target = e.target;
        const value = target.value;
        let reservations = this.state.reservationsState;
        reservations[target.tabIndex].Email = value;

        this.setState({
            reservationsState: reservations
        });
    }

    handleEditTimeChange(e: any) {
        const target = e.target;
        const value = target.value;
        let reservations = this.state.reservationsState;
        reservations[target.tabIndex].Time = value;

        this.setState({
            reservationsState: reservations
        });
    }

    handleEditGuestChange(e: any) {
        const target = e.target;
        const value = target.value;
        let reservations = this.state.reservationsState;
        reservations[target.tabIndex].Guests = value;

        this.setState({
            reservationsState: reservations
        });
    }

    submitEditBooking(dataToBeEdited: IListBookingDetails) {
        // Send all the data to be edited to props and to parent component which runs SQL update query 
        this.props.submitBooking(dataToBeEdited);
    }

    // Update state with props 
    componentDidUpdate(prevProps: any) {
        if (this.props.reservationProps != null && prevProps.reservationProps !== this.props.reservationProps) {
            this.setState({
                reservationsState: this.props.reservationProps
            });
        }
    }

    render() {

        let reservationListPresentation: any[] = [];

        for (let index = 0; index < this.state.reservationsState.length; index++) {

            if (!this.state.reservationsState[index].isInEditMode) {
                reservationListPresentation.push(
                    <li key={index}>
                        <p className="reservationNameAdmin">{this.state.reservationsState[index].Name}</p>
                        <div className="reservationInfoContainer">
                            <div>
                                <p><label htmlFor="Email">EMAIL: </label><b>{this.state.reservationsState[index].Email}</b></p>
                                <p><label htmlFor="Phone">PHONE: </label><b>{this.state.reservationsState[index].Phone}</b></p>
                            </div>
                            <div>
                                <p>WHEN: <b>{this.state.reservationsState[index].Date}</b> at <b>{this.state.reservationsState[index].Time}</b></p>
                                <p>NUMBER OF PEOPLE: <b>{this.state.reservationsState[index].Guests}</b></p>
                            </div>
                            <div>
                                <button onClick={this.handleRemoveReservation.bind(this, this.state.reservationsState[index].ReservationID)} className="removeBtn" ><FaTrashAlt /></button>
                                <button
                                    onClick={this.handleEditReservation.bind(this, index)
                                    } className="editBtn"><FaPen /></button>
                            </div>
                        </div>

                    </li>
                )
            }
            else {
                reservationListPresentation.push(
                    <li key={index}>
                        <form onSubmit={this.submitEditBooking.bind(this, this.state.reservationsState[index])}>
                            <div>
                                {/* Set value of all input fields to local state, local state is set by props from state in parent component */}
                                <p><label htmlFor="Name">Name:</label><input type="text" name="Name" tabIndex={index} id="Name" value={this.state.reservationsState[index].Name} onChange={this.handleEditNameChange} /></p>
                                <p><label htmlFor="Email">Email:</label><input type="text" name="Email" tabIndex={index} id="Email" value={this.state.reservationsState[index].Email} onChange={this.handleEditEmailChange} /></p>
                                <p><label htmlFor="Phone">Phone:</label><input type="text" name="Phone" tabIndex={index} id="Phone" value={this.state.reservationsState[index].Phone} onChange={this.handleEditPhoneChange} /></p>
                            </div>
                            <div>
                                <p><label htmlFor="Date">Date:</label><input type="date" name="Date" tabIndex={index} id="Date" value={this.state.reservationsState[index].Date} onChange={this.handleEditDateChange} /></p>
                                <p><label htmlFor="Time">Time:</label><select name="Time" id="Time" value={this.state.reservationsState[index].Time} tabIndex={index} onChange={this.handleEditTimeChange}>
                                    <option value="18">18</option>
                                    <option value="21">21</option>
                                </select>
                                </p>


                                <p><label htmlFor="Guests">Guests:</label><select name="Guests" id="Guests" tabIndex={index} value={this.state.reservationsState[index].Guests} onChange={this.handleEditGuestChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                                </p>
                            </div>
                            <div>
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </li>
                )
            }
        }

        let output = reservationListPresentation;

        return (
            <div className="reservationContainer">
                <p className="numberOfReservations">NUMBER OF RESERVATIONS: <b>{this.state.reservationsState.length}</b></p>
                <ul>
                    {output}
                </ul>
            </div>
        )
    }
}

export default ListBookings;