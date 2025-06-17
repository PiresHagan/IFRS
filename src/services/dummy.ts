import { BotPlaygroundHistory } from "@components/Bot/Playground/types";
import { BotData } from "@/types/bot";
import { ConversationsByType } from "@/types/converstations";

export const registerInfo = new Promise<{
  data: { isRegistrationAllowed: boolean };
}>((resolve) => {
  setTimeout(() => {
    const response = {
      data: { isRegistrationAllowed: false },
    };
    resolve(response);
  }, 1000); // Simulating an asynchronous operation with a delay
});

export const fetchBot = (): Promise<BotData> => {
  return new Promise((resolve) => {
    const data: BotData = {
      data: [
        {
          id: "cln8l1qfj0001p62ri4e82ff2",
          publicId: "e2484da3-79eb-4d87-99ff-5148dddb184e",
          name: "Search Product",
          user_id: 1,
          description: null,
          createdAt: "2023-10-02T07:42:01.999Z",
          temperature: 0.7,
          model: "ScaffoldGPT-1.0-turbo",
          provider: "openai",
          embedding: "openai",
          streaming: true,
          showRef: false,
          questionGeneratorPrompt:
            "Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question. Chat History: {chat_history} Follow Up Input: {question} Standalone question:",
          qaPrompt:
            "You are a helpful AI assistant. Use the following pieces of context to answer the question at the end. If you don't know the answer, just say you don't know. DO NOT try to make up an answer. If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context. {context} Question: {question} Helpful answer in markdown:",
          voice_to_text_type: "web_api",
          text_to_voice_enabled: false,
          text_to_voice_type: "web_api",
          text_to_voice_type_metadata: {},
          use_hybrid_search: false,
          haveDataSourcesBeenAdded: true,
          source: [
            {
              type: "website",
            },
          ],
        },
      ],
    };

    setTimeout(() => {
      resolve(data);
    }, 1000); // Simulating a delay of 1 second (replace with your actual API call)
  });
};

export const fetchEmbedBot = (
  id: string | undefined
): Promise<{ data: { inProgress: boolean; public_id: string } }> => {
  return new Promise((resolve) => {
    // Simulate a delayed response (replace with actual API call)
    console.log("id", id);
    setTimeout(() => {
      const response = {
        data: {
          inProgress: false,
          public_id: "e2484da3-79eb-4d87-99ff-5148dddb184e",
        },
      };
      resolve(response);
    }, 1000); // Simulating a delay of 1 second (replace with your actual API call)
  });
};

