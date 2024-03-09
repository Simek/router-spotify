import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { PlayerState } from "@/types/spotify";

type PlayerStore = {
  player: PlayerState | null;
  setPlayerData: (token: PlayerState | null) => void;
};

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set) => ({
      player: null,
      setPlayerData: (player) => set(() => ({ player })),
    }),
    {
      name: "player-data",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
