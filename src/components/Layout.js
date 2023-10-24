import SearchInput from "./rightnavbar/SearchInput";
import Sidebar from "./Sidebar/Index";

export default function Layout({children}) {
  return (
    <div className="grid grid-cols-12 max-w-screen mx-auto min-h-screen">
    <div className="col-span-3 bg-black-200 h-full pr-3 text-zinc">
      <Sidebar/>
      </div>
    
    <div className="col-span-6 bg-gray-200 h-full p-2 h-screen border-l border-r rl-stripe-bg">{children}</div>

    
    
    <div className="col-span-3 bg-black-800 h-full pl-3 text-zinc">
      <SearchInput />
    </div>
 
  </div>
  );
}
