import { getTimeFromDate, truncateText } from "@/lib/utils";
import { useUserStore } from "../store/user-store";
import { Trash } from "lucide-react";

type RoomCardProps = {
  img: string;
  title: string;
  lastMessage: { message: string; createdAt: string } | null;
  getRoomInfo: (title: string) => void;
  isRemove?: boolean;
  _id?: string;
  removePrivateRoom: (room: any) => void;
};

const RoomCard = ({ img, lastMessage, title, getRoomInfo, isRemove, removePrivateRoom }: RoomCardProps) => {
  const removeRoomHandler = async (e) => {
    e.stopPropagation();
    removePrivateRoom(title);
  };

  const { user } = useUserStore();
  if (!user) return;
  return (
    <div
      onClick={() => getRoomInfo(title)}
      className="flex group relative items-center justify-between p-3 cursor-pointer hover:bg-slate-800/50 border-b border-slate-800"
    >
      <div className="flex gap-2 items-center">
        <img
          src={img ?? "/placeholder.jpg"}
          alt=""
          className="size-14 object-cover rounded-full border border-slate-800"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
        />
        <div className="flex flex-col gap-1 capitalize">
          <p className="font-semibold">
            {title.split("-")[0] == user.name ? title.split("-")[1] : title.split("-")[0]}
          </p>
          <p className="text-slate-400 text-xs">
            {truncateText(lastMessage?.message || "anyone send message to this group!")}
          </p>
        </div>
      </div>
      <p
        className={`${
          isRemove ? "group-hover:scale-0" : "scale-100"
        } text-xs text-slate-400 transition-all duration-200 `}
      >
        {(lastMessage?.createdAt && getTimeFromDate(lastMessage?.createdAt)) || "14:30"}{" "}
      </p>
      <span
        onClick={removeRoomHandler}
        className={`${
          !isRemove && "hidden"
        } transition-all duration-400 scale-0 group-hover:scale-100 absolute right-3 top-5 rounded-md size-9 p-1.5 bg-slate-800 text-rose-500 hover:text-rose-600 cursor-pointer hover:scale-110 active:scale-95`}
      >
        <Trash />
      </span>
    </div>
  );
};

export default RoomCard;
