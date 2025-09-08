import { X } from "lucide-react";
import MainMenu from "./main.menu";
import NameSpacesList from "./namespaces";
import RoomsList from "./room.list";

type SideBarProps = {
  activeNamespace: string;
  namespaceHandler: (title: string) => void;
  namespaces: any[];
  rooms: any[];
  getRoomInfo: (title: string) => void;
};

const SideBar = ({
  activeNamespace,
  namespaceHandler,
  namespaces,
  getRoomInfo,
  rooms,
}: SideBarProps) => {
  return (
    <div className="col-span-3 bg-slate-900 h-screen border-r border-slate-700">
      <header className="p-4">
        <nav>
          <div className="flex items-center gap-4 w-full">
            <MainMenu />
            <div className="flex-1 relative">
              <input
                type="text"
                className="p-1.5 rounded-full w-full peer px-4 focus:outline-none bg-slate-800 text-sm placeholder:text-sm text-slate-200 placeholder:text-slate-400"
                placeholder="search"
              />
              <X className="absolute right-3 top-1 text-slate-400 size-5 block peer-placeholder-shown:hidden" />
            </div>
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
