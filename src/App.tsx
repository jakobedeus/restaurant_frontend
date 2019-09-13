import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import About from "./components/About/About";
import Home from './components/Home/Home';
import Booking from './components/Booking/Booking';
import Admin from './components/Admin/Admin';
import Navbar from './components/Navbar/Navbar';

class App extends React.Component<{}, {}>  {

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path='/About' component={About} />
          <Route path='/Admin' component={Admin} />
          <Route path='/Booking' component={Booking} />
          <Route exact path='/' component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}


export default App;
