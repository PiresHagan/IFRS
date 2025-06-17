import moment from "moment";
import { notification } from "antd";
import {
  CircleStackIcon,
  CogIcon,
  PuzzlePieceIcon,
  EyeDropperIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import { ErrorResponse } from "@/types/common";

export function getMessageFromErrorResponse(
  errorResponse: ErrorResponse
): string {
  let message = "";

  for (const key in errorResponse) {
    if (
      errorResponse.hasOwnProperty(key) &&
      Array.isArray(errorResponse[key])
    ) {
      if (errorResponse[key].length > 0) {
        message = errorResponse[key][0];
        break;
      }
    }
  }

  return message;
}

export function formatDate(date: string, format: string) {
  const userTimezoneOffset = new Date().getTimezoneOffset();
  const formattedDate = moment
    .utc(date)
    .utcOffset(userTimezoneOffset)
    .format(format);
  return formattedDate;
}

export const showNotification = (
  message: string,
  type: "success" | "info" | "warning" | "error" = "success",
  position:
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "top"
    | "bottom" = "bottom"
) => {
  notification[type]({
    message,
    placement: position,
  });
};

export const getBotNavigation = (isAdmin: boolean | undefined, isChatAllowed?: boolean | undefined, id?: string | null) => {
  const navigation = [
    ...(isAdmin || isChatAllowed
      ? [
        {
          name: "Playground",
          href: id && id !== null && id !== "" ? `/chat/${id}` : "/",
          icon: SparklesIcon,
        },
      ]
      : []),

    {
      name: "Data Sources",
      href: "/bot/data-sources",
      icon: CircleStackIcon,
    },
    ...(isAdmin
      ? [
        {
          name: "Embed",
          href: "/bot/embed",
          icon: CodeBracketIcon,
        }, {
          name: "Integrations",
          href: "/bot/integrations",
          icon: PuzzlePieceIcon,
        },] : []),



    ...(isAdmin
      ? [
        {
          name: "Conversations",
          href: "/bot/conversations",
          icon: ChatBubbleLeftRightIcon,
        },
        {
          name: "Appearance",
          href: "/bot/appearance",
          icon: EyeDropperIcon,
        },
        {
          name: "Teams",
          href: "/teams",
          icon: UsersIcon,
        },
        {
          name: "Prompts",
          href: "/prompts",
          icon: CogIcon,
        },
      ]
      : []),

    // {
    //   name: "Settings",
    //   href: "/bot/settings",
    //   icon: CogIcon,
    // },
  ];
  return navigation;
};

export const getPublicBotNavigation = () => {
  const navigation = [
    {
      name: "Playground",
      href: "embed/chat/:id",
      icon: SparklesIcon,
    },
  ];
  return navigation;
};

export const generateUniqueRandomString = (length: number) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charactersSet = new Set();

  if (length > characters.length) {
    throw new Error("Desired length exceeds available characters.");
  }

  while (result.length < length) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters[randomIndex];

    if (!charactersSet.has(randomCharacter)) {
      charactersSet.add(randomCharacter);
      result += randomCharacter;
    }
  }

  return result;
};
