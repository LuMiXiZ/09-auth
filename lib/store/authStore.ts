"use client";

import { create } from "zustand";
import { User } from "@/types/user";

export type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useAuth = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => set({ user, isAuthenticated: true }),
  clearIsAuthenticated: () =>
    set({
      isAuthenticated: false,
      user: null,
    }),
}));
