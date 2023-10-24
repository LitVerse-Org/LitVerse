import SearchInput from "./rightnavbar/SearchInput";



export default function Layout({children}) {
  return (
  
    <div className="grid grid-cols-12 max-w-screen mx-auto min-h-screen">
  
    <div className="col-span-3 bg-black-200 h-full pr-3 text-zinc">
          <img
          src="/white_logo_dark_background.png"
          alt="Logo"
          className="absolute top-0 w-1/5"
          style={{left: '0rem' }}
        />  
          
      </div>
    <div className="col-span-5 bg-gray-200 h-full p-2 h-screen border-l border-r rl-stripe-bg">{children}</div>
    
    
    <div className="col-span-4 bg-black-800 h-full pl-3 text-zinc">
       <div><SearchInput /></div>
    </div>
 
  </div>
  );
}
