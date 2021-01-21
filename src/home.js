import React, { useEffect, useState, useRef } from 'react';
import ProductCard from './product-card';

const Home = () => {
    const baseUrl = 'http://localhost:3000';
    const [sortBy, setSortBy] = useState(null);
    const [pagination, setPagination] = useState({
        data: [],
        page: 1,
        limit: 20,
        isLoading: false
    });
    const paginationRef = useRef({});
    paginationRef.current = pagination;

    const sortRef = useRef({});
    sortRef.current = sortBy;

    useEffect(() => {
        loadData(sortRef.current);
    }, [sortRef.current]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const loadData = (selectedSortBy) => {
        fetch(
            `${baseUrl}/products?_sort=${selectedSortBy}&_page=${pagination.page}&_limit=${pagination.limit}`
        )
            .then((response) => {
                return response.json();
            })
            .then((products) => {
                setPagination({
                    ...paginationRef.current,
                    data: products
                });
            })
            .catch((error) => console.log(error));
    };

    const loadMoreData = (selectedSortBy, page) => {
        setPagination({ ...paginationRef.current, isLoading: true });
        fetch(
            `${baseUrl}/products?_sort=${selectedSortBy}&_page=${page}&_limit=${pagination.limit}`
        )
            .then((response) => {
                return response.json();
            })
            .then((products) => {
                setPagination({
                    ...paginationRef.current,
                    data: paginationRef.current.data.concat(products),
                    page: page,
                    isLoading: false
                });
            })
            .catch((error) => console.log(error));
    };

    const handleScroll = () => {
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;
        const scrollHeight =
            (document.documentElement &&
                document.documentElement.scrollHeight) ||
            document.body.scrollHeight;

        if (
            scrollTop + window.innerHeight >= scrollHeight &&
            !paginationRef.current.isLoading
        ) {
            loadMoreData(sortRef.current, paginationRef.current.page + 1);
        }
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

            {/* Select sort by section */}
            <div className="w-full flex justify-center items-center my-6">
                <label className="mr-2 text-lg font-semibold">Sort By : </label>
                <select
                    className="w-1/5 px-2 py-1 rounded-md focus:outline-none text-lg"
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">-- Select --</option>
                    <option value="id">ID</option>
                    <option value="size">Size</option>
                    <option value="price">Price</option>
                </select>
            </div>
            {/* End of select sort by section */}

            {/* Display products */}
            <div className="w-full grid grid-cols-4 gap-4 p-6 py-2">
                {pagination.data.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product.face}
                        size={product.size}
                        price={product.price}
                        date={product.date}
                    />
                ))}
            </div>
            {pagination.isLoading ? (
                <div className="bg-gray-100 h-32">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>{null}</>
            )}
            {/* End of display products */}
        </div>
    );
};

export default Home;
