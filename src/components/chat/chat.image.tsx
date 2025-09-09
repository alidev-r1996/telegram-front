import { getTimeFromDate } from "@/lib/utils";
import { useState } from "react";

type ChatImageProps = {
  sender:{name: string, _id: string, img: string},
  createdAt: string;
  isYou?: boolean;
  media: string;
  message: string
};

const ChatImage = ({ isYou, sender:{name, img}, media, createdAt, message }: ChatImageProps) => {
  const [modal, setModal]= useState(false)
  return (
    <div className={`flex items-start gap-4 ${!isYou && "ml-auto"}`}>
      <img src={img} alt="" className="size-12 rounded-full" onError={(e) => (e.currentTarget.src = "/user.png")}/>
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
