import React from 'react';
import DashboardButton from '../utills/DashboardButton';

const NewArrival = () => {
    return (
        <div className='p-4'>
            <p className='font-medium text-xl'>New Arrival Dashboard</p>
            <DashboardButton add='/newadd' edit="/newedit" remove="/newdelete" />
        </div>
    );
};

export default NewArrival;