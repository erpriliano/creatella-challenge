import React from 'react';

const Header = () => {
    return (
        <>
            <div className="w-full bg-white top-0 inset-x-0 px-6 py-4 z-10 fixed shadow-lg">
                <h1 className="font-bold tracking-wide text-xl">
                    Products Grid
                </h1>
            </div>
            <div className="w-full px-6 pt-20 mb-8 leading-relaxed">
                <p className="text-base">
                    Here you're sure to find a bargain on some of the finest
                    ascii available to purchase. Be sure to peruse our selection
                    of ascii faces in an exciting range of sizes and prices.
                </p>
                <p className="text-base font-semibold">
                    But first, a word from our sponsors:
                </p>
            </div>
        </>
    );
};

export default Header;
