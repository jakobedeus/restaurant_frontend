import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Booking from './Booking';

configure({ adapter: new Adapter() });

it('should render correctly with no props', () => {
    const component = shallow(<Booking/>);

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