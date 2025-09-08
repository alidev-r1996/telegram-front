import { EllipsisVertical, Phone, Search } from "lucide-react";
import { useUserStore } from "../store/user-store";

type ChatHeaderProps = {
    img: string;
    title: string;
    activity: string;
    onlineUsers: number
}


const ChatHeader = ({img,title, onlineUsers}:ChatHeaderProps) => {
  const {user} = useUserStore()
    if (!user) return

    return ( 
        <div className="p-3 flex items-center justify-between bg-slate-900">
          <div className="flex gap-2">
            <img src={`${import.meta.env.VITE_API_URL}/${img}`} alt="" className="size-12 rounded-full" onError={(event)=>event.currentTarget.src="/placeholder.jpg"}/>
            <div className="flex flex-col gap-1 text-sm">
              <p className="font-bold text-slate-100 capitalize">{title.split("-")[0] == user.name ? title.split("-")[1] : title.split("-")[0]}</p>
              <p className="text-zinc-400">{onlineUsers > 1 ? `${onlineUsers - 1} online` : "All users are offline"}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 [&>span]:p-2 [&>span]:rounded-full cursor-pointer [&>span]:hover:bg-slate-700/60 text-slate-300 ">
            <span>
              <Search />
            </span>
            <span>
              <Phone />
            </span>
            <span>
              <EllipsisVertical />
            </span>
          </div>
        </div>
     );
}
 
export default ChatHeader;