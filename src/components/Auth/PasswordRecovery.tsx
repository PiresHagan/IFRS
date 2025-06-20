import { Form, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMessageFromErrorResponse } from "@utils/share";
import { resetPasswordConfirm } from "@services/auth";
import { useEffect, useState } from "react";

export const AuthPasswordRecoveryConfirm = () => {
  const navigate = useNavigate();
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const [form] = Form.useForm();
  const [isValidLink, setIsValidLink] = useState(true);

  useEffect(() => {
    if (!uid || !token) {
      setIsValidLink(false);
    }
  }, [uid, token]);

  const { mutateAsync: confirmPasswordReset, isLoading } = useMutation(resetPasswordConfirm, {
    onSuccess: (data) => {
      notification.success({
        message: "Success",
        description: data?.detail || "Password has been set successfully. You can now login.",
        placement: "top",
      });

      navigate("/login");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorResponse = error?.response?.data;
        const message: string | undefined = getMessageFromErrorResponse(errorResponse);

        notification.error({
          message: "Error",
          description: message || "Failed to set password. The link may have expired.",
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

  const handleSubmit = (values: any) => {
    if (!uid || !token) {
      notification.error({
        message: "Error",
        description: "Invalid password recovery link",
      });
      return;
    }

    confirmPasswordReset({
      uid,
      token,
      new_password1: values.password,
      new_password2: values.confirmPassword,
    });
  };

  if (!isValidLink) {
    return (
      <div className="flex min-h-full bg-white flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="text-center">
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Invalid Link
              </h2>
              <p className="mt-4 text-sm text-gray-600">
                This password recovery link is invalid or has expired.
              </p>
              <Link
                to="/resetPassword"
                className="mt-4 inline-block font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Request a new password reset link
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-full bg-white flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Set Your Password
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Welcome! Please set your password to complete your account setup.
              </p>
            </div>

            <div className="mt-10">
              <div>
                <Form
                  form={form}
                  layout="vertical"
                  className="space-y-6"
                  onFinish={handleSubmit}
                  requiredMark={false}
                >
                  <Form.Item
                    name="password"
                    label={
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        New Password
                      </label>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please input your password",
                      },
                      {
                        min: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    ]}
                  >
                    <input
                      type="password"
                      autoComplete="new-password"
                      placeholder="Enter your new password"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label={
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Confirm Password
                      </label>
                    }
                    dependencies={['password']}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('The two passwords do not match!'));
                        },
                      }),
                    ]}
                  >
                    <input
                      type="password"
                      autoComplete="new-password"
                      placeholder="Confirm your new password"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                    />
                  </Form.Item>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Setting Password..." : "Set Password"}
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
                  Sign in
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