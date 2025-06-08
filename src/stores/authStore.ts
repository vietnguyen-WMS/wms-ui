import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserInterface {
  accessToken: string;
  username: string;
  firstName: string;
  image: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserInterface | null;
  login: (user: UserInterface) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: null,
        login: (user: UserInterface) => set({ isAuthenticated: true, user }),
        logout: () => set({ isAuthenticated: false, user: null }),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

export const useAuth = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  return { isAuthenticated, user, login, logout };
};

export default useAuthStore;
