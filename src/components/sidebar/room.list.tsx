import { useUserStore } from "../store/user-store";
import RoomCard from "./room.card";

type RoomsListProps = {
  rooms: any[];
  getRoomInfo: (title:string)=>void
};

const RoomsList = ({ rooms, getRoomInfo }: RoomsListProps) => {
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
        <RoomCard key={index} {...item} getRoomInfo={getRoomInfo}/>
      ))}
    </div>
  );
};

export default RoomsList;
