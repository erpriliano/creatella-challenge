import React from 'react';

const Ads = ({ url }) => {
    const random = Math.floor(Math.random() * 1000);

    return (
        <img
            className="mx-auto object-fill bg-no-repeat"
            alt="ads-img"
            src={`${url}/ads/?r=${random}`}
        />
    );
};

export default Ads;
