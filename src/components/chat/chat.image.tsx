import { getTimeFromDate } from "@/lib/utils";
import { ImageMinus } from "lucide-react";
import { useState } from "react";

type ChatImageProps = {
  sender:{name: string, _id: string, img: string},
  createdAt: string;
  isYou?: boolean;
  media: string;
  message: string;
  _id: string;
  removeMessage: (msgId: string) => Promise<void>;
};

const ChatImage = ({ isYou, sender:{name, img}, media, createdAt, message, removeMessage, _id }: ChatImageProps) => {
  const [modal, setModal]= useState(false)
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
          <ImageMinus />
      </span>
        <p className={`${isYou ? "text-blue-500" : "text-slate-200"} font-bold mb-2`}>{isYou ? "You" : name}</p>
        <div className="flex items-center gap-3">
          <img onClick={()=>setModal(true)} src={media} alt="" className="rounded-lg aspect-[9/5] w-full cursor-zoom-in" />
        </div>
        <p className="text-xs text-zinc-200 my-2">{message}</p>
        <p className={`text-[10px] text-slate-300 mt-1 ${!isYou && "text-right"}`}>{getTimeFromDate(createdAt)}</p>
      </div>
      {modal && <div onClick={()=>setModal(false)} className="fixed left-0 top-0 w-screen h-screen bg-slate-800/50 backdrop-blur z-40"></div>}
      {modal && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[30%] w-[60%] aspect-[6/7] bg-slate-600 p-4 rounded-lg z-50">
          <img onClick={()=>setModal(false)} src={media} alt="" className="rounded-lg size-full cursor-zoom-out" />
      </div>}
    </div>
  );
};

export default ChatImage;
