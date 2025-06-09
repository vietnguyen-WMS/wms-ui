import { create } from "zustand";

export interface UserInterface {
  username: string;
  firstName?: string;
  image?: string;
}

interface AuthState {
  user: UserInterface | null;
  isAuthLoading: boolean;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthLoading: true,
  checkAuth: async () => {
    set({ isAuthLoading: true });

    try {
      const res = await fetch("http://localhost:3000/auth/me", {
        credentials: "include",
      });

      if (res.ok) {
        const user = await res.json();
        set({ user });
      } else {
        set({ user: null });
      }
    } catch {
      set({ user: null });
    } finally {
      set({ isAuthLoading: false });
    }
  },

  logout: () => {
    fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    set({ user: null });
  },
}));

export const useAuth = () => {
  const user = useAuthStore((s) => s.user);
  const isAuthLoading = useAuthStore((s) => s.isAuthLoading);
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const logout = useAuthStore((s) => s.logout);

  return { user, isAuthLoading, checkAuth, logout };
};

export default useAuthStore;
