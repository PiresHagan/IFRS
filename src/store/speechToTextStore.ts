import { create } from "zustand";

type SpeechToTextStore = {
  supported: boolean;
  setSupported: (supported: boolean) => void;
}

export default create<SpeechToTextStore>((set) => ({
  supported: false,
  setSupported: (supported) => set({ supported }),
}));
