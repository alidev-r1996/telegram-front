import { getTimeFromDate } from "@/lib/utils";
import Map from "../map";
import { MapPinX } from "lucide-react";

type ChatLocationProps = {
  sender:{name: string, _id: string, img: string},
  createdAt: string;
  isYou?: boolean;
  coordinate: {
    lat: number;
    lng: number;
  };
  removeMessage: (msgId: string) => Promise<void>;
  _id: string;
};

const ChatLocation = ({isYou, sender:{name, img}, createdAt, coordinate, removeMessage, _id }: ChatLocationProps) => {
  return (
    <div className={`flex items-start gap-4 ${!isYou ? "ml-auto": "group"} `}>
      <img src={img ?? "/user.png"} alt="" className="size-12 rounded-full" onError={(e) => (e.currentTarget.src = "/user.png")}/>
      <div
        className={`w-full md:w-96 ${isYou ? "bg-slate-900" : "bg-slate-700"} rounded-lg relative p-2 px-3`}
      >
        <span
          className={`absolute -left-1 top-4 ${
            isYou ? "bg-slate-900" : "bg-slate-700"
          } size-2 rotate-45`}
        ></span>
        <span onClick={()=>removeMessage(_id)} className={`absolute right-2 top-1 rounded-md size-8.5 p-1.5 ${isYou? "hover:bg-slate-800 text-rose-600":"hover:bg-slate-800 text-rose-500"}  scale-0 cursor-pointer transition-all duration-300 group-hover:scale-100 hover:scale-110 active:scale-95`}>
          <MapPinX />
      </span>
        <p className={`${isYou ? "text-blue-500" : "text-slate-200"} font-bold mb-2`}>{isYou ? "You" : name}</p>
        <div className="flex items-center gap-3">
          <Map {...coordinate} />
        </div>
        <p className={`text-[10px] text-slate-300 mt-1 ${isYou && "text-right"}`}>{getTimeFromDate(createdAt)}</p>
      </div>
    </div>
  );
};

export default ChatLocation;
