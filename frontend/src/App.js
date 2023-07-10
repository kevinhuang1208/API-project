// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsAll from "./components/Spots/SpotsAll";
import SpotById from "./components/Spots/SpotById";
import CreateSpot from "./components/Spots/CreateSpot";
import ManageSpot from "./components/Spots/ManageSpot";
import EditSpot from "./components/Spots/EditSpot";
import ManageBookings from "./components/Bookings/ManageBookings";
import CreateBooking from "./components/Bookings/CreateBooking";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path="/" component={SpotsAll}>

          </Route>
          <Route path='/spots/new' component={CreateSpot}>

          </Route>
          <Route path='/spots/current' component={ManageSpot}>

          </Route>
          <Route path='/bookings/current' component={ManageBookings}>

          </Route>
          <Route exact path='/spots/:spotId/edit' component={EditSpot}>

          </Route>
          <Route exact path='/spots/:spotId' component={SpotById}>

          </Route>
        </Switch>}
    </>
  );
}

export default App;
