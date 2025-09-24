import { AuthResponse, NeedData } from "@/types/auth";
import { api } from "./http";

export async function loginRequest(needData: NeedData): Promise<AuthResponse> {
  const { data } = await api.post("/auth/login", needData);
  return data;
}
