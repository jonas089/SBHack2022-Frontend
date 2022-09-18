import { React, useState, useEffect } from 'react';

import './App.css';
//****************************** */
// Imports of the components
//****************************** */
import { 
  HeaderNavbar, 
  NFTicket,
  UserInfo, 
  Flights,
  Mint} from './components';
// the imports for the Routing 
import { Route, Routes } from "react-router-dom";
//****************************** */
// Imports of services
//****************************** */
import { prepareCSPRDeploy }  from './services/casper/casper.service';

function App() {
  //****************************** */
  // The state management of the app
  //****************************** */ 

  // default values for the main navigation
  const[flights, setFlights] = useState(false);
  const[calendar, setCalendar] = useState(false);
  const[tickets, setTickets] = useState(false);

  // the main metadata for the whole application
  const[consolidatedMetadata, setConsolidatedMetadata] = useState({
    // the part from the ticket
    airportFrom: "",
    airportFromDescription: "",
    airportTo: "",
    airportToDescription: "",
    type: "",
    departure: "",
    return: "",
    price: "",
    curr: "",
    // the part from the user
    visaLink: "",
    covidLink: "",
    documentLink: "",
    firstName: "",
    surname: "",
    email: "",
    country: "",
    street: "",
    city: ""
  })

  const[initialTicketMetadata,setInitialTicketMetadata] = useState({
    // the part from the ticket
    airportFrom: "",
    airportFromDescription: "",
    airportTo: "",
    airportToDescription: "",
    type: "",
    departure: "",
    return: "",
    price: "",
    curr: "",
  })

  //****************************** */
  // The use effect so the initial state
  //****************************** */ 
  useEffect(() => {
    // the use effect will be calle only once on load
    // checks like signer will be performed
    const onLoad = async () => {
      // test variable
      setUserData('System is working!')
      // the metadata has been set
      console.log("Metadata has been initialized!")
      setInitialTicketMetadata({
        // the part from the ticket
        airportFrom: "",
        airportFromDescription: "",
        airportTo: "",
        airportToDescription: "",
        type: "",
        departure: "",
        return: "",
        price: "",
        curr: "",
      })
      console.log("initial ticket metadata is:")
      console.log(initialTicketMetadata)
    }
    onLoad()
  }, [])
  
  //****************************** */
  // The functions
  //****************************** */
  const setUserData = async (user) => {
    console.log(user);
  }

  //****************************** */
  // placeholder function for the service
  //****************************** */
  const callCSPR = async () => {
    // call the service to get the response
    await prepareCSPRDeploy("123","234")
  }

  //****************************** */
  // set the buttons after the button click
  // and change the route
  //****************************** */
  const changeRouteWithName = async (name) => {
    console.log(name);

    // break after each statement for exclusive selection
    switch(name){
      case 'Flights':
        setFlights(true);
        setCalendar(false);
        setTickets(false);
        break;
      case 'Calendar':
        setFlights(false);
        setCalendar(true);
        setTickets(false);
        break;
      case 'NFTickets':
        setFlights(false);
        setCalendar(false);
        setTickets(true);
        break;
    }
  }

  //********************************** */
  // The function for setting metadata
  //********************************** */

  // ticket metadata
  const setTicketMetadata = (ticketMetadata) =>{
    // log ticket metadata
    console.log("Main Component Ticket Metadata:")
    console.log(ticketMetadata);
    // consolidate the ticket metadata
    setConsolidatedMetadata({
      // the part from the ticket
      airportFrom: ticketMetadata.airportFrom,
      airportFromDescription: ticketMetadata.airportFromDescription,
      airportTo: ticketMetadata.airportTo,
      airportToDescription: ticketMetadata.airportToDescription,
      type: ticketMetadata.type,
      departure: ticketMetadata.departure,
      return: ticketMetadata.return,
      price: ticketMetadata.price,
      curr: ticketMetadata.curr,
    })
  }
  
  // user metadata
  const setUserMetadata = (userMetadata) => {
    // log user metadata
    console.log("Main Component User Metadata:")
    console.log(userMetadata);
    // consolidate the user metadata
    setConsolidatedMetadata({
      // rewrite the ticket metadata
      airportFrom: consolidatedMetadata.airportFrom,
      airportFromDescription: consolidatedMetadata.airportFromDescription,
      airportTo: consolidatedMetadata.airportTo,
      airportToDescription: consolidatedMetadata.airportToDescription,
      type: consolidatedMetadata.type,
      departure: consolidatedMetadata.departure,
      return: consolidatedMetadata.return,
      price: consolidatedMetadata.price,
      curr: consolidatedMetadata.curr,
      // the part from the user
      visaLink: userMetadata.visaLink,
      covidLink: userMetadata.covidLink,
      documentLink: userMetadata.documentLink,
      firstName: userMetadata.firstName,
      surname: userMetadata.surname,
      email: userMetadata.email,
      country: userMetadata.country,
      street: userMetadata.street,
      city: userMetadata.city 
    })
  }

  // Return of all the components 
  return (
    <div>
      <HeaderNavbar
      changeRoute={(name) => changeRouteWithName(name)}
      flightsButton={flights}
      calendarButton={calendar}
      ticketsButton={tickets}
      />
      {/* Pass all the routes to display different screens*/}
      <Routes>
        <Route path="/flights" element={<Flights 
            setTicketMetadata={(ticketMetadata) => setTicketMetadata(ticketMetadata)}
            ticketMetadata={initialTicketMetadata}
            />} />
        <Route path="/tickets" element={<NFTicket/>}/>
        <Route path="/userData" element={<UserInfo setUserMetadata={(userMetadata) => setUserMetadata(userMetadata)}/>} />
        <Route path="/mint" element={<Mint metadata={consolidatedMetadata}/>} />
      </Routes>

    </div>
  );
}

export default App;
