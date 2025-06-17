export interface ConversationsByType {
    chat_id: string;
    metdata: {
      user_agent?: string;
      ip?: string;
    };
    human: string | null;
    bot: string | null;
    created_at: Date;
    all_messages: {
      isBot: boolean;
      message?: string | null | undefined;
      sources?: any;
      createdAt: Date;
    }[];
}

export interface Message {
    id: string;
    createdOn: string;
    modifiedOn: string;
    prompt: string;
    botResponse: string;
    chat: number;
}

export interface Conversation {
    id: number;
    owner: {
        id: number;
        password: string;
        lastLogin: string;
        isSuperuser: true;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        isStaff: boolean;
        isActive: boolean;
        dateJoined: string;
        role: number;
        groups: [];
        userPermissions: [];
    };
    title: string;
    firstPrompt: string;
    messages: Message[];
    createdOn: string;
    modifiedOn: string;
}

export interface ConversationFilters{
    search:string;
    dateBefore: string | string [];
    dateAfter: string | string [];
}