import { useAuthStore } from "@/store/auth.store";

export default function useAuthReady() {
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const status = useAuthStore((s) => s.status);
  return { isHydrated, status, isAuthed: isHydrated && status === "authenticated" };
}
