import { create } from "zustand";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  loading: boolean;
  isSigningUp: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setSigningUp: (isSigningUp: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  isSigningUp: false,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setSigningUp: (isSigningUp) => set({ isSigningUp }),
}));
