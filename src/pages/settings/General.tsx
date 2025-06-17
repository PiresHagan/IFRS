import { Form, notification } from "antd";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { SettingsLayout } from "@layout/SettingsLayout";
import { SkeletonLoading } from "@components/Common/SkeletonLoading";
import { useNavigate } from "react-router-dom";
import { getMessageFromErrorResponse } from "@utils/share";
import { updateProfile as updateProfileService, updatePassword, fetchMe } from "@services/auth";
import { User } from "@/types/auth";

export default function SettingsGeneral() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data, status } = useQuery(["fetchMe"], async () => {
    const response: User = await fetchMe();
    return response;
  });

  React.useEffect(() => {
    if (status === "error") {
      navigate("/login");
    }
  }, [status]);

  const onUpdateProfile = async (values: any) => {
    const response: {
      detail: string;
      user: User;
    } = await updateProfileService(values);
    return response;
  };

  const { mutateAsync: updateProfile, isLoading } = useMutation(
    onUpdateProfile,
    {
      onSuccess: (data) => {
        console.log("test", data)
        notification.success({
          message: "Success",
          description: data?.detail || "Profile Updated Successfully",
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message;
          notification.error({
            message: "Error",
            description: message,
          });
          return;
        }

        notification.error({
          message: "Error",
          description: "Something went wrong",
        });
      },
    }
  );

  const onUpdatePassword = async (values: any) => {
    return await updatePassword(values);
  };

  const { mutateAsync: updatePassowrd, isLoading: isPasswordLoading } =
    useMutation(onUpdatePassword, {
      onSuccess: () => {
        notification.success({
          message: "Success",
          description: "Password updated",
        });
        form.setFieldValue("newPassword1", "");
        form.setFieldValue("newPassword2", "");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data;
          const message = getMessageFromErrorResponse(errorMessage);
          notification.error({
            message: "Error",
            description: message,
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
    <SettingsLayout>
      {status === "success" && (
        <>
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Update your profile details.
            </p>

            <dl className="mt-6 space-y-6 divide-y divide-gray-100  border-gray-200 text-sm leading-6 ">
              <div className="mt-5 md:col-span-2 md:mt-0">
                <Form
                  form={form}
                  initialValues={{
                    ...data,
                  }}
                  layout="vertical"
                  onFinish={updateProfile}
                >
                  <div className="sm:overflow-hidden ">
                    <div className="space-y-6 border-t border rounded-t-md  bg-white px-4 py-5 sm:p-6">
                      <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[
                          {
                            message: "Please input your first name!",
                          },
                        ]}
                      >
                        <input
                          type="text"
                          className="mt-1 block w-full border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[
                          {
                            message: "Please input your last name!",
                          },
                        ]}
                      >
                        <input
                          type="text"
                          className="mt-1 block w-full border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </Form.Item>

                      <Form.Item label="Email" name="email">
                        <input
                          type="email"
                          className="mt-1 block w-full border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          disabled
                        />
                      </Form.Item>
                      <Form.Item label="Role" name="role">
                        <input
                          type="text"
                          className="mt-1 block w-full border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          disabled
                        />
                      </Form.Item>
                    </div>
                    <div className="bg-gray-50 border-x border-b rounded-b-md rounded-x-md px-4 py-3 text-right sm:px-6">
                      <button
                        disabled={isLoading}
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {isLoading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Password
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Update your password.
            </p>

            <dl className="mt-6 space-y-6 divide-y divide-gray-100  border-gray-200 text-sm leading-6 ">
              <div className="mt-5 md:col-span-2 md:mt-0">
                <Form layout="vertical" onFinish={updatePassowrd}>
                  <div className="overflow-hidden sm:rounded-md">
                    <div className="bg-white border-t border rounded-t-md  px-4 py-5 sm:p-6">
                      <Form.Item
                        label="New Password"
                        name="newPassword1"
                        rules={[
                          {
                            required: true,
                            message: "Please input your new password!",
                          },
                        ]}
                      >
                        <input
                          type="password"
                          className="mt-1 block w-full border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Confirm New Password"
                        name="newPassword2"
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("newPassword1") === value
                              ) {
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
                          type="password"
                          className="mt-1 block w-full border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </Form.Item>
                    </div>
                    <div className="bg-gray-50 border-x border-b rounded-b-md rounded-x-md  px-4 py-3 text-right sm:px-6">
                      <button
                        disabled={isPasswordLoading}
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {isPasswordLoading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </dl>
          </div>
        </>
      )}
      {status === "loading" && <SkeletonLoading />}

      {status === "error" && (
        <div className="text-center">Something went wrong</div>
      )}
    </SettingsLayout>
  );
}
