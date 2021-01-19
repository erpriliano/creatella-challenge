import React, { useEffect, useState } from 'react';
import ProductCard from './product-card';

const Home = () => {
    const baseUrl = 'http://localhost:3000';

    const [selected, setSelected] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadData(selected);
    }, [selected]);

    const loadData = (selected) => {
        fetch(`${baseUrl}/products?_sort=${selected}`)
            .then((response) => {
                return response.json();
            })
            .then((products) => {
                setProducts(products);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header Section */}
            <div className="w-full bg-white top-0 inset-x-0 px-6 py-3 z-10 fixed shadow-lg">
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

            {console.log('Product length: ', products.length)}

            {products.length === 0 ? (
                <div className="spinner"></div>
            ) : (
                <>
                    {/* Sort section */}
                    <div className="w-full flex justify-center items-center my-6">
                        <label className="mr-2 text-lg font-semibold">
                            Sort By :{' '}
                        </label>
                        <select
                            className="w-1/5 px-2 py-1 rounded-md focus:outline-none text-lg"
                            onChange={(e) => setSelected(e.target.value)}
                        >
                            <option value="">-- Select --</option>
                            <option value="id">ID</option>
                            <option value="size">Size</option>
                            <option value="price">Price</option>
                        </select>
                    </div>
                    {/* End of sort section */}

                    {/* Products display section */}
                    <div className="w-full grid grid-cols-3 gap-4 p-6 py-2">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product.face}
                                size={product.size}
                                price={product.price}
                                date={product.date}
                            />
                        ))}
                    </div>
                    {/* End of Product display section */}
                </>
            )}
        </div>
    );
};

export default Home;
