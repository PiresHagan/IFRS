import { Form, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { AppearanceType } from "@/types/config";
import { showErrorNotification } from "@utils/errorHandler";
import { register } from "@services/auth";
import { getConfig } from "@services/config";

export const AuthRegister = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { mutateAsync: registerMutation, isLoading } = useMutation(register, {
    onSuccess: async (data) => {
      let appearanceData: AppearanceType = { botName: "", greetingMessage: "" };
      try {
        const response = await getConfig(data.access);
        appearanceData = response;
      } catch (error) {
        showErrorNotification(error, "Configuration Error", "Failed to load application configuration");
      }
      finally {
        notification.success({
          message: "Success",
          description: data?.detail,
          placement: "top",
        });
        login(data?.access, data?.refresh, data?.user, appearanceData);
      }

      navigate("/");
    },
    onError: (error) => {
      // is axios
      if (axios.isAxiosError(error)) {
        const errorResponse = error?.response?.data;

        let message: string | undefined;

        for (const key in errorResponse) {
          if (
            errorResponse.hasOwnProperty(key) &&
            Array.isArray(errorResponse[key])
          ) {
            if (errorResponse[key].length > 0) {
              message = errorResponse[key][0];
              break;
            }
          }
        }

        notification.error({
          message: "Error",
          description: message,
          placement: "top",
        });
        return;
      }

      notification.error({
        message: "Error",
        description: "Something went wrong",
      });
    },
  });
  return (
    <>
      <div className="flex min-h-full bg-white flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <div className="focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 flex items-center">
                <img className="h-8 w-auto" src="/logo.png" alt="ScaffoldGPT" />
                <span className="text-lg font-bold">ScaffoldGPT</span>
                <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 ml-2">
                  {/* @ts-ignore */}
                  {`v${__APP_VERSION__}`}
                </span>
              </div>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create an account
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <Form
                  layout="vertical"
                  className="space-y-6"
                  onFinish={registerMutation}
                  requiredMark={false}
                >
                  <Form.Item
                    name="username"
                    label={
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Username
                      </label>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <input
                      autoComplete="username"
                      placeholder="Username"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 px-3"
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label={
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Email
                      </label>
                    }
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid email!",
                      },
                      {
                        required: true,
                        message: "Please input your email",
                      },
                    ]}
                  >
                    <input
                      autoComplete="email"
                      placeholder="Email"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 px-3"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password1"
                    label={
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                      </label>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <input
                      autoComplete="current-password"
                      placeholder="Password"
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password2"
                    label={
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Confirm Password
                      </label>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password1") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The confirm password that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <input
                      autoComplete="confirm-password"
                      placeholder="Password"
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                    />
                  </Form.Item>
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Loading..." : "Register"}
                    </button>
                  </div>
                </Form>
              </div>
              <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <div className="absolute h-full w-full object-cover rounded-sm bg-gradient-to-r from-sky-400 to-blue-500"></div>
        </div>
      </div>
    </>
  );
};
