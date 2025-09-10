import { useCallback, useRef, useState } from "react";
import IO from "socket.io-client";
import { useEffect } from "react";
import { useUserStore } from "@/components/store/user-store";
import SideBar from "@/components/sidebar/sidebar";
import ChatContainer from "@/components/chat/chat.container";

const socket = IO(import.meta.env.VITE_API_URL, {
  withCredentials: true,
});

function Home() {
  const [namespaces, setNamespaces] = useState<any>([]);
  const [activeNamespace, setActiveNamespace] = useState("");
  const [namespaceSocket, setNamespaceSocket] = useState<any>();
  const [rooms, setRooms] = useState<any>([]);
  const [roomInfo, setRoomInfo] = useState<any>({});
  const [messages, setMessages] = useState<any>([]);
  const [onlineUsers, setOnlineUsers] = useState<any>();
  const { user } = useUserStore();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const namespaceHandler = (title: string) => {
    setActiveNamespace(title);
    getNamespaceRooms(namespaces.find((namespace: any) => namespace.title === title)?.href);
  };

  const getRoomInfo = useCallback(
    (title) => {
      namespaceSocket?.emit("joining", title);
    },
    [namespaceSocket]
  );

  const getNamespaceRooms = useCallback(
    (namespaceHref: string) => {
      if (namespaceSocket) {
        namespaceSocket.disconnect();
      }
      const newSocket = IO(`${import.meta.env.VITE_API_URL}${namespaceHref}`, {
        withCredentials: true,
      });
      setNamespaceSocket(newSocket);
    },
    [namespaceSocket]
  );

  const sendMessage = useCallback(
    async (message) => {
      namespaceSocket.emit("newMsg", message);
    },
    [namespaceSocket]
  );

  // ----------------------------login------------------
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  // ----------------------get namespaces---------------
  useEffect(() => {
    if (!socket) return;
    socket.on("connect_error", (err) => {
      console.error("Socket error:", err.message);

      if (
        err.message.includes("Unauthorized") ||
        err.message.includes("Token is missing") ||
        err.message.includes("User not found")
      ) {
        localStorage.removeItem("user-auth");
        window.location.href = "/login";
      }
    });
    socket.on("namespaces", (data) => {
      setNamespaces(data);
      setActiveNamespace(data[0]?.title);
      getNamespaceRooms(data[0]?.href);
    });
    return () => {
      socket.disconnect();
    };
  }, [getNamespaceRooms]);

  // ----------------------get namespace rooms------------------
  useEffect(() => {
    if (!namespaceSocket) return;
    namespaceSocket?.on("namespaceRooms", (namespaceRooms) => {
      setRooms(namespaceRooms);
    });
    return () => {
      namespaceSocket?.off("namespaceRooms");
    };
  }, [namespaceSocket]);

  // ----------------------get new messages-------------
  useEffect(() => {
    if (!namespaceSocket) return;

    namespaceSocket.on("confirmMsg", (msg) => setMessages((prev) => [...prev, msg]));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    return () => {
      namespaceSocket.off("confirmMsg");
    };
  }, [namespaceSocket]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --------------------------get room info---------------
  useEffect(() => {
    if (!namespaceSocket) return;

    namespaceSocket.on("roomInfo", ({ room, messages }) => {
      setRoomInfo(room);
      setMessages(messages);
    });

    namespaceSocket.on("onlineUsers", (count) => setOnlineUsers(count));

    return () => {
      namespaceSocket.off("roomInfo");
      namespaceSocket.off("onlineUsers");
    };
  }, [namespaceSocket]);

  return (
    <main className="flex items-start md:grid md:grid-cols-12">
      <SideBar
        activeNamespace={activeNamespace}
        namespaceHandler={namespaceHandler}
        namespaces={namespaces}
        rooms={rooms}
        roomInfo={roomInfo}
        getRoomInfo={getRoomInfo}
      />
      <ChatContainer
        messagesEndRef={messagesEndRef}
        messages={messages}
        onlineUsers={onlineUsers}
        roomInfo={roomInfo}
        setRoomInfo={setRoomInfo}
        sendMessage={sendMessage}
        user={user}
      />
    </main>
  );
}

export default Home;
