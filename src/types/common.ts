import { AppearanceType } from "./config";
import { User } from "./auth";

export interface PrivateRouteProps {
    children: React.ReactNode;
}

export interface ErrorResponse {
    [key: string]: string[];
}

export interface GenericConfirmationModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title?:string;
    message?:string|undefined;
    disable:boolean,
}

export type AuthProviderProps = {
    children: React.ReactNode;
};
  
export type Profile = {
    username: string;
    avatar: string;
    user: User;
    isAdministrator: boolean;
};

export interface AppContextInterface {
    profile: Profile | null;
    isLogged: boolean;
    login: (
      token: string,
      refresh: string,
      user: User,
      appearanceData: AppearanceType
    ) => void;
    logout: () => void;
    chatAppearance: AppearanceType | null;
}

export type VoiceOptions = {
    text: string;
    rate?: number;
    pitch?: number;
    volume?: number;
};
  
export interface ElevenLabsTTSProps {
    speak: (args: VoiceOptions) => void;
    cancel: () => void;
    isPlaying: boolean;
    loading: boolean;
}

export interface SpeechSynthesisProps {
    onEnd?: () => void;
}

export interface SpeechSynthesisState {
    supported: boolean;
    speak: (args?: VoiceOptions) => void;
    speaking: boolean;
    cancel: () => void;
    voices: SpeechSynthesisVoice[];
    pause: () => void;
}