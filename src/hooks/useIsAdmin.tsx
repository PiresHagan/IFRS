import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@services/auth";

export const useIsAdmin = () => {
  return useQuery(
    ["fetchScaffoldGPTUserInfo"],
    async () => {
      const response: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        isAdministrator:boolean
      } = await fetchMe();
      return response?.isAdministrator;
    },
    {
      suspense: true,
    }
  );
};
