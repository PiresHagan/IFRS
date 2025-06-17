import { useStoreMessage } from "@store/index";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { showErrorNotification } from "@utils/errorHandler";
import { getChatDetail, createChat, createIntegrationMessage } from "@services/chat";
import { PublicChat } from "@/types/chat";
import { BotResponse } from "@/types/bot";
import { Msg } from "@/types/message";

export const useMessage = () => {
  const queryClient = useQueryClient()
  const {
    // history,
    messages,
    setHistory,
    setMessages,
    setStreaming,
    streaming,
    setIsFirstMessage,
    historyId,
    setHistoryId,
    isLoading,
    setIsLoading,
    isProcessing,
    isFirstMessage,
  } = useStoreMessage();

  const param = useParams<{ id: string }>();
  const [chatId, setChatId] = useState<string>("")

  useMemo(() => {
    const fetchMessages = async () => {
      try {
        const response: PublicChat = await getChatDetail(param.id!.toString());
        const msgs: Msg[] = [];
        response.messages.map((item) => {
          msgs.push({
            message: item.prompt,
            botResponse: item.botResponse,
          });
        });

        setMessages(msgs);

      } catch (error) {
        console.error(error);
      }
      finally {
        setIsLoading(false);
      }
    };
    if (param?.id) {
      fetchMessages();
    }
    return () => { };
  }, [param?.id]);

  // const notStreamingRequest = async (message: string) => {
  //   let newMessage = [
  //     ...messages,
  //     {
  //       isBot: false,
  //       message,
  //     },
  //     {
  //       isBot: true,
  //       message: "Hold on...",
  //     },
  //   ];
  //   setMessages(newMessage);
  //   const response: BotResponse = await api.post(
  //     `/gpt-integration/chats/${param.id}/create-message/`,
  //     {
  //       prompt: message,
  //     }
  //   );

  //   setHistoryId(response?.id);
  //   let record = "";
  //   if (response?.botResponse.length === 0) {
  //     record = "No Record found"; // Display "No record found" when there are no results.
  //   } else {
  //     record = response?.botResponse;
  //   }
  //   const msg = newMessage.map((item) =>
  //     item.message === "Hold on..." ? { ...item, message: record } : item
  //   );
  //   setMessages(msg);
  //   // setHistory({response?.});
  // };

  const streamingRequest = async (message: string) => {
    try {
      let newMessage = [
        ...messages,
        {
          message,
          botResponse: "...",
        },
      ];
      setMessages(newMessage);
      let isFirst = false;
      let currentChatId = param.id || chatId;
      if (!currentChatId) {
        isFirst = true;
        const res: PublicChat = await createChat();
        const id = res?.id.toString()
        setChatId(id);
        currentChatId = id;
      }

      const response: BotResponse = await createIntegrationMessage(currentChatId, {
        prompt: message,
      });

      const msg = newMessage.map((item) =>
        item.botResponse === "..."
          ? { ...item, botResponse: response?.botResponse }
          : item
      );
      setMessages(msg);
      if (isFirst || isFirstMessage) {
        queryClient.invalidateQueries(["getChatsHistory"]);
        isFirst = false;
      }
      if (isFirstMessage) {
        setIsFirstMessage(false);
      }
    } catch (error) {
      showErrorNotification(error, "Message Error", "Failed to send or receive message");
    }
  };
  const onSubmit = async (message: string) => {
    await streamingRequest(message);
    // } else {
    //   await notStreamingRequest(message);
    // }
  };

  return {
    messages,
    setMessages,
    onSubmit,
    setStreaming,
    streaming,
    setHistory,
    historyId,
    setHistoryId,
    setIsFirstMessage,
    isLoading,
    setIsLoading,
    isProcessing,
  };
};