export const fetchHistory = (
  id: string | undefined
): Promise<{ data: BotPlaygroundHistory }> => {
  return new Promise((resolve) => {
    // Simulate a delayed response (replace with actual API call)
    console.log("id", id);
    setTimeout(() => {
      const data: any = {
        history: [],
        streaming: true,
        other_info: null,
        text_to_speech_type: "web_api",
        text_to_speech_settings: {},
        text_to_speech_enabled: false,
        eleven_labs_api_key_present: true,
        eleven_labs_api_key_valid: true,
        voices: [
          {
            voice_id: "21m00Tcm4TlvDq8ikWAM",
            name: "Rachel",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "calm",
              age: "young",
              gender: "female",
              "use case": "narration",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/21m00Tcm4TlvDq8ikWAM/df6788f9-5c96-470d-8312-aab3b3d8f50a.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: [],
          },
          {
            voice_id: "2EiwWnXFnvU5JabPnv8n",
            name: "Clyde",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "war veteran",
              age: "middle aged",
              gender: "male",
              "use case": "video games",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/2EiwWnXFnvU5JabPnv8n/65d80f52-703f-4cae-a91d-75d4e200ed02.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "AZnzlk1XvdvUeBnXmlld",
            name: "Domi",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "strong",
              age: "young",
              gender: "female",
              "use case": "narration",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/AZnzlk1XvdvUeBnXmlld/508e12d0-a7f7-4d86-a0d3-f3884ff353ed.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: [],
          },
          {
            voice_id: "CYw3kZ02Hs0563khs1Fj",
            name: "Dave",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "british-essex",
              description: "conversational",
              age: "young",
              gender: "male",
              "use case": "video games",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/CYw3kZ02Hs0563khs1Fj/872cb056-45d3-419e-b5c6-de2b387a93a0.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "D38z5RcWu1voky8WS1ja",
            name: "Fin",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "irish",
              description: "sailor",
              age: "old",
              gender: "male",
              "use case": "video games",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/D38z5RcWu1voky8WS1ja/a470ba64-1e72-46d9-ba9d-030c4155e2d2.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "EXAVITQu4vr4xnSDxMaL",
            name: "Bella",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "soft",
              age: "young",
              gender: "female",
              "use case": "narration",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/EXAVITQu4vr4xnSDxMaL/941b779e-c2ad-48d4-bddb-28d1a68fa27e.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: [],
          },
          {
            voice_id: "ErXwobaYiN019PkySvjV",
            name: "Antoni",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "well-rounded",
              age: "young",
              gender: "male",
              "use case": "narration",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/ErXwobaYiN019PkySvjV/ee9ac367-91ee-4a56-818a-2bd1a9dbe83a.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: [],
          },
          {
            voice_id: "GBv7mTt0atIp3Br8iCZE",
            name: "Thomas",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "calm",
              age: "young",
              gender: "male",
              "use case": "meditation",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/GBv7mTt0atIp3Br8iCZE/98542988-5267-4148-9a9e-baa8c4f14644.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "IKne3meq5aSn9XLyUdCD",
            name: "Charlie",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "australian",
              description: "casual",
              age: "middle aged",
              gender: "male",
              "use case": "conversational",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/IKne3meq5aSn9XLyUdCD/102de6f2-22ed-43e0-a1f1-111fa75c5481.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "LcfcDJNUP1GQjkzn1xUU",
            name: "Emily",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "calm",
              age: "young",
              gender: "female",
              "use case": "meditation",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/LcfcDJNUP1GQjkzn1xUU/e4b994b7-9713-4238-84f3-add8fccaaccd.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "MF3mGyEYCl7XYWbV9V6O",
            name: "Elli",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "emotional",
              age: "young",
              gender: "female",
              "use case": "narration",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/MF3mGyEYCl7XYWbV9V6O/d8ecadea-9e48-4e5d-868a-2ec3d7397861.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: [],
          },
          {
            voice_id: "N2lVS1w4EtoT3dr4eOWO",
            name: "Callum",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "hoarse",
              age: "middle aged",
              gender: "male",
              "use case": "video games",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/N2lVS1w4EtoT3dr4eOWO/ac833bd8-ffda-4938-9ebc-b0f99ca25481.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "ODq5zmih8GrVes37Dizd",
            name: "Patrick",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "shouty",
              age: "middle aged",
              gender: "male",
              "use case": "video games",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/ODq5zmih8GrVes37Dizd/0ebec87a-2569-4976-9ea5-0170854411a9.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "SOYHLrjzK2X1ezoPC6cr",
            name: "Harry",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "anxious",
              age: "young",
              gender: "male",
              "use case": "video games",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/SOYHLrjzK2X1ezoPC6cr/86d178f6-f4b6-4e0e-85be-3de19f490794.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "TX3LPaxmHKxFdv7VOQHJ",
            name: "Liam",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              age: "young",
              gender: "male",
              "use case": "narration",
              "description ": "neutral",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/TX3LPaxmHKxFdv7VOQHJ/63148076-6363-42db-aea8-31424308b92c.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "ThT5KcBeYPX3keUQqHPh",
            name: "Dorothy",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "british",
              description: "pleasant",
              age: "young",
              gender: "female",
              "use case": "children's stories",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/ThT5KcBeYPX3keUQqHPh/981f0855-6598-48d2-9f8f-b6d92fbbe3fc.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "TxGEqnHWrfWFTfGW9XjX",
            name: "Josh",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "deep",
              age: "young",
              gender: "male",
              "use case": "narration",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/TxGEqnHWrfWFTfGW9XjX/3ae2fc71-d5f9-4769-bb71-2a43633cd186.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: [],
          },
          {
            voice_id: "VR6AewLTigWG4xSOukaG",
            name: "Arnold",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "crisp",
              age: "middle aged",
              gender: "male",
              "use case": "narration",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/VR6AewLTigWG4xSOukaG/316050b7-c4e0-48de-acf9-a882bb7fc43b.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: [],
          },
          {
            voice_id: "XB0fDUnXU5powFXDhCwa",
            name: "Charlotte",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "english-swedish",
              description: "seductive",
              age: "middle aged",
              gender: "female",
              "use case": "video games",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/XB0fDUnXU5powFXDhCwa/942356dc-f10d-4d89-bda5-4f8505ee038b.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "XrExE9yKIg1WjnnlVkGX",
            name: "Matilda",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "warm",
              age: "young",
              gender: "female",
              "use case": "audiobook",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/XrExE9yKIg1WjnnlVkGX/b930e18d-6b4d-466e-bab2-0ae97c6d8535.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "Yko7PKHZNXotIFUBG7I9",
            name: "Matthew",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "british",
              age: "middle aged",
              gender: "male",
              "use case": "audiobook",
              "description ": "calm",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/Yko7PKHZNXotIFUBG7I9/02c66c93-a237-436f-8a7d-43e8c49bc6a3.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "ZQe5CZNOzWyzPSCn5a3c",
            name: "James",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "australian",
              description: "calm ",
              age: "old",
              gender: "male",
              "use case": "news",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/ZQe5CZNOzWyzPSCn5a3c/35734112-7b72-48df-bc2f-64d5ab2f791b.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "Zlb1dXrM653N07WRdFW3",
            name: "Joseph",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "british",
              age: "middle aged",
              gender: "male",
              "use case": "news",
              "description ": "ground reporter ",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/Zlb1dXrM653N07WRdFW3/daa22039-8b09-4c65-b59f-c79c48646a72.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "bVMeCyTHy58xNoL34h3p",
            name: "Jeremy",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american-irish",
              description: "excited",
              age: "young",
              gender: "male",
              "use case": "narration",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/bVMeCyTHy58xNoL34h3p/66c47d58-26fd-4b30-8a06-07952116a72c.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "flq6f7yk4E4fJM5XTYuZ",
            name: "Michael",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              age: "old",
              gender: "male",
              "use case": "audiobook",
              "description ": "orotund",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/flq6f7yk4E4fJM5XTYuZ/c6431a82-f7d2-4905-b8a4-a631960633d6.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "g5CIjZEefAph4nQFvHAz",
            name: "Ethan",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              age: "young",
              gender: "male",
              "use case": "ASMR",
              "description ": "whisper",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/g5CIjZEefAph4nQFvHAz/26acfa99-fdec-43b8-b2ee-e49e75a3ac16.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "jBpfuIE2acCO8z3wKNLl",
            name: "Gigi",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "childlish",
              age: "young",
              gender: "female",
              "use case": "animation",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/jBpfuIE2acCO8z3wKNLl/3a7e4339-78fa-404e-8d10-c3ef5587935b.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "jsCqWAovK2LkecY7zXl4",
            name: "Freya",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              age: "young",
              gender: "female",
              "description ": "overhyped",
              usecase: "video games",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/jsCqWAovK2LkecY7zXl4/8e1f5240-556e-4fd5-892c-25df9ea3b593.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "oWAxZDx7w5VEj9dCyTzz",
            name: "Grace",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american-southern",
              age: "young",
              gender: "female",
              "use case": "audiobook ",
              "description ": "gentle",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/oWAxZDx7w5VEj9dCyTzz/84a36d1c-e182-41a8-8c55-dbdd15cd6e72.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "onwK4e9ZLuTAKqWW03F9",
            name: "Daniel",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "british",
              description: "deep",
              age: "middle aged",
              gender: "male",
              "use case": "news presenter",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/onwK4e9ZLuTAKqWW03F9/7eee0236-1a72-4b86-b303-5dcadc007ba9.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "pMsXgVXv3BLzUgSXRplE",
            name: "Serena",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "pleasant",
              age: "middle aged",
              gender: "female",
              "use case": "interactive",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/pMsXgVXv3BLzUgSXRplE/d61f18ed-e5b0-4d0b-a33c-5c6e7e33b053.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "pNInz6obpgDQGcFmaJgB",
            name: "Adam",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "deep",
              age: "middle aged",
              gender: "male",
              "use case": "narration",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/pNInz6obpgDQGcFmaJgB/38a69695-2ca9-4b9e-b9ec-f07ced494a58.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: [],
          },
          {
            voice_id: "piTKgcLEGmPE4e6mEKli",
            name: "Nicole",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "whisper",
              age: "young",
              gender: "female",
              "use case": "audiobook",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/piTKgcLEGmPE4e6mEKli/c269a54a-e2bc-44d0-bb46-4ed2666d6340.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "t0jbNlBVZ17f02VDIeMI",
            name: "Jessie",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "raspy ",
              age: "old",
              gender: "male",
              "use case": "video games",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/t0jbNlBVZ17f02VDIeMI/e26939e3-61a4-4872-a41d-33922cfbdcdc.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "wViXBPUzp2ZZixB1xQuM",
            name: "Ryan",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              age: "middle aged",
              description: "soldier",
              accent: "american",
              gender: "male",
              "use case": "audiobook",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/wViXBPUzp2ZZixB1xQuM/4a82f749-889c-4097-85f0-a3826a28b1d8.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "yoZ06aMxZJJ28mfd3POQ",
            name: "Sam",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "raspy",
              age: "young",
              gender: "male",
              "use case": "narration",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/yoZ06aMxZJJ28mfd3POQ/ac9d1c91-92ce-4b20-8cc2-3187a7da49ec.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: [],
          },
          {
            voice_id: "z9fAnlkpzviPz146aGWa",
            name: "Glinda",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "american",
              description: "witch",
              age: "middle aged",
              gender: "female",
              "use case": "video games",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/z9fAnlkpzviPz146aGWa/cbc60443-7b61-4ebb-b8e1-5c03237ea01d.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "zcAOhNBS3c14rBihAFp1",
            name: "Giovanni",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "english-italian",
              description: "foreigner",
              age: "young",
              gender: "male",
              "use case": "audiobook",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/zcAOhNBS3c14rBihAFp1/e7410f8f-4913-4cb8-8907-784abee5aff8.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
          {
            voice_id: "zrHiDhphv9ZnVXBqCLjz",
            name: "Mimi",
            samples: null,
            category: "premade",
            fine_tuning: {
              language: null,
              is_allowed_to_fine_tune: false,
              fine_tuning_requested: false,
              finetuning_state: "not_started",
              verification_attempts: null,
              verification_failures: [],
              verification_attempts_count: 0,
              slice_ids: null,
              manual_verification: null,
              manual_verification_requested: false,
            },
            labels: {
              accent: "english-swedish",
              description: "childish",
              age: "young",
              gender: "female",
              "use case": "animation",
            },
            description: null,
            preview_url:
              "https://storage.googleapis.com/eleven-public-prod/premade/voices/zrHiDhphv9ZnVXBqCLjz/decbf20b-0f57-4fac-985b-a4f0290ebfc4.mp3",
            available_for_tiers: [],
            settings: null,
            sharing: null,
            high_quality_base_model_ids: ["eleven_multilingual_v1"],
          },
        ],
        messages: [],
        status: "success",
      };
      resolve({ data });
    }, 1000); // Simulating a delay of 1 second (replace with your actual API call)
  });
};

export const fetchBotDataSource = (): Promise<{
  data: {
    id: string;
    type: string;
    content: string;
    status: string;
  }[];
}> => {
  return new Promise((resolve) => {
    const data = {
      data: [],
    };

    setTimeout(() => {
      resolve(data);
    }, 1000); // Simulating a delay of 1 second (replace with your actual API call)
  });
};

export const fetchBotIntegration = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const data = [
      {
        name: "Telegram",
        channel: "telegram",
        logo: "/providers/telegram.svg",
        link: "https://core.telegram.org/bots#how-do-i-create-a-bot",
        description:
          "Set up a Telegram bot from your knowledge base to send and receive messages",
        fields: [
          {
            name: "telegram_bot_token",
            type: "string",
            title: "Bot token",
            inputType: "password",
            description: "Telegram bot token",
            help: "You can get it from @BotFather",
            requiredMessage: "Bot token is required",
            value: "",
            defaultValue: "",
          },
        ],
        isPaused: false,
        status: "CONNECT",
        color: "#fff",
        textColor: "#000",
        connectBtn: null,
      },
      {
        name: "Discord (🧪)",
        channel: "discord",
        logo: "/providers/discord.svg",
        link: "https://discord.com/developers/applications",
        description:
          "Set up a Discord bot from your knowledge base to send and receive messages",
        fields: [
          {
            name: "discord_application_id",
            type: "string",
            title: "Application ID",
            inputType: "password",
            description: "Discord application ID",
            help: "You can get it from Discord Developer Portal",
            requiredMessage: "Application ID is required",
            value: "",
            defaultValue: "",
          },
          {
            name: "discord_bot_token",
            type: "string",
            title: "Bot token",
            inputType: "password",
            description: "Discord bot token",
            help: "You can get it from Discord Developer Portal",
            requiredMessage: "Bot token is required",
            value: "",
            defaultValue: "",
          },
          {
            name: "discord_slash_command",
            type: "string",
            inputType: "string",
            title: "Slash command",
            description: "Discord slash command",
            help: "Bot needs to have slash command",
            requiredMessage: "Slash command is required",
            value: "help",
            defaultValue: "help",
          },
          {
            name: "discord_slash_command_description",
            type: "string",
            inputType: "string",
            title: "Slash command description",
            description: "Discord slash command description",
            help: "A description for the slash command",
            requiredMessage: "Slash command description is required",
            value: "Use this command to send messages to the bot",
            defaultValue: "Use this command to send messages to the bot",
          },
        ],
        isPaused: false,
        status: "CONNECT",
        color: "#fff",
        textColor: "#000",
        connectBtn: null,
      },
      {
        name: "WhatsApp (🧪)",
        channel: "whatsapp",
        logo: "/providers/whatsapp.svg",
        link: "https://developers.facebook.com/docs/whatsapp/guides",
        description:
          "Set up a WhatsApp bot from your knowledge base to send and receive messages",
        fields: [
          {
            name: "whatsapp_phone_number",
            type: "string",
            title: "WhatsApp phone number ID",
            inputType: "password",
            description: "WhatsApp phone number ID",
            help: "You can get it from WhatsApp Business API",
            requiredMessage: "WhatsApp phone number ID is required",
            value: "",
            defaultValue: "",
          },
          {
            name: "whatsapp_access_token",
            type: "string",
            title: "Access token",
            inputType: "password",
            description: "Access token",
            help: "You can get it from WhatsApp Business API",
            requiredMessage: "Access token is required",
            value: "",
            defaultValue: "",
          },
          {
            name: "whatsapp_verify_token",
            type: "string",
            title: "Verify token",
            inputType: "password",
            description: "Verify token",
            help: "A token to verify the webhook request",
            requiredMessage: "Verify token is required",
            value: "",
            defaultValue: "",
          },
          {
            name: "whatsapp_webhook_url",
            type: "webhook",
            title: "Webhook URL",
            inputType: "string",
            description: "Webhook URL",
            help: "A URL to receive webhook requests",
            requiredMessage: "Webhook URL is required",
            value: "",
            defaultValue: "",
          },
        ],
        isPaused: false,
        status: "CONNECT",
        color: "#fff",
        textColor: "#000",
        connectBtn: null,
      },
    ];

    if (data) {
      resolve({ data: data });
    } else {
      reject("Error fetching data");
    }
  });
};

