import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Admin from './Admin';
import IAdminState from "./Admin";

configure({ adapter: new Adapter() });

let mockData = [{
    CustomerID: 32,
    Guests: 4,
    Date: "2019-08-13",
    Time: "21:00",
    Name: "test",
    Email: "jafha@gmail.com",
    Phone: 12879382937,
    ReservationID: 4,
    isInEditMode: false
}]


it("fetches data and updates state", async () => {
    const wrapper = shallow<Admin, {}, IAdminState>(<Admin />);
    expect(wrapper.state("reservations")).toEqual([]);
  
    wrapper.instance().setState({
      reservations: mockData
    }, () => {
        expect(wrapper.instance().state.reservations[0].ReservationID).toBe(4);
    });
  
    
  });