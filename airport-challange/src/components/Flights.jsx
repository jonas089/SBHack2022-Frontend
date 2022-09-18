import React from 'react'
import { useState } from 'react';

import '../css/Flights.css';

// the images
import swissFlights from '../images/swiss-flights.jpg';

// import the icons from react icons
import { IoIosAirplane } from 'react-icons/io';
import { FaHotel } from 'react-icons/fa'
import { FaCar } from 'react-icons/fa'
import { MdHotel } from 'react-icons/md'

// import the data models
import flightPriceTable from '../models/flightOverview';
import flightTickets from '../models/flightTicketMetadata';

// import of the components 
import FlightDetails from './FlightDetails';
import SingleFlightEntry from './SingleFlightEntry';

const Flights = (props) => {

const[index,setIndex] = useState(undefined);
const[elementActive,setElementActive] = useState(false);
// the metadata of the NFT consolidated with the user information
const[ticketMetadata,setTicketMetadata] = useState({
    // the part from the ticket
    airportFrom: "",
    airportFromDescription: "",
    airportTo: "",
    airportToDescription: "",
    type: "",
    departure: "",
    return: "",
    price: "",
    curr: ""
})
// set the clicked ticket as active and get the properties
// for the ticket from another table
const setTicket = (id) => {
    // log the id of the entry
    console.log(id)
    setIndex(id);
    // get the values from the map accoring to the
    // selected id of the ticket
    const flightTicket = flightTickets.find(entry => entry.id === id )
    // log the values
    console.log(flightTicket)

    setTicketMetadata({
        airportFrom: flightTicket.airportFrom,
        airportFromDescription: flightTicket.airportFromDescription,
        airportTo: flightTicket.airportTo,
        airportToDescription: flightTicket.airportToDescription,
        type: flightTicket.type,
        departure: flightTicket.departure,
        return: flightTicket.return,
        price: flightTicket.price,
        curr: flightTicket.curr
    })
}

// return true or fals depending if the entry was selected
const getTicketSelected = (id) => {
    console.log(id)
    if(id = index){
        setElementActive(true);
    } else{
        setElementActive(false);
    }
}

  return (
    <div className='flightsContainer'>
        <div className='flightsSelection' style={{ backgroundImage:`url(${swissFlights})` }}>
            {/* The tabs for the selection */}
            <div className='selectionTabs'>
                <div className='tabActive'>
                    <div className='tabIcon'>
                        <IoIosAirplane size={14}/>
                    </div>
                    <div className='tabText'>
                        Flights
                    </div>
                </div>
                <div className='tabInactive'>
                    <div className='tabIconInactive'>
                            <MdHotel size={14}/>
                        </div>
                        <div className='tabTextInactive'>
                            Flight & Hotel
                        </div>
                    </div>
                <div className='tabInactive'>
                    <div className='tabIconInactive'>
                            <FaCar size={14}/>
                        </div>
                        <div className='tabTextInactive'>
                            Car rental
                        </div>
                    </div>
                <div className='tabInactive'>
                    <div className='tabIconInactive'>
                            <FaHotel size={14}/>
                        </div>
                        <div className='tabTextInactive'>
                            Hotel
                        </div>
                </div>
            </div>
            {/* */}
            <div className='selectionContainer'>
                <div className='flightContainer'>
                    {flightPriceTable.map((item) => (
                        // the key is the part of the div element
                        <SingleFlightEntry
                            key={item.day} 
                            day={item.day}
                            price={item.price}
                            curr={item.curr}
                            setTicket={(id) => setTicket(id)}
                        />
                    )
                    )}
                </div>
                {/* The separate component for the flight Details*/}
                <div className='flightDetailsContainer'>
                    <FlightDetails
                    setTicketMetadata={(ticketMetadata) => props.setTicketMetadata(ticketMetadata)}
                    ticketMetadata={ticketMetadata}/>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Flights