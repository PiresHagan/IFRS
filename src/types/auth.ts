export interface User {
    pk: number;
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: "Regular" | "Administrator";
    isActive: boolean;
    dateJoined: string;
    isSuperuser: boolean;
    isStaff: boolean;
}
  
export interface LoginResponse {
    detail: string;
    access: string;
    refresh: string;
    user: User;
}

export interface UserCredentials {
    username: string;
    email: string;
    password: string;
}

export interface ResetPasswordResponse {
    detail: string;
}
