import { useState } from "react";


export default function PostButtons({id, postId }) {
    const [liked, setLiked] = useState(false);

    async function handleLike() {
        const url = `/api/postOperations/${liked ? 'unlikePost' : 'likePost'}`;
        fetch(url, {
        method: liked ? 'DELETE' : 'POST',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId:id, postId:postId }), // Replace userId: 1 with the actual user ID
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        setLiked(!liked);
      }
    })
    .catch((error) => console.error('Error toggling like:', error));
  };

return(

    <div>
        <button> 
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                ill="none" viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="white" 
                className="w-5 h-5"
                >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" 
                />
            </svg>
        </button>

        <button onClick={handleLike} className={(liked? 'fill-rose-400': '')}> 
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="white" 
                className="w-5 h-5 fill-inherit"
                >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
                />
            </svg>
        </button>

        <button> 
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="white" 
                className="w-5 h-5"
            >
                <path
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" 
                />
            </svg>
        </button>
    </div>

)

};
