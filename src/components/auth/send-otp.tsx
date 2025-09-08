import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import swal from "sweetalert";
import axios from "../../server/axios.config";
import { useEffect } from "react";
import { useUserStore } from "../store/user-store";
import { useNavigate } from "react-router-dom";

type SendOTPProps = {
  onSend: () => void;
  user: { name: string; mobile: string };
  setUser: (any) => void;
};

const SendOTP = ({ onSend, user, setUser }: SendOTPProps) => {
  const { name, mobile } = user;
  const { user: userStore } = useUserStore();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/send-otp", { name, mobile });
      const data = await res.data;
      await swal("Success", data.message, "success");
      onSend();
    } catch (error: any) {
      swal("Error", error?.response?.data?.message || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    if (userStore) {
      navigate("/");
    }
  }, [userStore, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800 px-4">
      <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl shadow-xl p-10 w-full max-w-md">
        <img src="/logo.png" alt="" className="size-15 mx-auto  mb-4" />
        <h2 className="text-3xl font-bold text-slate-200 mb-10 text-center ">
          Welcome to Telegram
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm mb-1">Name</label>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
              className="border border-slate-600 text-slate-100"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1">Mobile</label>
            <Input
              placeholder="e.g. +98935000000"
              type="tel"
              value={mobile}
              onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              required
              className="border border-slate-600 text-slate-100"
            />
          </div>
          <Button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
            Send OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SendOTP;
