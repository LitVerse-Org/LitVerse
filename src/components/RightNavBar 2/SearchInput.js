"use client"

import { useRouter,  useSearchParams  } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

const SearchInput = () => {  

    /*
        The useSearchParams Hook in React Router invokes the History API
        The browser updates the URL
        The React Router instance running at the root of the application detects changes in the location.search and surfaces a new value for the application
        The code in the application that depends upon this value reacts
    */

    const search = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(search? search.get("query") : "");
    const router = useRouter();
    const [debouncedQuery] = useDebounce(searchQuery, 500);

    console.log(search)

    
    const handleSearch = (e) => { 
         e.preventDefault();


        if (!debouncedQuery){
            return; 
        }
    
        const encodedSearchQuery  = encodeURI(debouncedQuery);
        router.push(`/search?query=${encodedSearchQuery}`);     
 
    }; 


     const handleChange = (e) => {
         setSearchQuery(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key == "Enter"){
            handleSearch(e)
        }
    };

    return (        
        <form onSubmit={handleSearch} className="relative justify-center w-full">
            <input 
                value={searchQuery || ""}
                onChange={handleChange} 
                onKeyDown={handleKeyDown}
                name="Search"
                id="Search"
                className="px-3 py-2 sm:px-4 sm:py-3 flex text-zinc-700 bg-zinc-100 focus:bg-zinc-100 rounded-full border focus:outline-none focus:ring-[1px] focus:ring-purple-700 placeholder:text-zinc-400  w-full"
                placeholder="Curious? Search..."
                
            /> 
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className="w-5 h-5"
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
