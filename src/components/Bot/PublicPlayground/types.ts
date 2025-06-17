export type BotPlaygroundHistory = {
  id: string;
  owner: number;
  firstPrompt: string;
  createdOn: string;
  modifiedOn: string;
  title:string;
};

export type PlaygroundHistory = {
  firstPrompt: string;
  id: string;
  title:string;

};

export type BotPlaygroundMessageType = {
  type: string;
  message: string;
  createdAt: string;
  isBot: boolean;
  sources: any[];
};
