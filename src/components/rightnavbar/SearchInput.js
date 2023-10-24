'use client'

import { useRouter } from 'next/router';
import React, { useState } from 'react';


const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const router = useRouter();

    const onSearch = (event) => {
        event.preventDefault();

        const encodedSearchQuery = encodeURI(searchQuery);
        router.push(` /search?q=${encodedSearchQuery}`);
        console.log("current query", encodedSearchQuery)
    };

    return (
        <form onSubmit={onSearch} className="relative w-3/4">
            <input 
                type = "text"
                value={searchQuery || ""}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="px-3 py-2sm:px-4 sm:py-3 flex text-zinc-200 bg-white focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-purple-700 placeholder:text-zinc-400  w-full"
                placeholder="curiouser and curiouser..."
                
            />
            <button type="submit" className="absolute right-0 top-1 mt-3 mr-4">
                <svg 
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 

                >
                    <path 
                        fillRule="evenodd" 
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" 
                        clipRule="evenodd" 
                    />
                </svg>

            </button>
        </form>
    );
};

export default SearchInput;
