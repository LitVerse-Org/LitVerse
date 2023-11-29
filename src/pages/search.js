"use client"
import { React, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import{ useQueries } from 'react-query';
import Link from 'next/link';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import Layout from "../components/Layout";
import DisplayPost from "../components/ViewPost/DisplayPost"

const SearchResults = () => {
  const search = useSearchParams();
  const searchQuery = search? search.get("query"): null;
  const encodedSearchQuery = encodeURI(searchQuery || "");
  const [activeTab, setActiveTab]   = useState(1);


  const fetchUsers = async () => {

    const response = await fetch (`/api/userOperations/searchUsers?query=${encodedSearchQuery}`)

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
      return response.json();
  }

  const fetchPosts = async () => {

    const response = await fetch(`/api/postOperations/searchPosts?query=${encodedSearchQuery}`)

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
      return response.json();
  }

  const [usersQuery, postsQuery]  = useQueries(
    [
      {
        queryKey: ['users', encodedSearchQuery],
        queryFn: fetchUsers,

        refetchOnWindowFocus: false,
      

     },

    {
        queryKey: ['posts', encodedSearchQuery],
        queryFn: fetchPosts,

        refetchOnWindowFocus: false,
     
    },

  ],
);

    if (postsQuery.isLoading || usersQuery.isLoading) {
      return 'Loading...';
    }

    if (postsQuery.error || usersQuery.error){
      return 'An error has occurred: ' + error.message;
    }


  /*if (isLoading) {
      return <p className="text-zinc-300">Loading... Searching for "{searchQuery}"</p>;
    }
    
  
    if (error) {
      return <p className="text-zinc-300">Error fetching data </p>;
    }*/
    
    /*const data = results.reduce((accumulator, result) => {
      if (results.data) {
        accumulator[result.queryKey] = result.data;
      }
      return accumulator;
    }, {});*/

  console.log("SEARCH PARAMS", encodedSearchQuery);

  return (
      <Layout>
        
         <Tabs selectedIndex={activeTab-1} onSelect={(index) => setActiveTab(index + 1)} selectedTabClassName="underline md:underline-offset-2" >
           <TabList className="my-2 flex">
           
              <Tab
                onClick={() => {
                  setActiveTab (1);
                }}
                className="text-zinc-100 cursor-pointer py-3 px-6 hover:bg-slate-500 hover:opacity-70 hover:text-zinc-100 hover:rounded-md"
              >
                Posts
               
              </Tab>
             
              <Tab
                onClick={() => {
                  setActiveTab(2);
                }}
                className="text-zinc-100 cursor-pointer py-3 px-6 hover:bg-slate-500 hover:opacity-70 hover:text-zinc-100 hover:rounded-md" 
              >
                Creators
               
              </Tab>
            </TabList> 
    
                    <TabPanel>
            
                         {postsQuery.data?.map((post) => {
                              return (
                                 <div className="text-zinc-100" style={{ display: 'flex' }}>
                                    <DisplayPost key={post.id} post={post}/>
                                 </div>
                               );
                           })}
                  </TabPanel>
               
                  <TabPanel>
                     
                     {usersQuery.data?.length === 0 ? (
                          <p className="text-zinc-100">No users found</p>
                          ) : (
                          usersQuery.data?.map((user) => (
                            <div className="text-zinc-100" key={user.id} style={{ display: 'flex' }}>
                              <span>{user.id}-&nbsp;</span>
                              <div>{user.username}</div>
                            </div>
                            ))
                          )}
                 </TabPanel>
           
            </Tabs>
       
   </Layout>
    );
  };
 

export default SearchResults;
