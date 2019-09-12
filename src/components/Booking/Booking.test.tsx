import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Booking from './Booking';
import CreateBooking, { ICreateBookingState } from './CreateBooking/CreateBooking';

configure({ adapter: new Adapter() });

let mockData = [{
  CustomerID: "32",
  Guests: "4",
  Date: "2019-08-13",
  Time: "21:00:00",
  Name: "test",
  Email: "jafha@gmail.com",
  Phone: "0723423340",
  ReservationID: "4",
  isInEditMode: false
}]

it('should render correctly with no props', () => {
  const component = shallow(<Booking />);

  expect(component.instance()).not.toBe(null);
});

describe('Test Button component', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn();
    const button = shallow((<button onClick={mockCallBack}>Ok!</button>));
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});

it("change state of gpdr", async () => {
  const handleCreateBooking = jest.fn();
  const handleCreateBookingChange = jest.fn();
  const wrapper = shallow<CreateBooking, {}, ICreateBookingState>(
    <CreateBooking
      bookingDate={mockData[0].Date}
      bookingGuests={mockData[0].Guests}
      bookingTime={mockData[0].Time}
      handleCreateBooking={handleCreateBooking}
      handleCreateBookingChange={handleCreateBookingChange}
    />);

  expect(wrapper.state().bookingGDPR).toBe(false);
  wrapper.instance().setState({
    bookingGDPR: true
  }, () => {
    expect(wrapper.instance().state.bookingGDPR).toBe(true);
  });


});