export const fetchConversations = (): Promise<{
  message: string;
  data: ConversationsByType[];
}> => {
  return new Promise((resolve) => {
    const data = {
      message: "Success",
      data: [],
    };

    setTimeout(() => {
      resolve(data);
    }, 1000); // Simulating a delay of 1 second (replace with your actual API call)
  });
};

export const fetchAppearance = (): Promise<{
  public_id: string;
  data: {
    background_color: string;
    bot_name: string;
    chat_bot_bubble_style: {
      background_color: string;
      text_color: string;
    };
    chat_human_bubble_style: {
      background_color: string;
      text_color: string;
    };
    first_message: string;
  };
}> => {
  return new Promise((resolve) => {
    const data = {
      public_id: "e2484da3-79eb-4d87-99ff-5148dddb184e",
      data: {
        background_color: "#ffffff",
        bot_name: "ACME Inc. Bot",
        chat_bot_bubble_style: {
          background_color: "#C3CDDB",
          text_color: "#000000",
        },
        chat_human_bubble_style: {
          background_color: "#2590EB",
          text_color: "#ffffff",
        },
        first_message: "Hi, I'm here to help. What can I do for you today?",
      },
    };

    resolve(data);
  });
};

export const fetchBotSetting = (): Promise<{
  data: {
    id: string;
    name: string;
    model: string;
    public_id: string;
    temperature: number;
    embedding: string;
    qaPrompt: string;
    questionGeneratorPrompt: string;
    streaming: boolean;
    showRef: boolean;
    use_hybrid_search: boolean;
  };
}> => {
  return new Promise((resolve) => {
    const data = {
      data: {
        id: "cln8l1qfj0001p62ri4e82ff2",
        name: "general_hornet",
        model: "gpt-3.5-turbo",
        public_id: "e2484da3-79eb-4d87-99ff-5148dddb184e",
        temperature: 0.7,
        embedding: "openai",
        qaPrompt:
          "You are a helpful AI assistant. Use the following pieces of context to answer the question at the end. If you don't know the answer, just say you don't know...",
        questionGeneratorPrompt:
          "Given the following conversation and a follow-up question, rephrase the follow-up question to be a standalone question...",
        streaming: true,
        showRef: false,
        use_hybrid_search: false,
      },
    };

    resolve(data);
  });
};

