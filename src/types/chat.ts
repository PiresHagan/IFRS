import { BotResponse } from "./bot";

export interface PublicChat {
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
        groups: any[];
        userPermissions: any[];
    };
    messages: BotResponse[];
    createdOn: string;
    modifiedOn: string;
}
