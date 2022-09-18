import React from 'react'
import { Link } from "react-router-dom";

// import the icons from react icons
import { IoIosAirplane } from 'react-icons/io';

const FlightDetails = (props) => {
// the metadata for the ticket
console.log(props.metadata)

  return (
    <div className='flightDetails'>
        {/* Column for the airport from which the flight is made */}
        <div className='airportFrom'>
            {/* the symbol of the airport*/}
            <div className='airportFromSymbol'>
                {props.ticketMetadata.airportFrom}
            </div>
            {/* the description of the airport*/}
            <div className='airportFromDescription'>
                {props.ticketMetadata.airportFromDescription}
            </div>
        </div>
        {/*The icon for the plane */}
        <div className='travelIconContainer'>
            <div>
                <IoIosAirplane size={24}/>
            </div>
        </div>
        {/* Column for the airport from which the flight is made */}
        <div className='airportTo'>
            {/* the symbol of the airport*/}
            <div className='airportToSymbol'>
                {props.ticketMetadata.airportTo}
            </div>
            {/* the description of the airport*/}
            <div className='airportToDescription'>
                {props.ticketMetadata.airportToDescription}
            </div>
        </div>
         {/* Column with the ticket class */}
        <div className='ticketClass'>
            {props.ticketMetadata.type}
        </div>
        {/* Column with the ticket class */}
        <div className='deparrTime'>
            <div>
                {props.ticketMetadata.departure}
            </div>
            <div>
                {props.ticketMetadata.return}
            </div>
        </div>
        {/* Column with the price and the mint button */}
        <div className='priceMint'>
            <div className='priceContainerBuy'>
                <div className='priceContainerRow'>
                    <div className='priceEntry'>
                        Price:
                    </div>
                    <div className='priceEntry'>
                        {props.ticketMetadata.price}
                    </div>
                    <div className='priceEntry'>
                        {props.ticketMetadata.curr}
                    </div>
                </div>
            </div>
            {/* The button for the minting of the NFT*/}
            <div className='buyButtonContainer'>
                <Link to='/userData'style={{ textDecoration: 'none' }}>
                    <div className='mintButton'
                    onClick={() => props.setTicketMetadata(props.ticketMetadata)}>
                        Book now
                    </div>
                </Link>
            </div>
        </div>

    </div>
  )
}

export default FlightDetails