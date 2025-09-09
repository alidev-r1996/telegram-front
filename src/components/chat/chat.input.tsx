import { Eraser, ImagePlus, MapPin, Paperclip, Send } from "lucide-react";
import { useRef, useState } from "react";
// import axios from "@/server/axios.config.js";
import { useUserStore } from "../store/user-store";
import { uploadFileToCloudinary, uploadToCloudinary } from "@/lib/utils";

type ChatInputProps = {
  submit: (message: any) => Promise<void>;
  roomId: string;
};

const ChatInput = ({ submit, roomId }: ChatInputProps) => {
  const messageRef = useRef<HTMLInputElement>(null);
  const [media, setMedia] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { user } = useUserStore();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!messageRef.current) return;
    if (!user) return;
    const messageType = media ? "media" : file ? "file" : "text";
    const message = {
      sender: user.id,
      roomId,
      message: messageRef.current.value,
      message_type: messageType,
    };

    const formData = new FormData();

    if (media) {
      formData.append("media", media);
    }
    if (file) {
      formData.append("file", file);
    }

    if (messageType == "media" && media) {
      try {
        // const res = await axios.post("/api/message/upload-media", formData);

        // const { success, img } = res.data;
        // if (success) {
        //   message["media"] = img;
        // }
        const url = await uploadToCloudinary(media);
        message["media"] = url;
      } catch (error) {
        console.log(error);
      }
    } else if (messageType == "file" && file) {
      // const res = await axios.post("/api/message/upload-file", formData);
      // const { success, file } = res.data;
      // if (success) {
      //   message["file"] = file;
      // }
      try {
        const url = await uploadFileToCloudinary(file);
        message["file"] = {
          title: file.name,
          size:
            Number(file.size) / 1024 > 1000
              ? `${(Number(file.size) / 2048).toFixed(2)} MB`
              : `${(Number(file.size) / 1024).toFixed(2)} KB`,
          url,
          mimeType: file.type,
        };
      } catch (error) {
        console.log(error);
      }
    }
  
    try {
      await submit(message);
      if (messageRef.current) messageRef.current.value = "";
      setMedia(null);
      setFile(null);
    } catch (error) {
      console.error("error sending message:", error);
    }
  };

  const locationHandler = () => {
    if (!user) return;
    const message = {
      sender: user.id,
      roomId,
      message_type: "location",
    };
    window.navigator.geolocation.getCurrentPosition((pos) => {
      message["location"] = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
    });
    submit(message);
  };

  return (
    <form className="flex items-center gap-5  p-2 px-2  cursor-pointer bg-slate-700  text-slate-300 relative">
      {media && (
        <div className="absolute -top-50 left-0">
          <img src={URL.createObjectURL(media)} alt="" className="h-50 aspect-[9/7] rounded " />
          <p
            onClick={() => setMedia(null)}
            className="absolute bottom-0 left-0 w-full bg-rose-500 text-white hover:bg-rose-600 transition-all duration-300 py-1 p-0.5 justify-center cursor-pointer text-xs flex items-center gap-1"
          >
            <Eraser className="size-4" />
            Remove
          </p>
        </div>
      )}
      {file && (
        <div className="absolute -top-25 left-0 bg-slate-900">
          <div className="h-25 rounded w-80 flex items-center justify-start gap-4 pl-4 pb-5">
            <p className=" bg-slate-800 text-blue-600 p-[10px] [&>svg]:size-full rounded-lg size-12 flex items-center justify-center">
              <Paperclip />
            </p>
            <div className="flex flex-col gap-2 p-4">
              <p className="text-sm">{file.name}</p>
              <p className="text-xs text-zinc-400">
                {Number(file.size) / 1024 > 1000
                  ? `${(Number(file.size) / 2048).toFixed(2)} MB`
                  : `${(Number(file.size) / 1024).toFixed(2)} KB`}
              </p>
            </div>
          </div>
          <p
            onClick={() => setFile(null)}
            className="absolute bottom-0 left-0 w-full bg-rose-500 text-white hover:bg-rose-600 transition-all duration-300 py-1 p-0.5 justify-center cursor-pointer text-xs flex items-center gap-1"
          >
            <Eraser className="size-4" />
            Remove
          </p>
        </div>
      )}
      <div className="flex items-center gap-2">
        <label
          htmlFor="file"
          className="cursor-pointer hover:bg-slate-800/50 p-1.5 rounded-lg transition-all duration-300"
        >
          <input
            disabled={media != null}
            type="file"
            onChange={(e) => setFile(e.target.files![0])}
            hidden
            id="file"
            name="file"
          />
          <Paperclip />
        </label>
        <label
          htmlFor="media"
          className="cursor-pointer hover:bg-slate-800/50 p-1.5 rounded-lg transition-all duration-300"
        >
          <input
            type="file"
            disabled={file != null}
            onChange={(e) => setMedia(e.target.files![0])}
            accept={".jpg, .jpeg, .png, .webp"}
            hidden
            id="media"
            name="media"
          />
          <ImagePlus />
        </label>
      </div>
      <input
        type="text"
        name="message"
        ref={messageRef}
        className="appearance-none p-1 text-zinc-200 placeholder:text-sm focus:outline-none flex-1"
        placeholder="write a message..."
      />
      <div className="flex items-center  cursor-pointer  text-slate-300 gap-2 pr-2">
        <p
          onClick={locationHandler}
          className="cursor-pointer hover:bg-slate-800/50 p-1.5 rounded-lg transition-all duration-300"
        >
          <MapPin />
        </p>

        <button
          type="submit"
          onClick={submitHandler}
          className="cursor-pointer text-blue-500 hover:bg-blue-600 hover:text-white p-1.5 rounded-full transition-all duration-300"
        >
          {/* <Mic /> */}
          <Send />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
