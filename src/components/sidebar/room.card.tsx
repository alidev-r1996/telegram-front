import { getTimeFromDate, truncateText } from "@/lib/utils";
import { useUserStore } from "../store/user-store";

type RoomCardProps = {
    img: string;
    title: string;
    lastMessage: {message: string, createdAt: string} | null;
    getRoomInfo: (title: string)=>void
}

const RoomCard = ({img,lastMessage,title,getRoomInfo}: RoomCardProps) => {
  const {user} = useUserStore();
  if (!user) return;
  return (
    <div onClick={()=>getRoomInfo(title)} className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-800/50 border-b border-slate-800">
      <div className="flex gap-2 items-center">
        <img
          src={`http://localhost:3000/${img}`}
          alt=""
          className="size-14 object-cover rounded-full border border-slate-800"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }} 
        />
        <div className="flex flex-col gap-1 capitalize">
          <p className="font-semibold">{title.split("-")[0] == user.name ? title.split("-")[1] : title.split("-")[0]}</p>
          <p className="text-slate-400 text-xs">{truncateText((lastMessage?.message || "anyone send message to this group!"))}</p>
        </div>
      </div>
      <p className="text-xs text-slate-300">{lastMessage?.createdAt && getTimeFromDate(lastMessage?.createdAt) || "14:30"} </p>
    </div>
  );
};

export default RoomCard;
