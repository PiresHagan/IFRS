import { useQuery } from "@tanstack/react-query";
import { registerInfo } from "@services/dummy";

export const useSettings = () => {
  return useQuery(
    ["fetchScaffoldGPTInfo"],
    async () => {
      const response = await registerInfo;
      return response?.data as {
        isRegistrationAllowed: boolean;
      };
    },
    {
      suspense: true,
    }
  );
};
