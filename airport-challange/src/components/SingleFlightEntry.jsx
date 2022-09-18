import React from 'react'
import { useState } from 'react';

const SingleFlightEntry = (props) => {

    const [isActive, setIsActive] = useState(false);

    const handleClick = (id) => {
    console.log(id)

    setIsActive(current => !current);
    // pass the values to the 
    props.setTicket(id);
  };

return (
    
    <div 
    className = {isActive ? 'singleFlightEntryActive' : 'singleFlightEntry'} 
    onClick={() => handleClick(props.day)}>
    
    <div className= {isActive ? 'dayOfMonthActive':'dayOfMonth'}>
        {props.day}
    </div>
        <div className= 'priceContainer'>
            <div className={ isActive ? 'flightPriceActive' : 'flightPrice'}>
                {props.price}
            </div>
            <div className={isActive ? 'flightCurrencyActive' : 'flightCurrency'}>
                {props.curr}
            </div>
        </div>
    </div>
  )
}

export default SingleFlightEntry