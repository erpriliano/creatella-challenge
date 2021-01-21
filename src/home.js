import React, { useEffect, useState, useRef } from 'react';
import Header from './header';
import ProductCard from './product-card';
import Sort from './sort';
import Ads from './ads';

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
    }, [sortRef.current]);

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

    //Product data map to display ProductCard component
    const renderProducts = pagination.data.map((product) => (
        <ProductCard
            key={product.id}
            product={product.face}
            size={product.size}
            price={product.price}
            date={product.date}
        />
    ));

    var renderAds = [];
    for (var i = 0; i < renderProducts.length; i++) {
        renderAds.push(renderProducts[i]);
        if (i % 20 === 19) {
            renderAds.push(
                <div className="w-full">
                    <Ads url={baseUrl} />
                </div>
            );
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <Sort onChange={(e) => setSortBy(e.target.value)} />
            {/* Display products */}
            <div className="w-full grid grid-cols-1 gap-4 p-6 py-2">
                {renderAds}
            </div>
            {pagination.isLoading ? (
                <div className="bg-gray-100 h-56">
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
