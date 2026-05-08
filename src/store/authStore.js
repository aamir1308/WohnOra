import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      role: null,
      login: (userData) => set({ user: userData, isLoggedIn: true, role: userData.role }),
      logout: () => set({ user: null, isLoggedIn: false, role: null }),
      updateUserFavorites: (updatedFavorites) =>
        set((state) => ({
          user: state.user ? { ...state.user, favorites: updatedFavorites } : null,
        })),
      updateUserPreferences: (updatedPreferences) =>
        set((state) => ({
          user: state.user ? { ...state.user, preferences: updatedPreferences } : null,
        })),
    }),
    {
      name: 'wohnora-auth',
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn, role: state.role }),
    }
  )
);