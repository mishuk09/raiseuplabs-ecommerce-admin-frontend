import React from 'react';
import DashboardButton from '../utills/DashboardButton';

const Category = () => {
    return (
        <div className='p-4'>
            <p className='font-medium text-xl'>Category Dashboard</p>
            <DashboardButton add='/cateadd' edit="/cateedit" remove="/catedelete" />
        </div>
    );
};

export default Category;