import { useState, useRef, useEffect } from 'react';
import { TextToSpeechProps, SpeakArgs } from '@/types/bot';

export const useTextToSpeech = (props: TextToSpeechProps = {}) => {
  const { onStart = () => {}, onEnd = () => {}, onError = () => {} } = props;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const speechSynthesis = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      speechSynthesis.current = window.speechSynthesis;
      setSupported(true);
      
      const loadVoices = () => {
        const availableVoices = speechSynthesis.current?.getVoices() || [];
        setVoices(availableVoices);
      };
      
      loadVoices();
      if (speechSynthesis.current.onvoiceschanged !== undefined) {
        speechSynthesis.current.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const speak = ({ text, voice, rate = 1, pitch = 1, volume = 1, lang }: SpeakArgs) => {
    if (!supported || !speechSynthesis.current) return;
    
    stop();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voice) utterance.voice = voice;
    if (lang) utterance.lang = lang;
    
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    
    utterance.onstart = () => {
      setSpeaking(true);
      onStart();
    };
    
    utterance.onend = () => {
      setSpeaking(false);
      onEnd();
    };
    
    utterance.onerror = (error) => {
      setSpeaking(false);
      onError(error);
    };
    
    speechSynthesis.current.speak(utterance);
  };

  const stop = () => {
    if (!supported || !speechSynthesis.current) return;
    speechSynthesis.current.cancel();
    setSpeaking(false);
  };

  const pause = () => {
    if (!supported || !speechSynthesis.current) return;
    speechSynthesis.current.pause();
  };

  const resume = () => {
    if (!supported || !speechSynthesis.current) return;
    speechSynthesis.current.resume();
  };

  return {
    speak,
    stop,
    pause,
    resume,
    speaking,
    supported,
    voices,
  };
}; 