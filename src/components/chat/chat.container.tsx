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
  setRoomInfo: (any) => void;
  user: { id: string } | null;
  onlineUsers: number;
  messages: any[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  sendMessage: (message: any) => Promise<void>;
  removeMessage: (msgId: string) => Promise<void>;
  setSearchMessage: (searchMessage: string) => void;
  searchMessage: string;
};

const ChatContainer = ({
  messagesEndRef,
  messages,
  onlineUsers,
  roomInfo,
  sendMessage,
  user,
  setRoomInfo,
  removeMessage,
  setSearchMessage,
  searchMessage
}: ChatContainerProps) => {
  return (
    <div
      className={`${
        !roomInfo.title && "hidden md:block"
      } max-w-screen flex-1 md:col-span-9 bg-slate-800 h-screen max-h-screen`}
    >
      {roomInfo.title && (
        <div className="flex flex-col h-full">
          <ChatHeader
            activity={roomInfo.createdAt}
            img={roomInfo.img}
            title={roomInfo.title}
            setSearchMessage={setSearchMessage}
            searchMessage={searchMessage}
            setRoomInfo={setRoomInfo}
            onlineUsers={onlineUsers}
            isRoom={roomInfo.title ? true : false}
          />
          <div className="flex-1 p-4 gap-2 flex flex-col overflow-y-auto max-w-full min-h-0">
            {messages?.map((message: any, index: number) => {
              const isYou = String(message.sender._id) === String(user?.id);
              if (message.message_type === "media") {
                return (
                  <ChatImage removeMessage={removeMessage} key={index} {...message} isYou={isYou} />
                );
              }
              if (message.message_type === "location") {
                return (
                  <ChatLocation
                    removeMessage={removeMessage}
                    key={index}
                    {...message}
                    isYou={isYou}
                  />
                );
              }
              if (message.message_type === "file") {
                return (
                  <ChatFile removeMessage={removeMessage} key={index} {...message} isYou={isYou} />
                );
              }
              return (
                <ChatMessage removeMessage={removeMessage} key={index} {...message} isYou={isYou} />
              );
            })}
            <div ref={messagesEndRef} className=" h-1"></div>
          </div>
          <ChatInput submit={sendMessage} roomId={roomInfo._id} />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
