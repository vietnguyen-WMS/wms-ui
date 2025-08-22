import { create } from 'zustand';
import api from '@services/api';
import { AUTH_ME, AUTH_LOGOUT } from '@/constants';

export interface UserInterface {
  username: string;
  firstName?: string;
  avatar?: string;
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
      const res = await api.get(AUTH_ME);

      if (res.status === 200) {
        const user = res.data;
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
    api.post(AUTH_LOGOUT);
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
