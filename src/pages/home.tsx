import { useCallback, useMemo, useRef, useState } from "react";
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
  const [searchRoom, setSearchRoom] = useState("");
  const [searchMessage, setSearchMessage] = useState("");

  const namespaceHandler = (title: string) => {
    setActiveNamespace(title);
    getNamespaceRooms(namespaces.find((namespace: any) => namespace.title === title)?.href);
  };

  const getRoomInfo = useCallback(
    (title) => {
      console.log("getRoomInfo useCallBack");
      namespaceSocket?.emit("joining", title);
    },
    [namespaceSocket]
  );

  const filteredRooms = useMemo(() => {
    console.log("filteredRooms useMemo");
    if (searchRoom.trim() == "") {
      return rooms;
    }
    const filterRoom = rooms.filter((room) => {
      return room.title.toLowerCase().includes(searchRoom.trim().toLowerCase());
    });
    if (filterRoom.length < 1) {
      return [];
    } else {
      return filterRoom;
    }
  }, [rooms, searchRoom]);

  const filteredMessages = useMemo(() => {
    console.log("filteredMessages useMemo");
    if (searchMessage.trim() == "") {
      return messages;
    }
    const filterMessage = messages.filter((msg) => {
      return msg.message.toLowerCase().includes(searchMessage.trim().toLowerCase());
    });
    if (filterMessage.length < 1) {
      return [];
    } else {
      return filterMessage;
    }
  }, [messages, searchMessage]);

  const getNamespaceRooms = useCallback(
    (namespaceHref: string) => {
      console.log("getNamespaceRooms useCallBack");
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
      console.log("sendMessage useCallBack");
      namespaceSocket.emit("newMsg", message);
    },
    [namespaceSocket]
  );

  const removeMessage = useCallback(
    async (msgId) => {
      console.log("removeMessage useCallBack");
      namespaceSocket.emit("removeMsg", { msgId, roomTitle: roomInfo.title });
    },
    [namespaceSocket, roomInfo]
  );

  const addPrivateRoom = useCallback(
    async (email: string) => {
      console.log("addPrivateRoom useCallBack");
      namespaceSocket.emit("addPrivateRoom", { email, sender: user });
      namespaceSocket.on("error", ({ message }) => {
        swal("Error", message, "error");
      });
    },
    [namespaceSocket, user]
  );


  const removePrivateRoom = useCallback(
    async (room) => {
      console.log("removePrivateRoom useCallBack");
      namespaceSocket.emit("removePrivateRoom", room);
    },
    [namespaceSocket]
  );


  // ----------------------get namespaces---------------
  useEffect(() => {
    if (!socket) return;
    console.log("get namespaces effect");
    socket.on("connect_error", (err) => {
      // console.error("Socket error:", err.message);
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


  // ----------------------get new messages-------------
  useEffect(() => {
    if (!namespaceSocket) return;
    console.log("get new messages effect");
    namespaceSocket?.on("namespaceRooms", (namespaceRooms) => {
      setRooms(namespaceRooms);
    });
    namespaceSocket.on("confirmMsg", (msg) => setMessages((prev) => [...prev, msg]));
    namespaceSocket.on("confirmRemove", (msgId) =>
      setMessages((prev) => prev.filter((msg) => msg._id !== msgId))
    );
    namespaceSocket.on("confirmAddRoom", (room) => {
      if (activeNamespace == "private") {
        setRooms((prev) => [...prev, room]);
      }
    });
    namespaceSocket.on("confirmRemovePrivateRoom", (roomId) => {
      setRooms((prevRooms: any) =>
        prevRooms.filter((room: any) => room._id !== roomId)
      );
      if (roomId == roomInfo._id) {
        setRoomInfo({});
        setMessages([]);
      }
    });
    namespaceSocket.on("roomInfo", ({ room, messages }) => {
      setRoomInfo(room);
      setMessages(messages);
    });

    namespaceSocket.on("onlineUsers", (count) => setOnlineUsers(count));

    return () => {
      namespaceSocket.off("confirmMsg");
      namespaceSocket.off("confirmRemove");
      namespaceSocket.off("confirmAddRoom");
      namespaceSocket.off("confirmRemovePrivateRoom");
      namespaceSocket.off("namespaceRooms");
      namespaceSocket.off("roomInfo");
      namespaceSocket.off("onlineUsers");
    };
  }, [namespaceSocket]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (!messages.length) return;
    console.log("Scroll to bottom whenever messages change");
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  return (
    <main className="flex items-start md:grid md:grid-cols-12 h-screen max-h-screen">
      <SideBar
        activeNamespace={activeNamespace}
        namespaceHandler={namespaceHandler}
        namespaces={namespaces}
        rooms={filteredRooms}
        roomInfo={roomInfo}
        getRoomInfo={getRoomInfo}
        setSearchRoom={setSearchRoom}
        searchRoom={searchRoom}
        addPrivateRoom={addPrivateRoom}
        removePrivateRoom={removePrivateRoom}
      />
      <ChatContainer
        messagesEndRef={messagesEndRef}
        messages={filteredMessages}
        onlineUsers={onlineUsers}
        roomInfo={roomInfo}
        setRoomInfo={setRoomInfo}
        sendMessage={sendMessage}
        removeMessage={removeMessage}
        setSearchMessage={setSearchMessage}
        searchMessage={searchMessage}
        user={user}
      />
    </main>
  );
}

export default Home;
