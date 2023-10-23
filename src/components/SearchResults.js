"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from 'react-query';

const fetchPosts = async (url) =>{
    const response = await fetch(url);
        
    
    if (!response.ok) {
        throw new Error("failed to fetch");
    }


        return response.json();
};



const SearchResults = () => {

    const search = useSearchParams();
    const searchQuery = search? search.get("q") : null;
    const {data, isLoading } = useQuery('/api/serach?q=${encodeSearchQuery}',
    fetchPosts  
    
    );

    const encodedSearchQuery = encodeURI(searchQuery || "");

    console.log("SEARCH PARAMS", encodedSearchQuery);

    return <div> SEARCH PAGE </div>;


}

export default SearchResults;
