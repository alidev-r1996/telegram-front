import { getTimeFromDate } from "@/lib/utils";
import Map from "../map";

type ChatLocationProps = {
  sender:{name: string, _id: string, img: string},
  createdAt: string;
  isYou?: boolean;
  coordinate: {
    lat: number;
    lng: number;
  };
};

const ChatLocation = ({isYou, sender:{name, img}, createdAt, coordinate }: ChatLocationProps) => {
  return (
    <div className={`flex items-start gap-4 ${!isYou && "ml-auto"}`}>
      <img src={img ?? "/user.png"} alt="" className="size-12 rounded-full" onError={(e) => (e.currentTarget.src = "/user.png")}/>
      <div
        className={`w-96 ${isYou ? "bg-slate-900" : "bg-slate-700"} rounded-lg relative p-2 px-3`}
      >
        <span
          className={`absolute -left-1 top-4 ${
            isYou ? "bg-slate-900" : "bg-slate-700"
          } size-2 rotate-45`}
        ></span>
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
