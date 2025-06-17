import { usePublicStoreMessage } from "@store/index";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { showErrorNotification } from "@utils/errorHandler";
import { createMessage, widgetCreateChat, widgetGetChat } from "@services/chat";
import { PublicChat } from "@/types/chat";
import { BotResponse } from "@/types/bot";
import { Msg } from "@/types/message";

export const usePublicMessage = () => {
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

  } = usePublicStoreMessage();

  const param = useParams<{ id: string }>();

  useMemo(() => {
    const fetchMessages = async () => {
      try {
        const response: PublicChat = await widgetGetChat(param.id!);
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
        setIsLoading(false)
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
      let id;
      let isFirst = false;
      if (!param.id && !id) {
        const res: PublicChat = await widgetCreateChat();
        id = res?.id;
        isFirst = true;
      }
      const response: BotResponse = await createMessage(param.id!.toString() || id!.toString(), {
        prompt: message,
      });

      const msg = newMessage.map((item) =>
        item.botResponse === "..." ? { ...item, botResponse: response?.botResponse } : item
      );
      setMessages(msg);
      if (isFirst || isFirstMessage) {
        queryClient.invalidateQueries(["getPublicChatsHistory"]);
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
