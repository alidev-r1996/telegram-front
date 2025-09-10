import { getTimeFromDate } from "@/lib/utils";

type ChatMessageProps = {
  sender:{name: string, _id: string, img: string},
  message: string;
  createdAt: string;
  isYou?: boolean;
};

const ChatMessage = ({isYou, sender:{name, img}, message, createdAt }: ChatMessageProps) => {
  return (
    <div className={`flex items-start gap-4 ${!isYou && "ml-auto"}`}>
      <img src={img  ?? "/user.png"} alt="" className="size-12 rounded-full" onError={(e) => (e.currentTarget.src = "/user.png")}/>
      <div
        className={`w-full md:w-96 ${isYou ? "bg-slate-900" : "bg-slate-700"} rounded-lg relative p-2 px-3`}
      >
        <span
          className={`absolute -left-1 top-4 ${
            isYou ? "bg-slate-900" : "bg-slate-700"
          } size-2 rotate-45`}
        ></span>
        <p className={`${isYou ? "text-blue-500" : "text-slate-200"} font-bold mb-2`}>{isYou ? "You" : name}</p>
        <p className="text-sm text-zinc-200">{message}</p>
        <p className={`text-[10px] text-slate-300 mt-1 ${isYou && "text-right"}`}>{getTimeFromDate(createdAt)}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
