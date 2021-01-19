import React from 'react';

const priceFormat = (priceVal) => {
    var price = priceVal.toString();
    var dollars = price.slice(0, 1);
    var cents = price.substr(1, price.length);

    if (price.length === 1) {
        var convert = `$0.${dollars}0`;
        return convert;
    } else if (price.length === 2) {
        var convert = `$${dollars}.${cents}0`;
        return convert;
    } else {
        var convert = `${dollars}.${cents}`;
        return convert;
    }
};

const dateFormat = (date) => {
    var currDate = new Date();
    var date = new Date(date);

    var days = currDate.getDate() - date.getDate();

    if (days < 7) {
        return `Added ${days} days ago`;
    } else {
        return `Added on ${date.toDateString()}`;
    }
};

const ProductCard = ({ product, size, price, date }) => {
    return (
        <div className="bg-white p-3 flex flex-col justify-between overflow-hidden shadow-md rounded-md transition-all hover:shadow-2xl duration-500">
            <h1
                style={{ fontSize: size }}
                className="w-full py-2 flex justify-center"
            >
                {product}
            </h1>
            <div className="mt-4">
                <p className="text-gray-400 text-sm">Size: {size}</p>
                <p className="font-bold text-2xl tracking-wide">
                    {priceFormat(price)}
                </p>
                <p className="text-gray-400 text-sm italic">
                    {dateFormat(date)}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
