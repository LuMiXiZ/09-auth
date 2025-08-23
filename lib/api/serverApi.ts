import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { ServerResponse } from "./clientApi";

export const checkServerSession = async () => {
  const cookieData = await cookies();
  const response = await nextServer.get<ServerResponse>("auth/session", {
    headers: { Cookie: cookieData.toString() },
  });
  return response;
};

export const getServerMe = async () => {
  const cookieData = await cookies();
  const { data } = await nextServer.get<User>("users/me", {
    headers: { Cookie: cookieData.toString() },
  });
  return data;
};
