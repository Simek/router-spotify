import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { type User } from "@/types/spotify";

type UserStore = {
  user: User | null;
  setUser: (token: User | null) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user })),
    }),
    {
      name: "user-data",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
