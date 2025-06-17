import messageStore from "./messageStore";
import referenceStore from "./referenceStore";
import speechToTextStore from "./speechToTextStore";
import publicStoreMessage from "./publicStoreMessage";

export const useStoreMessage = messageStore;
export const useStoreReference = referenceStore;
export const useStoreSpeechToText = speechToTextStore;
export const usePublicStoreMessage = publicStoreMessage;
