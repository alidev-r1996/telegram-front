import { useUserStore } from "@/components/store/user-store";
import { useEffect } from "react";

export const useAuthInit = () => {
  const { fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser(); 
  }, [fetchUser]);
};