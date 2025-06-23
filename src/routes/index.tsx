import { createHashRouter } from "react-router-dom";
import AppLayout from "@layout/AppLayout";
import LoginRoot from "@pages/login/root";
import SettingsRoot from "@pages/settings/General";
import RegisterRoot from "@pages/register";
import ResetPasswordRoot from "@pages/resetPassword/ResetPassword";
import { QueryBoundaries } from "@components/Common/QueryBoundaries";
import SettingsApplicationRoot from "@pages/settings/application";
import SettingsTeamsRoot from "@pages/teams/teams";
import PrivateRoute from "./privateRoute/PrivateRoute";
import ModelDefinitions from "@pages/model-definitions";
import NotFound from "@pages/not-found";
import { AuthPasswordRecoveryConfirm } from "@components/Auth/PasswordRecovery";
  
const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <ModelDefinitions />
          </PrivateRoute>
        ),
      },
      {
        path: "/teams",
        element: (
          <PrivateRoute>
            <SettingsTeamsRoot />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <QueryBoundaries>
              <SettingsRoot />
            </QueryBoundaries>
          </PrivateRoute>
        ),
      },
      {
        path: "/settings/application",
        element: (
          <PrivateRoute>
            <QueryBoundaries>
              <SettingsApplicationRoot />
            </QueryBoundaries>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginRoot />,
      },
      {
        path: "/register",
        element: <RegisterRoot />,
      },
      {
        path: "/resetPassword",
        element: <ResetPasswordRoot />,
      },
      {
        path: "/password-recovery/confirm/:uid/:token",
        element: <AuthPasswordRecoveryConfirm />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router; 