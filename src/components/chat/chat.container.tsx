import ChatFile from "./chat.file";
import ChatHeader from "./chat.header";
import ChatImage from "./chat.image";
import ChatInput from "./chat.input";
import ChatLocation from "./chat.location";
import ChatMessage from "./chat.message";

type ChatContainerProps = {
  roomInfo: {
    title: string;
    createdAt: string;
    img: string;
    _id: string;
  };
  user: { id: string } | null;
  onlineUsers: number;
  messages: any[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  sendMessage: (message: any) => Promise<void>;
};

const ChatContainer = ({
  messagesEndRef,
  messages,
  onlineUsers,
  roomInfo,
  sendMessage,
  user,
}: ChatContainerProps) => {
  return (
    <div className="col-span-9 bg-slate-800 h-screen">
      {roomInfo.title && (
        <div className="flex flex-col h-full">
          <ChatHeader
            activity={roomInfo.createdAt}
            img={roomInfo.img}
            title={roomInfo.title}
            onlineUsers={onlineUsers}
          />
          <div className="flex-1 p-4 gap-2 flex flex-col overflow-y-auto">
            {messages?.map((message: any, index: number) => {
              const isYou = String(message.sender._id) === String(user?.id);
              if (message.message_type === "media") {
                return <ChatImage key={index} {...message} isYou={isYou} />;
              }
              if (message.message_type === "location") {
                return <ChatLocation key={index} {...message} isYou={isYou} />;
              }
              if (message.message_type === "file") {
                return <ChatFile key={index} {...message} isYou={isYou} />;
              }
              return <ChatMessage key={index} {...message} isYou={isYou} />;
            })}
            <div ref={messagesEndRef}></div>
          </div>
          <ChatInput submit={sendMessage} roomId={roomInfo._id} />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
