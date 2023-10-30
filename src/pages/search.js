"use client";

import { useRouter, useSearchParams } from "next/navigation";
import{ useQuery } from 'react-query';
import Layout from '../components/Layout';

const fetchUsers = async () =>{
  const response = await fetch.get(`/api/search?q=${encodeURIComponent(query)}`);

  
  if (!response.ok) {
      throw new Error("failed to fetch");
  }


      return response.json();
};

const SearchResults = () => {

    const search = useSearchParams();
    const searchQuery = search? search.get("q") : null;
    const encodedSearchQuery = encodeURI(searchQuery || "");
    const router = useRouter();
    const {data, isLoading } = useQuery("Users",
    fetchUsers 
    
  );


    if(isLoading)

      return <p className="text-zinc"> Loading...</p>;


    console.log("SEARCH PARAMS", encodedSearchQuery);

    return(
        <Layout>
        <div>
          <h2 className= "text-zinc-100">Users</h2>
          <ul>
            {data?.users?.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      </Layout>
    );  

}

export default SearchResults;
