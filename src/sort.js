import React from 'react';

const Sort = ({ onChange }) => {
    return (
        <div className="w-full flex justify-center items-center my-6">
            <label className="mr-2 text-lg font-semibold">Sort By : </label>
            <select
                className="w-1/5 px-2 py-1 rounded-md focus:outline-none text-lg"
                onChange={(e) => onChange(e)}
            >
                <option value="">-- Select --</option>
                <option value="id">ID</option>
                <option value="size">Size</option>
                <option value="price">Price</option>
            </select>
        </div>
    );
};

export default Sort;
