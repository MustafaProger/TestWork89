import { create } from "zustand";

type AuthState = {
  username: string;
  password: string;
  setUserName: (name: string) => void;
  setPassword: (pass: string) => void;
};

export const useAuthStore = create<AuthState>((set) => {
  return {
    username: "",
    password: "",
    setUserName: (name: string) => set({ username: name }),
    setPassword: (pass: string) => set({ password: pass }),
  };
});
