import { useEffect, useRef, useState } from "react";
import { useStoreMessage } from "@store/index";
import { notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import { postTTS } from "@services/hook";
import { ElevenLabsTTSProps, VoiceOptions } from "@/types/common";

export const useElevenLabsTTS = (): ElevenLabsTTSProps => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { elevenLabsDefaultVoice } = useStoreMessage();
  const [isPlaying, setIsPlaying] = useState(false);

  const onSubmit = async (values: { text: string; voice_id: string }) => {
    const response = await postTTS(values);
    return response.data;
  };

  const { mutateAsync: generateAudio, isLoading } = useMutation(onSubmit);

  const speak = async (args: VoiceOptions) => {
    const { text } = args;

    try {
      const data = await generateAudio({
        text,
        voice_id: elevenLabsDefaultVoice,
      });

      const blob = new Blob([data], { type: "audio/mpeg" });
      const url = window.URL.createObjectURL(blob);
      audioRef.current = new Audio(url);

      audioRef.current.onended = () => {
        setIsPlaying(false);
      };

      audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.log(error);

      notification.error({
        message: "Error",
        description: "Something went wrong while trying to play the audio",
      });
    }
  };

  const cancel = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      cancel();
    };
  }, []);

  return {
    speak,
    cancel,
    isPlaying,
    loading: isLoading,
  };
};
