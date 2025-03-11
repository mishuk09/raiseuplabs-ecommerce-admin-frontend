import React from 'react';
import DashboardButton from '../utills/DashboardButton';

const Offfer = () => {
    return (
        <div className='p-4'>
            <p className='font-medium text-xl'>Offer Dashboard</p>
            <DashboardButton add='/addoffer' edit="/editoffer" remove="/deleteoffer" />
        </div>
    );
};

export default Offfer;