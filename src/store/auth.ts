import { create } from "zustand";
import { persist } from "zustand/middleware";

// Simple email-based authentication store with localStorage persistence
// No actual authentication - just tracks logged in user's email
type AuthStore = {
      email: string | null;
      setEmail: (email: string) => void;
      logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
      persist(
            (set) => ({
                  email: null,
                  setEmail: (email: string) => set({ email }),
                  logout: () => set({ email: null }),
            }),
            { name: "auth-storage" }
      )
)