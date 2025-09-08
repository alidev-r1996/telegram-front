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
  Bookmark,
  Megaphone,
  Phone,
  Settings,
  SquareUserRound,
  User,
  UsersRound,
} from "lucide-react";

const menu = [
  { title: "my profile", icon: User },
  { title: "new Group", icon: UsersRound },
  { title: "new channel", icon: Megaphone },
  { title: "contacts", icon: SquareUserRound },
  { title: "calls", icon: Phone },
  { title: "saved messages", icon: Bookmark },
  { title: "settings", icon: Settings },
];

const MainMenu = () => {
  return (
    <nav>
      <Sheet>
        <SheetTrigger className="hover:text-slate-100 text-slate-500 transition-all duration-300 cursor-pointer">
          <AlignJustify className="size-7" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-slate-900 border border-slate-700 shadow">
          <SheetClose className="  rounded-full p-2 text-white  transition-colors size-6"></SheetClose>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription asChild>
              <div className="flex flex-col gap-6 text-slate-300 capitalize">
                {menu.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <Icon className="size-7" />
                      {item.title}
                    </div>
                  );
                })}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MainMenu;
