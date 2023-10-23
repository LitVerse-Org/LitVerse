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
        <form onSubmit={onSearch} className="flex justify-center w-3/4">
            <input 
                type = "text"
                value={searchQuery || ""}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="px-3 py-2sm:px-4 sm:py-3 flex text-zinc-200 bg-zinc-800 focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-purple-700 placeholder:text-zinc-400  w-full"
                placeholder="curiouser and curiouser..."
            />
        </form>
    );
};

export default SearchInput;
