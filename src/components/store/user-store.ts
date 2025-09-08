import { create } from "zustand";
import axios from "../../server/axios.config.js";

type User = {
  name: string;
  mobile: string;
  id: string;
} | null;

type UserStore = {
  user: User;
  loading: boolean;
  err: null | string;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  loading: true,
  err: null,
  setUser: (user: User) => set(() => ({ user })),
  fetchUser: async () => {
    try {
      set({ loading: true });
      const raw = localStorage.getItem("user-auth");
      const storage = raw ? JSON.parse(raw) : null;
      if (storage) {
        set({ user: storage });
      } else {
        const res = await axios.get("/api/auth/me");
        set({ user: res.data.user, loading: false });
        localStorage.setItem("user-auth", JSON.stringify(res.data.user))
      }
    } catch (err: any) {
      set({ user: null, loading: false, err: err.response?.data?.message });
    }
  },
  logout: async () => {
    try {
      set({ loading: true });
      await axios.get("/api/auth/logout");
      set({ user: null, loading: false });
      localStorage.removeItem("user-auth")
    } catch (err: any) {
      set({ user: null, loading: false, err: err.response?.data?.message });
    }
  },
}));
