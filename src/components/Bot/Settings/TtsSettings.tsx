import { useEffect, useState } from "react";
import { useStoreMessage } from "@store/index";
import { useTextToSpeech } from "@hooks/useTextToSpeech";
import { PlayIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";

export const TtsSettings = () => {
  const {
    textToSpeechEnabled,
    setTextToSpeechEnabled,
    ttsVoice,
    setTtsVoice,
    ttsRate,
    setTtsRate,
    ttsPitch,
    setTtsPitch,
    ttsVolume,
    setTtsVolume
  } = useStoreMessage();
  
  const { voices, supported, speak } = useTextToSpeech();
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>(ttsVoice?.name || "");
  
  useEffect(() => {
    const savedVoiceName = localStorage.getItem("ttsVoiceName");
    if (savedVoiceName) {
      setSelectedVoiceName(savedVoiceName);
    }
    
    const savedRate = localStorage.getItem("ttsRate");
    if (savedRate) {
      setTtsRate(parseFloat(savedRate));
    }
    
    const savedPitch = localStorage.getItem("ttsPitch");
    if (savedPitch) {
      setTtsPitch(parseFloat(savedPitch));
    }
    
    const savedVolume = localStorage.getItem("ttsVolume");
    if (savedVolume) {
      setTtsVolume(parseFloat(savedVolume));
    }
  }, []);
  
  useEffect(() => {
    if (voices.length > 0 && selectedVoiceName) {
      const matchedVoice = voices.find(v => v.name === selectedVoiceName);
      if (matchedVoice) {
        setTtsVoice(matchedVoice);
      }
    }
  }, [voices, selectedVoiceName]);
  
  const testVoice = () => {
    speak({
      text: "This is a test of the text-to-speech feature with the current settings.",
      voice: ttsVoice || undefined,
      rate: ttsRate,
      pitch: ttsPitch,
      volume: ttsVolume
    });
  };
  
  if (!supported) {
    return (
      <div className="p-4 border rounded-md bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <p className="text-red-600 dark:text-red-400">
          Your browser doesn't support text-to-speech.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Text-to-Speech Settings</h2>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="tts-toggle"
          checked={textToSpeechEnabled}
          onChange={(e) => setTextToSpeechEnabled(e.target.checked)}
          className="mr-2 h-4 w-4"
        />
        <label htmlFor="tts-toggle" className="text-sm flex items-center">
          <SpeakerWaveIcon className="h-4 w-4 mr-1" />
          Enable text-to-speech for bot responses
        </label>
      </div>
      
      <div className="space-y-3 border p-3 rounded-md dark:border-gray-700">
        <div className="form-group">
          <label htmlFor="voice-select" className="block text-sm mb-1">Voice</label>
          <select
            id="voice-select"
            value={selectedVoiceName}
            onChange={(e) => {
              setSelectedVoiceName(e.target.value);
              const selectedVoice = voices.find(v => v.name === e.target.value) || null;
              setTtsVoice(selectedVoice);
            }}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            disabled={!textToSpeechEnabled}
          >
            <option value="">Default Voice</option>
            {voices.map(voice => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="rate-slider" className="block text-sm mb-1">
            Rate: {ttsRate.toFixed(1)}
          </label>
          <input
            id="rate-slider"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={ttsRate}
            onChange={(e) => setTtsRate(parseFloat(e.target.value))}
            className="w-full"
            disabled={!textToSpeechEnabled}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="pitch-slider" className="block text-sm mb-1">
            Pitch: {ttsPitch.toFixed(1)}
          </label>
          <input
            id="pitch-slider"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={ttsPitch}
            onChange={(e) => setTtsPitch(parseFloat(e.target.value))}
            className="w-full"
            disabled={!textToSpeechEnabled}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="volume-slider" className="block text-sm mb-1">
            Volume: {ttsVolume.toFixed(1)}
          </label>
          <input
            id="volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={ttsVolume}
            onChange={(e) => setTtsVolume(parseFloat(e.target.value))}
            className="w-full"
            disabled={!textToSpeechEnabled}
          />
        </div>
        
        <button
          onClick={testVoice}
          className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          disabled={!textToSpeechEnabled}
        >
          <PlayIcon className="h-4 w-4 mr-2" />
          Test Voice
        </button>
      </div>
    </div>
  );
}; 