export type BotResponse = {
    id: string;
    chat: number;
    prompt: string;
    botResponse: string;
    createdOn: string;
    modifiedOn: string;
};

export type TextToSpeechProps = {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (error: SpeechSynthesisErrorEvent) => void;
  };
  
export type SpeakArgs = {
    text: string;
    voice?: SpeechSynthesisVoice;
    rate?: number;
    pitch?: number;
    volume?: number;
    lang?: string;
  };

export interface Bot {
    id: string;
    publicId: string;
    name: string;
    user_id: number;
    description: string | null;
    createdAt: string;
    temperature: number;
    model: string;
    provider: string;
    embedding: string;
    streaming: boolean;
    showRef: boolean;
    questionGeneratorPrompt: string;
    qaPrompt: string;
    voice_to_text_type: string;
    text_to_voice_enabled: boolean;
    text_to_voice_type: string;
    text_to_voice_type_metadata: Record<string, any>;
    use_hybrid_search: boolean;
    haveDataSourcesBeenAdded: boolean;
    source: { type: string }[];
  }
  
export interface BotData {
    data: Bot[];
}