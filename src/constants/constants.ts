export const permission = import.meta.env.VITE_CHAT;
export const isChatAllowed =String(permission).toLowerCase() === "true"