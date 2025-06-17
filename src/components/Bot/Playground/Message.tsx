import { CheckIcon, ClipboardIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@context/AuthContext";
import { useStoreMessage } from "@store/index";
import { useTextToSpeech } from "@hooks/useTextToSpeech";

type Props = {
  hideCopy?: boolean;
  botAvatar?: JSX.Element;
  userAvatar?: JSX.Element;
  message: string;
  botResponse?: string;
};

export const PlaygroundMessage = (props: Props) => {
  const [isBtnPressed, setIsBtnPressed] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { chatAppearance } = useAuth();
  const {
    textToSpeechEnabled,
    ttsVoice,
    ttsRate,
    ttsPitch,
    ttsVolume
  } = useStoreMessage();
  const { speak, stop, speaking } = useTextToSpeech({
    onStart: () => setIsSpeaking(true),
    onEnd: () => setIsSpeaking(false),
    onError: () => setIsSpeaking(false)
  });
  const hasSpoken = useRef(false);
  const prevResponseRef = useRef<string | undefined>("");

  useEffect(() => {
    if (props.botResponse !== prevResponseRef.current) {
      hasSpoken.current = false;
      prevResponseRef.current = props.botResponse;
    }
  }, [props.botResponse]);

  useEffect(() => {
    if (
      props.botResponse && 
      textToSpeechEnabled && 
      !hasSpoken.current
    ) {
      speak({
        text: props.botResponse,
        voice: ttsVoice || undefined,
        rate: ttsRate,
        pitch: ttsPitch,
        volume: ttsVolume
      });
      hasSpoken.current = true;
    }

    return () => {
      stop();
    };
  }, [props.botResponse, textToSpeechEnabled, ttsVoice, ttsRate, ttsPitch, ttsVolume]);
  
  React.useEffect(() => {
    if (isBtnPressed) {
      setTimeout(() => {
        setIsBtnPressed(false);
      }, 4000);
    }
  }, [isBtnPressed]);

  useEffect(() => {
    setIsSpeaking(speaking);
  }, [speaking]);

  return (
    <>
      <div
        className={`group w-full 
      `}
      >
        <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex lg:px-0 m-auto w-full">
          <div className="flex flex-row gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 lg:px-0 m-auto w-full">
            <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
              <div className="flex flex-grow flex-col gap-3">
                <div className="min-h-20 flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
                  <div
                    className="w-full p-3 rounded-r-lg rounded-bl-lg"
                    style={{
                      background: chatAppearance?.humanStyleBgColor,
                      color: chatAppearance?.humanStyleTextColor,
                    }}
                  >
                    <p className="text-sm">{props.message}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`group w-full
        `}
      >
        <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex lg:px-0 m-auto w-full">
          <div className="flex flex-row gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 lg:px-0 m-auto w-full">
            <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
              <div className="flex flex-grow flex-col gap-3">
                <div className="min-h-20 flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
                  <div
                    className="w-full p-3 rounded-l-lg rounded-br-lg"
                    style={{
                      background: chatAppearance?.botStyleBgColor,
                      color: chatAppearance?.botStyleTextColor,
                    }}
                  >
                    <p className="text-sm">{props?.botResponse || ""}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {textToSpeechEnabled && props.botResponse && (
                <button
                  onClick={() => {
                    speak({
                      text: props.botResponse || "",
                      voice: ttsVoice || undefined,
                      rate: ttsRate,
                      pitch: ttsPitch,
                      volume: ttsVolume
                    });
                  }}
                  className={`flex items-center justify-center w-8 h-8 rounded-full 
                    ${isSpeaking 
                      ? "bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-400 dark:ring-blue-500" 
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    } 
                    transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                  title={isSpeaking ? "Speaking" : "Read aloud"}
                >
                  <SpeakerWaveIcon 
                    className={`w-4 h-4 
                      ${isSpeaking 
                        ? "text-blue-500 animate-pulse" 
                        : "text-gray-400 group-hover:text-gray-500"
                      }`} 
                  />
                </button>
              )}
              {!props.hideCopy && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(props.botResponse || '');
                    setIsBtnPressed(true);
                  }}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  {!isBtnPressed ? (
                    <ClipboardIcon className="w-4 h-4 text-gray-400 group-hover:text-gray-500" />
                  ) : (
                    <CheckIcon className="w-4 h-4 text-green-400 group-hover:text-green-500" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