// Usage

export const checkIsAdmin = new Promise<{
  data: { is_admin: boolean };
}>((resolve) => {
  setTimeout(() => {
    const response = {
      data: { is_admin: true },
    };
    resolve(response);
  }, 1000); // Simulating an asynchronous operation with a delay
});

export const profile = new Promise<{
  data: {
    id: number;
    username: string;
    password: string | null;
    email: string | null;
  };
}>((resolve) => {
  setTimeout(() => {
    const response = {
      data: {
        id: 1,
        username: "admin",
        password: null,
        email: null,
      },
    };
    resolve(response);
  }, 1000); // Simulating an asynchronous operation with a delay
});

export const allUsers = new Promise<{
  data: {
    user_id: number;
    username: string;
    password: string | null;
    email: string | null;
    createdAt: string | null;
    is_admin: boolean;
    bots: number;
  }[];
}>((resolve) => {
  setTimeout(() => {
    const response = {
      data: [
        {
          user_id: 1,
          username: "admin",
          password: null,
          email: "",
          createdAt: "2023-10-02T06:49:13.217Z",
          is_admin: true,
          bots: 2,
        },
        // Add more user objects if needed
      ],
    };
    resolve(response);
  }, 1000); // Simulating an asynchronous operation with a delay
});

export const fetchSetting = new Promise<{
  data: {
    noOfBotsPerUser: Number,
    allowUserToCreateBots: Boolean,
    allowUserToRegister: Boolean,
  };
}>((resolve) => {
  setTimeout(() => {
    const response = {
      data: {
        noOfBotsPerUser: 10,
        allowUserToCreateBots: true,
        allowUserToRegister: false,
      },
    };
    resolve(response);
  }, 1000); // Simulating an asynchronous operation with a delay
});
