import { createHashRouter } from "react-router-dom";
import DashboardLayout from "@layout/index";
import BotLayout from "@layout/BotLayout";
import LoginRoot from "@pages/login/root";
import SettingsRoot from "@pages/settings/General";
import RegisterRoot from "@pages/register";
import ResetPasswordRoot from "@pages/resetPassword/ResetPassword";
import { QueryBoundaries } from "@components/Common/QueryBoundaries";
import SettingsApplicationRoot from "@pages/settings/application";
import SettingsTeamsRoot from "@pages/teams/teams";
import PrivateRoute from "./privateRoute/PrivateRoute";

const router = createHashRouter([
  {
    path: "/settings",
    element: (
      <PrivateRoute>
        <DashboardLayout>
          <QueryBoundaries>
            <SettingsRoot />
          </QueryBoundaries>
        </DashboardLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/settings/application",
    element: (
      <PrivateRoute>
        <DashboardLayout>
          <QueryBoundaries>
            <SettingsApplicationRoot />
          </QueryBoundaries>
        </DashboardLayout>
      </PrivateRoute>
    ),
  },
  {
    path: "/teams",
    element: (
      <PrivateRoute>
        <BotLayout>
          <SettingsTeamsRoot />
        </BotLayout>
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
]);

export default router; 