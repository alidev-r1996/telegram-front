import { ArrowDownToLine, FileX } from "lucide-react";
import { getTimeFromDate } from "@/lib/utils";

type ChatFileProps = {
  sender: { name: string; _id: string; img: string };
  file:{size: string, title: string, url: string}
  createdAt: string;
  isYou?: boolean;
  _id: string;
  removeMessage: (msgId: string) => Promise<void>;
};

const ChatFile = ({ sender: { img, name }, isYou, createdAt, file:{size, title, url}, removeMessage, _id }: ChatFileProps) => {

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
        <span onClick={()=>removeMessage(_id)} className={`absolute right-2 top-1  rounded-md size-8.5 p-1.5 ${isYou? "hover:bg-slate-800 text-rose-600":"hover:bg-slate-800 text-rose-500"}  scale-0 cursor-pointer transition-all duration-300 group-hover:scale-100 hover:scale-110 active:scale-95`}>
          <FileX />
      </span>
        <p className={`${isYou ? "text-blue-500" : "text-slate-200"} font-bold mb-2`}>{isYou ? "You" : name}</p>
        <div className="flex items-center gap-3">
          <a target="_blank" href={url} download className="!bg-blue-500 overflow-hidden text-white rounded-full !p-3 size-12 flex items-center justify-center group">
            <ArrowDownToLine className="group-hover:animate-bounce size-full" />
          </a>
          <div className="flex flex-col gap-1 ">
            <p className="text-slate-100 text-sm">{title}</p>
            <p className="text-zinc-300 text-xs">{size}</p>
          </div>
        </div>
        <p className={`text-[10px] text-slate-300 mt-1 ${isYou && "text-right"}`}>{getTimeFromDate(createdAt)}</p>
      </div>
    </div>
  );
};

export default ChatFile;
