import { createContext, useContext, useMemo } from "react";
import { useCookie } from "@hooks/useCookie";
import { getToken } from "@services/cookie";
import useLocalStorage from "@hooks/useLocalStorage";
import React from "react";
import { logout as logoutService } from "@services/auth";
import { AppearanceType } from "@/types/config";
import { showErrorNotification } from "@utils/errorHandler";
import { AppContextInterface, AuthProviderProps, Profile } from "@/types/common";
import { User } from "@/types/auth";

const AuthContext = createContext<AppContextInterface>({
  profile: {
    username: "...",
    avatar:
      "https://avatars.dicebear.com/api/jdenticon/formshet.svg?background=%230000ff",
    user: {} as User,
    isAdministrator: false,
  },
  isLogged: false,
  login: () => { },
  logout: () => { },
  chatAppearance: null,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useCookie("token");
  const [refresh, setRefresh] = useCookie("reToken");
  const [localProfile, setLocalProfile] = useLocalStorage("db_profile", null);
  const [appearance, setAppearance] = useLocalStorage(
    "chat_appearance",
    null
  );

  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [chatAppearance, setChatAppearance] = React.useState<AppearanceType | null>(null);

  React.useEffect(() => {
    if (localProfile) {
      const user = localProfile?.user || localProfile;
      setProfile({
        username: user?.username || user?.email || "User",
        avatar: `https://api.dicebear.com/5.x/fun-emoji/svg?seed=${user?.username || user?.email || "user"}`,
        user: user,
        isAdministrator: user?.isAdministrator || user?.role === "Administrator" || false,
      });
    }
    if (appearance) {
      setChatAppearance(appearance);
    }
  }, [localProfile, appearance]);

  const login = async (
    access: string,
    refresh: string,
    user: User,
    appearanceData: AppearanceType
  ) => {
    setToken(access);
    setRefresh(refresh);
    setLocalProfile(user);
    setAppearance(appearanceData);
  };

  // call this function to sign out logged in user
  const logout = async () => {
    try {
      const refresh = getToken("reToken");
      await logoutService({ refresh });
      setRefresh(null);
      setToken(null);
      setProfile(null);
      setAppearance(null);
      setLocalProfile(null);
    } catch (error) {
      showErrorNotification(error, "Logout Failed", "Failed to complete logout process");
    }
  };

  const value = useMemo(
    () => ({
      isLogged: !!token,
      profile,
      login,
      logout,
      chatAppearance
    }),
    [token, refresh, profile, chatAppearance]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
