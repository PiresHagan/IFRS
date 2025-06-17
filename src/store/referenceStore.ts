import { create } from "zustand";

type ReferenceState = {
  openReferences: boolean;
  setOpenReferences: (openReferences: boolean) => void;
  referenceData: any;
  setReferenceData: (referenceData: any) => void;
};

export default create<ReferenceState>((set) => ({
  openReferences: false,
  setOpenReferences: (openReferences) => set({ openReferences }),
  referenceData: {},
  setReferenceData: (referenceData) => set({ referenceData }),
}));