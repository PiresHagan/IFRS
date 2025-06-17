import { create } from "zustand";
import { Message, History } from "@/types/store";

type MessageState = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  history: History[];
  setHistory: (history: History[]) => void;
  streaming: boolean;
  setStreaming: (streaming: boolean) => void;
  isFirstMessage: boolean;
  setIsFirstMessage: (isFirstMessage: boolean) => void;
  historyId: string | null;
  setHistoryId: (history_id: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  defaultSpeechToTextLanguage: string;
  setDefaultSpeechToTextLanguage: (defaultSpeechToTextLanguage: string) => void;
  defaultWebTextToSpeechLanguageType: string;
  defaultWebTextToSpeechLanguageWebAPI: string | null;
  setDefaultWebTextToSpeechLanguageType: (
    defaultWebTextToSpeechLanguageType: string
  ) => void;
  setDefaultWebTextToSpeechLanguageWebAPI: (
    defaultWebTextToSpeechLanguageWebAPI: string
  ) => void;
  textToSpeechEnabled: boolean;
  setTextToSpeechEnabled: (textToSpeechEnabled: boolean) => void;
  defualtTextSpeechSettings: any;
  setDefualtTextSpeechSettings: (
    defualtTextSpeechSettings: any
  ) => void;
  ttsVoice: SpeechSynthesisVoice | null;
  setTtsVoice: (voice: SpeechSynthesisVoice | null) => void;
  ttsRate: number;
  setTtsRate: (rate: number) => void;
  ttsPitch: number;
  setTtsPitch: (pitch: number) => void;
  ttsVolume: number;
  setTtsVolume: (volume: number) => void;
  elevenLabsApiKeyPresent: boolean;
  elevenLabsApiKeyValid: boolean;
  voices: {
    voice_id: string;
    name: string;
  }[];
  setElevenLabsApiKeyPresent: (elevenLabsApiKeyPresent: boolean) => void;
  setElevenLabsApiKeyValid: (elevenLabsApiKeyValid: boolean) => void;
  setVoices: (voices: { voice_id: string; name: string }[]) => void;

  elevenLabsDefaultVoice: string;
  setElevenLabsDefaultVoice: (elevenLabsDefaultVoice: string) => void;
};

export default create<MessageState>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  history: [],
  setHistory: (history) => set({ history }),
  streaming: false,
  setStreaming: (streaming) => set({ streaming }),
  isFirstMessage: true,
  setIsFirstMessage: (isFirstMessage) => set({ isFirstMessage }),
  historyId: null,
  setHistoryId: (historyId) => set({ historyId }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  isProcessing: false,
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  defaultSpeechToTextLanguage: "en-US",
  setDefaultSpeechToTextLanguage: (defaultSpeechToTextLanguage) =>
    set({ defaultSpeechToTextLanguage }),
  defaultWebTextToSpeechLanguageType: "web_api",
  defaultWebTextToSpeechLanguageWebAPI: null,
  setDefaultWebTextToSpeechLanguageType: (defaultWebTextToSpeechLanguageType) =>
    set({ defaultWebTextToSpeechLanguageType }),
  setDefaultWebTextToSpeechLanguageWebAPI: (
    defaultWebTextToSpeechLanguageWebAPI
  ) => set({ defaultWebTextToSpeechLanguageWebAPI }),
  textToSpeechEnabled: false,
  setTextToSpeechEnabled: (textToSpeechEnabled) => {
    set({ textToSpeechEnabled });
    localStorage.setItem('textToSpeechEnabled', JSON.stringify(textToSpeechEnabled));
  },
  defualtTextSpeechSettings: {},
  setDefualtTextSpeechSettings: (defualtTextSpeechSettings) =>
    set({ defualtTextSpeechSettings }),
  ttsVoice: null,
  setTtsVoice: (voice) => {
    set({ ttsVoice: voice });
    localStorage.setItem('ttsVoiceName', voice ? voice.name : '');
  },
  ttsRate: 1,
  setTtsRate: (rate) => {
    set({ ttsRate: rate });
    localStorage.setItem('ttsRate', rate.toString());
  },
  ttsPitch: 1,
  setTtsPitch: (pitch) => {
    set({ ttsPitch: pitch });
    localStorage.setItem('ttsPitch', pitch.toString());
  },
  ttsVolume: 1,
  setTtsVolume: (volume) => {
    set({ ttsVolume: volume });
    localStorage.setItem('ttsVolume', volume.toString());
  },
  elevenLabsApiKeyPresent: false,
  elevenLabsApiKeyValid: false,
  setElevenLabsApiKeyPresent: (elevenLabsApiKeyPresent) =>
    set({ elevenLabsApiKeyPresent }),
  setElevenLabsApiKeyValid: (elevenLabsApiKeyValid) =>
    set({ elevenLabsApiKeyValid }),
  voices: [],
  setVoices: (voices) => set({ voices }),
  elevenLabsDefaultVoice: "",
  setElevenLabsDefaultVoice: (elevenLabsDefaultVoice) =>
    set({ elevenLabsDefaultVoice }),
}));