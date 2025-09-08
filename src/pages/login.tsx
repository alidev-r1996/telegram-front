import CheckOTP from "@/components/auth/check-otp";
import SendOTP from "@/components/auth/send-otp";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState({ name: "", mobile: "" });
  const [showOtp, setShowOtp] = useState(false);

  return (
    <main>
      {showOtp ? (
        <CheckOTP user={user} onBack={() => setShowOtp(false)} setUser={setUser} />
      ) : (
        <SendOTP onSend={() => setShowOtp(true)} user={user} setUser={setUser} />
      )}
    </main>
  );
};

export default Login;
