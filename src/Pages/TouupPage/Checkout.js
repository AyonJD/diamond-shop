import React from 'react';

const Checkout = () => {
    let method = '';
    if (window.location.href.includes('bkash')) {
        method = 'bkash';
    } else if (window.location.href.includes('rocket')) {
        method = 'rocket';
    } else if (window.location.href.includes('nagad')) {
        method = 'nagad';
    }

    console.log(method);
    return (
        <div>

        </div>
    );
};

export default Checkout;