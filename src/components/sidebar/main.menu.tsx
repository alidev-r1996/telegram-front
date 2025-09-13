import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlignJustify,
  // Bookmark,
  Camera,
  LogOut,
  // Megaphone,
  // Phone,
  // Settings,
  // SquareUserRound,
  // User,
  // UsersRound,
} from "lucide-react";
import { useUserStore } from "../store/user-store";
import axios from "../../server/axios.config";
import { uploadToCloudinary } from "@/lib/utils";
import { useState } from "react";

// const menu = [
//   { title: "my profile", icon: User },
//   { title: "new Group", icon: UsersRound },
//   { title: "new channel", icon: Megaphone },
//   { title: "contacts", icon: SquareUserRound },
//   { title: "calls", icon: Phone },
//   { title: "saved messages", icon: Bookmark },
//   { title: "settings", icon: Settings },
//   { title: "Logout", icon: LogOut },
// ];

type MainMenu = {
  addPrivateRoom: (string) => void;
};

const MainMenu = ({ addPrivateRoom }: MainMenu) => {
  const { user } = useUserStore();
  const [open, setOpen] = useState(false)

  const logoutHandler = async () => {
    const res = await axios.get("/api/auth/logout");
    if (res.data.success) {
      swal("Success", res.data.message, "success");
      localStorage.removeItem("user-auth");
      window.location.href = "/login";
    }
  };

  const userPhotohandler = async (e) => {
    const img = e.target.files![0];
    const formData = new FormData();
    formData.append("img", img);
    const url = await uploadToCloudinary(img);
    const updateUser = {
      img: url,
    };
    const res = await axios.patch("/api/user/update-photo", updateUser);
    if (res.data.success) {
      swal("Success", res.data.message, "success");
      localStorage.setItem("user-auth", JSON.stringify(res.data.user));
      window.location.reload();
    }
  };

  const addPrivateRoomHandler = async (e) => {
    e.preventDefault();
    const email = e.target.mobile.value;
      addPrivateRoom(email)
      e.target.mobile.value="";
      setOpen(false)
  };

  return (
    <nav>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="hover:text-slate-100 text-slate-500 transition-all duration-300 cursor-pointer">
          <AlignJustify className="size-7" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-slate-900 border border-slate-700 shadow">
          <SheetClose className="  rounded-full p-2 text-white  transition-colors size-6"></SheetClose>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription asChild>
              <div className="flex flex-col gap-3 text-slate-400 capitalize -mt-10">
                <div className="py-4 px-2 border-b border-b-slate-500 flex flex-col gap-4">
                  <div className="relative w-max">
                    <img
                      src={user?.img ?? "/user.png"}
                      alt=""
                      className="size-26 rounded-full"
                      onError={(e) => (e.currentTarget.src = "/user.png")}
                    />
                    <label
                      htmlFor="img"
                      className="absolute bottom-0 right-0 bg-slate-500 text-slate-200 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 rounded-full p-2"
                    >
                      <input
                        type="file"
                        onChange={userPhotohandler}
                        accept={".jpg, .jpeg, .png, .webp"}
                        hidden
                        id="img"
                        name="img"
                      />
                      <Camera />
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold text-lg text-slate-100">{user?.name}</p>
                    <p className="text-zinc-400 text-xs">{user?.mobile}</p>
                  </div>
                </div>
                {/* {menu.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      onClick={item.title === "Logout" ? logoutHandler : undefined}
                      key={index}
                      className="flex items-center last:hover:text-rose-600 gap-4 text-xs md:text-sm hover:bg-slate-800 hover:text-slate-100 transition-all duration-300 p-2 rounded-lg cursor-pointer"
                    >
                      <Icon className="size-7" />
                      {item.title}
                    </div>
                  );
                })} */}

                <form onSubmit={addPrivateRoomHandler} className="flex flex-col gap-2">
                  <input
                    type="email"
                    name="mobile"
                    placeholder="Enter Email..."
                    id="mobile"
                    className="bg-slate-800 border px-4 border-slate-600 text-xs rounded-lg p-2 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 cursor-pointer active:bg-blue-800 transition-all duration-300 text-white p-2 rounded-lg"
                  >
                    Add Contact
                  </button>
                </form>

                <div
                  onClick={logoutHandler}
                  className="flex absolute bottom-2 w-[92%] items-center last:hover:text-rose-600 gap-4 text-xs md:text-sm hover:bg-slate-800 hover:text-slate-100 transition-all duration-300 p-2 rounded-lg cursor-pointer"
                >
                  <LogOut className="size-7" />
                  Logout
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MainMenu;
