import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import swal from "sweetalert";
import axios from "../../server/axios.config";
import { useUserStore } from "../store/user-store";


type CheckOTPProps = {
  onBack: () => void;
  user: { name: string; mobile: string };
  setUser: (any) => void;
};

const CheckOTP = ({ user, setUser }: CheckOTPProps) => {
  const { mobile, name } = user;
  const [otp, setOtp] = useState("");
  const refOTP = useRef<HTMLInputElement>(null);
  const {setUser: setUserStore} = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/check-otp", { mobile, code: otp });
      const data = await res.data;
      setUserStore(data.user);
      swal("Success", data.message, "success");
      setUser({ mobile: "", name: "" });
      window.location.href = "/";
    } catch (error: any) {
      console.log(error);
      swal("Error", error?.response?.data?.message || "Something went wrong", "error");
    }
  };

  const resendHandler = async () => {
    try {
      const res = await axios.post("/api/auth/send-otp", { mobile, name });
      const data = await res.data;
      await swal("Success", data.message, "success");
    } catch (error: any) {
      console.log(error);
      swal("Error", error?.response?.data?.message || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    refOTP.current?.focus();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800 px-4">
      <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl shadow-[0_0_0_3px,rgba(0,0,0,1)] p-10 w-full max-w-md text-center">
        <img src="/logo.png" alt="" className="size-15 mx-auto mb-4" />
        <p className="text-gray-400 mb-10 capitalize text-sm">
          Enter the 5-digit OTP sent to {mobile}.
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col justify-center items-center"
        >
          <InputOTP
            ref={refOTP}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            value={otp}
            onChange={setOtp}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="border border-slate-600 text-slate-100" />
              <InputOTPSlot index={1} className="border border-slate-600 text-slate-100" />
              <InputOTPSlot index={2} className="border border-slate-600 text-slate-100" />
              <InputOTPSlot index={3} className="border border-slate-600 text-slate-100" />
              <InputOTPSlot index={4} className="border border-slate-600 text-slate-100" />
            </InputOTPGroup>
          </InputOTP>
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Didn't receive the code?</p>
            <p
              onClick={resendHandler}
              className="text-blue-500 text-sm mx-2 cursor-pointer hover:text-blue-600 transition-all duration-200 hover:font-bold"
            >
              Resend
            </p>
          </div>
          <Button type="submit" className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
            Verify OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CheckOTP;
