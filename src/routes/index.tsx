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
import ModelDefinitionEditor from "@pages/model-definitions/editor";
import GroupInsurance from "@pages/group-insurance";
import Reinsurance from "@pages/reinsurance";
import Data from "@pages/data";
import Reports from "@pages/reports";
import ExportDisclosures from "@pages/export";
import HelpGuide from "@pages/help";
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
        path: "/model-definitions/:id",
        element: (
          <PrivateRoute>
            <QueryBoundaries>
              <ModelDefinitionEditor />
            </QueryBoundaries>
          </PrivateRoute>
        ),
      },
      {
        path: "/group-insurance",
        element: (
          <PrivateRoute>
            <GroupInsurance />
          </PrivateRoute>
        ),
      },
      {
        path: "/reinsurance",
        element: (
          <PrivateRoute>
            <Reinsurance />
          </PrivateRoute>
        ),
      },
      {
        path: "/data",
        element: (
          <PrivateRoute>
            <Data />
          </PrivateRoute>
        ),
      },
      {
        path: "/reports",
        element: (
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        ),
      },
      {
        path: "/export",
        element: (
          <PrivateRoute>
            <ExportDisclosures />
          </PrivateRoute>
        ),
      },
              {
          path: "/help",
          element: (
            <PrivateRoute>
              <HelpGuide />
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