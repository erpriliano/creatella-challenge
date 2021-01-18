import React, { useEffect, useState } from 'react';

const Home = () => {
    const baseUrl = 'http://localhost:3000';
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        fetch(`${baseUrl}/products`)
            .then((response) => {
                return response.json();
            })
            .then((products) => {
                console.log(products);
                setProducts(products);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="bg-gray-100">
            {/* Header Section */}
            <div className="w-full top-0 inset-x-0 px-6 py-3 z-10 fixed shadow-lg">
                <h1 className="font-bold tracking-wide text-lg">
                    Products Grid
                </h1>
            </div>
            {/* End of Header Section */}

            <div className="w-full px-6 pt-16 mb-8 leading-relaxed">
                <p className="text-base">
                    Here you're sure to find a bargain on some of the finest
                    ascii available to purchase. Be sure to peruse our selection
                    of ascii faces in an exciting range of sizes and prices.
                </p>
                <p className="text-base font-semibold">
                    But first, a word from our sponsors:
                </p>
            </div>

            {/* Ads section */}
            <div className="w-full my-8 flex justify-center">
                <img
                    className="h-48 object-fill bg-no-repeat"
                    src={`${baseUrl}/ads/?r=${Math.floor(
                        Math.random() * 1000
                    )}`}
                />
            </div>
            {/* End of ads section */}

            {products.map((product) => (
                <p>{product.id}</p>
            ))}
        </div>
    );
};

export default Home;
