import { loginRequest } from "@/services/auth";
import { AuthResponse } from "@/types/auth";
import { create } from "zustand";

type User = Omit<AuthResponse, "refreshToken" | "accessToken">;

type AuthState = {
  username: string;
  password: string;
  setUserName: (name: string) => void;
  setPassword: (pass: string) => void;

  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: "idle" | "loading" | "authenticated" | "error";
  error: string | null;

  login: () => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  username: "",
  password: "",
  setUserName: (name: string) => set({ username: name }),
  setPassword: (pass: string) => set({ password: pass }),

  user: null,
  accessToken: null,
  refreshToken: null,
  status: "idle",
  error: null,

  login: async () => {
    const { username, password } = get();

    if (username.trim().length < 3 || password.trim().length < 3) {
      set({ status: "error", error: "Минимум 3 символа в каждом поле" });
      return;
    }

    try {
      set({ status: "loading", error: null });
      const res = await loginRequest({ username, password });
      const { accessToken, refreshToken, ...user } = res;
      set({
        user,
        accessToken,
        refreshToken,
        status: "authenticated",
        error: null,
        password: "",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const msg = e.response.data.message ?? e.message ?? "Ошибка авторизации";
      set({ status: "error", error: msg });
    }
  },

  logout: () =>
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      status: "idle",
      error: null,
      username: "",
      password: "",
    }),
}));
