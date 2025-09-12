import { X } from "lucide-react";
import MainMenu from "./main.menu";
import NameSpacesList from "./namespaces";
import RoomsList from "./room.list";

type SideBarProps = {
  activeNamespace: string;
  namespaceHandler: (title: string) => void;
  roomInfo: {
    title: string;
    createdAt: string;
    img: string;
    _id: string;
  };
  namespaces: any[];
  rooms: any[];
  getRoomInfo: (title: string) => void;
  setSearchRoom: (title: string) => void;
  searchRoom: string;
};

const SideBar = ({
  activeNamespace,
  namespaceHandler,
  namespaces,
  getRoomInfo,
  roomInfo,
  rooms,
  setSearchRoom,
  searchRoom
}: SideBarProps) => {


  return (
    <div
      className={`${
        roomInfo.title && "hidden md:block"
      } md:col-span-3 flex-1 bg-slate-900 h-screen border-r border-slate-700`}
    >
      <header className="p-4">
        <nav>
          <div className="flex items-center gap-4 w-full">
            <MainMenu />
            <form className="flex-1 relative">
              <input
                type="text"
                value={searchRoom}
                onChange={(e) => setSearchRoom(e.target.value)}
                className="p-1.5 rounded-full w-full peer px-4 focus:outline-none bg-slate-800 text-sm placeholder:text-sm text-slate-200 placeholder:text-slate-400"
                placeholder="search rooms..."
              />
              <X
                onClick={() => setSearchRoom("")}
                className="absolute right-3 top-1 text-slate-400 size-5 block peer-placeholder-shown:hidden"
              />
            </form>
          </div>
          <NameSpacesList
            activeNamespace={activeNamespace}
            namespaceHandler={namespaceHandler}
            namespaces={namespaces}
          />
        </nav>
      </header>
      <RoomsList rooms={rooms} getRoomInfo={getRoomInfo} />
    </div>
  );
};

export default SideBar;
