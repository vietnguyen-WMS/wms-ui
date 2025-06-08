import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface UserInterface {
  accessToken: string;
  username: string;
  firstName: string;
  image: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  user: UserInterface | null;
  login: (user: UserInterface) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        isAuthenticated: false,
        isAuthChecked: false,
        user: null,

        login: (user) => {
          set({
            isAuthenticated: true,
            user,
            isAuthChecked: true,
          });
        },

        logout: () => {
          set({
            isAuthenticated: false,
            user: null,
            isAuthChecked: true,
          });
        },

        checkAuth: async () => {
          const user = get().user;

          if (!user?.accessToken) {
            set({ isAuthenticated: false, user: null, isAuthChecked: true });
            return;
          }

          try {
            const res = await fetch("https://dummyjson.com/auth/me", {
              method: "GET",
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            });

            if (!res.ok) throw new Error("Unauthorized");

            const data = await res.json();

            set({
              isAuthenticated: true,
              user: {
                ...user, // keep existing accessToken
                username: data.username,
                firstName: data.firstName,
                image: data.image,
              },
              isAuthChecked: true,
            });
          } catch (error) {
            console.warn("Auth check failed", error);
            set({
              isAuthenticated: false,
              user: null,
              isAuthChecked: true,
            });
          }
        },
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

export const useAuth = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAuthChecked = useAuthStore((s) => s.isAuthChecked);
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const checkAuth = useAuthStore((s) => s.checkAuth);

  return { isAuthenticated, isAuthChecked, user, login, logout, checkAuth };
};

export default useAuthStore;
