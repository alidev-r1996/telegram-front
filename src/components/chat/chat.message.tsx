import { getTimeFromDate } from "@/lib/utils";
import {MessageSquareX} from "lucide-react";

type ChatMessageProps = {
  sender:{name: string, _id: string, img: string},
  message: string;
  createdAt: string;
  isYou?: boolean;
  _id: string;
  removeMessage: (msgId: string) => Promise<void>;
};

const ChatMessage = ({isYou, sender:{name, img}, message, createdAt, removeMessage, _id }: ChatMessageProps) => {
  return (
    <div className={`flex items-start gap-4 ${!isYou ? "ml-auto": "group"} `}>
      
      <img src={img  ?? "/user.png"} alt="" className="size-12 rounded-full" onError={(e) => (e.currentTarget.src = "/user.png")}/>
      <div
        className={`w-full md:w-96 ${isYou ? "bg-slate-900" : "bg-slate-700"} rounded-lg relative p-2 px-3`}
      >
        <span
          className={`absolute -left-1 top-4 ${
            isYou ? "bg-slate-900" : "bg-slate-700"
          } size-2 rotate-45`}
        ></span>
        <span onClick={()=>removeMessage(_id)} className={`absolute right-2 top-1  rounded-md size-8.5 p-1.5 ${isYou? "hover:bg-slate-800 text-rose-600":"hover:bg-slate-800 text-rose-500"}  scale-0 cursor-pointer transition-all duration-300 group-hover:scale-100 hover:scale-110 active:scale-95`}>
          <MessageSquareX />
      </span>
        <p className={`${isYou ? "text-blue-500" : "text-slate-200"} font-bold mb-2`}>{isYou ? "You" : name}</p>
        <p className="text-sm text-zinc-200">{message}</p>
        <p className={`text-[10px] text-slate-300 mt-1 ${isYou && "text-right"}`}>{getTimeFromDate(createdAt)}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
