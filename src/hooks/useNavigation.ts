import { useMemo } from 'react';
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

export function useNavigation(isAdmin: boolean | undefined, isChatAllowed?: boolean | undefined, id?: string | null) {
  return useMemo(() => {
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
          },
          {
            name: "Integrations",
            href: "/bot/integrations",
            icon: PuzzlePieceIcon,
          },
        ] : []),

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
    ];
    return navigation;
  }, [isAdmin, isChatAllowed, id]);
} 