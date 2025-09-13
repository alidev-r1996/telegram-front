import { useUserStore } from "../store/user-store";
import RoomCard from "./room.card";

type RoomsListProps = {
  rooms: any[];
  getRoomInfo: (title:string)=>void,
  isRemove?: boolean;
  removePrivateRoom?: (room: any) => void;
};

const RoomsList = ({ rooms, getRoomInfo, isRemove, removePrivateRoom }: RoomsListProps) => {
  const {user} = useUserStore()
  if (!user) return
  let privateRooms = rooms;
  const isPrivate = rooms.map(room=>room.title.includes('-'))
  if (isPrivate.every(item=>item==true)) {
    privateRooms = rooms.filter(room=>room.title.includes(user.name))
  }
  return (
    <div className="flex flex-col text-white text-sm">
      {privateRooms.map((item, index) => (
        <RoomCard key={index} {...item} getRoomInfo={getRoomInfo} isRemove={isRemove} removePrivateRoom={removePrivateRoom}/>
      ))}
    </div>
  );
};

export default RoomsList;
