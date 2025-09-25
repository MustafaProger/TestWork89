"use client";

import { loginRequest } from "@/services/auth";
import { AuthResponse } from "@/types/auth";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

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
  setStatus: (status: AuthState["status"]) => void;

  error: string | null;
  setError: (error: string) => void;

  login: () => Promise<void>;
  logout: () => void;

  isHydrated: boolean;
  setHydrated: (v: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        username: "",
        password: "",

        setUserName: (name: string) => set({ username: name }),
        setPassword: (pass: string) => set({ password: pass }),

        user: null,
        accessToken: null,
        refreshToken: null,

        status: "idle",
        setStatus: (s: AuthState["status"]) => set({ status: s }, false, "auth/setStatus"),

        error: null,
        setError: (e: string | null) => set({ error: e }, false, "auth/setError"),

        login: async () => {
          const { username, password } = get();

          if (username.trim().length < 3 || password.trim().length < 3) {
            set({ status: "error", error: "Минимум 3 символа в каждом поле" });
            return;
          }

          try {
            set({ status: "loading", error: null }, false, "auth/login/request");
            const res = await loginRequest({ username, password });
            const { accessToken, refreshToken, ...user } = res;
            set(
              {
                user,
                accessToken,
                refreshToken,
                status: "authenticated",
                error: null,
                password: "",
              },
              false,
              "auth/login/success",
            );
            alert(`Welcome, ${user.firstName}!`);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (e: any) {
            const msg = e.response.data.message ?? e.message ?? "Ошибка авторизации";
            alert(msg);
            set({ status: "error", error: msg }, false, "auth/login/failure");
          }
        },

        logout: () =>
          set(
            {
              user: null,
              accessToken: null,
              refreshToken: null,
              status: "idle",
              error: null,
              username: "",
              password: "",
            },
            false,
            "auth/logout",
          ),

        isHydrated: false,
        setHydrated: (v) => set({ isHydrated: v }, false, "auth/setHydrated"),
      }),
      {
        name: "auth",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          user: state.user,
          accessToken: state.accessToken,
          status: state.status === "authenticated" ? "authenticated" : "idle",
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true);
        },
      },
    ),
    { name: "auth-store" },
  ),
);
