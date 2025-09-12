import { ArrowLeft, EllipsisVertical, Search, X } from "lucide-react";
import { useUserStore } from "../store/user-store";
import {useState } from "react";

type ChatHeaderProps = {
  img: string;
  title: string;
  activity: string;
  onlineUsers: number;
  setRoomInfo: (any) => void;
  isRoom?: boolean;
  setSearchMessage: (searchMessage: string) => void;
  searchMessage: string;
};

const ChatHeader = ({ img, title, onlineUsers, setRoomInfo, isRoom, searchMessage, setSearchMessage }: ChatHeaderProps) => {
  const { user } = useUserStore();
  const [isSearch, setIsSearch] = useState(false)
  if (!user) return;


  return (
    <div className="p-3 flex items-center justify-between bg-slate-900 relative">
     <div className={`${isSearch && "!scale-0"} flex gap-2 scale-100 transition-all duration-300`}>
        <span
          onClick={() => setRoomInfo({})}
          className={`${
            isRoom && "block"
          } md:hidden size-10 flex items-center justify-center text-slate-300 hover:bg-slate-700/60 rounded-full cursor-pointer`}
        >
          <ArrowLeft />
        </span>
        <img
          src={img ?? "/placeholder.jpg"}
          alt=""
          className="size-12 rounded-full"
          onError={(event) => (event.currentTarget.src = "/placeholder.jpg")}
        />
        <div className="flex flex-col gap-1 text-sm">
          <p className="font-bold text-slate-100 capitalize">
            {title.split("-")[0] == user.name ? title.split("-")[1] : title.split("-")[0]}
          </p>
          <p className="text-zinc-400">
            {onlineUsers > 1 ? `${onlineUsers - 1} online` : "All users are offline"}
          </p>
        </div>
      </div>
      <form className={`scale-0 ${isSearch && "scale-100"} flex-1 w-[92%] absolute transition-all duration-300`}>
        <input
          type="text"
          value={searchMessage}
          onChange={(e) => setSearchMessage(e.target.value)}
          className="p-1.5 rounded-full w-full peer px-4 mr-4 focus:outline-none bg-slate-800 text-sm placeholder:text-sm text-slate-200 placeholder:text-slate-400"
          placeholder="search message..."
        />
        <X
          onClick={() => setSearchMessage("")}
          className="absolute right-3 top-1 text-slate-400 size-5 block peer-placeholder-shown:hidden"
        />
      </form>
      <div className="flex items-center gap-0.5 [&>span]:p-2 [&>span]:rounded-full cursor-pointer [&>span]:hover:bg-slate-700/60 text-slate-300 ">
        <span onClick={()=>setIsSearch(!isSearch)}>
          {isSearch ? <X /> : <Search />}
        </span>
        
          <span >
            <EllipsisVertical />
          </span>
      </div>
    </div>
  );
};

export default ChatHeader;
