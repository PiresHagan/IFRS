import { Form, Modal, Tag, Tooltip, notification, Select } from "antd";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SkeletonLoading } from "@components/Common/SkeletonLoading";
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { formatDate } from "@utils/share";
import ConfirmationModal from "@components/Modal/ConfirmationModal";
import { getMessageFromErrorResponse } from "@utils/share";
import { createUser as createUserService, updateUser as updateUserService, toggleUserActive as toggleUserActiveService, deleteUser as deleteUserService, fetchAllUsers as fetchAllUsersService } from "@services/user";
import { User } from "@/types/auth";

export default function Teams() {
  const [newUser] = Form.useForm();

  const navigate = useNavigate();
  const [userId, setUserId] = useState(0);
  const [modalMode, setModalMode] = useState("Add");
  const [userModal, setUserModal] = React.useState(false);
  const [removeUserModal, setRemoveModal] = React.useState(false);
  const [statusModal, setStatusModal] = React.useState(false);
  const [statusMsg, setStatusMsg] = React.useState("");
  const queryClient = useQueryClient();
  const { data, status } = useQuery(["fetchAllUsers"], async () => {
    const response: { detail: string; users: User[] } = await fetchAllUsersService();
    return response;
  });

  React.useEffect(() => {
    if (status === "error") {
      navigate("/");
    }
  }, [status]);

  const onCreateUser = async (values: any) => {
    const response: {
      detail: string;
      user: User;
    } = await createUserService(values);
    return response;
  };
  const onUpdateUser = async (values: any) => {
    const response: {
      detail: string;
      user: User;
    } = await updateUserService(userId.toString(), values);
    return response;
  };
  const onToggleUserActive = async (values: any) => {
    const response: {
      detail: string;
      user: User;
    } = await toggleUserActiveService(userId.toString(), values);
    return response;
  };

  const onDeleteUser = async () => {
    return await deleteUserService(userId.toString());
  };
  const toggleUserModal = () => setUserModal(!userModal);
  const { mutateAsync: createUser, isLoading: createUserLoading } = useMutation(
    onCreateUser,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["fetchAllUsers"]);
        toggleUserModal();
        newUser.resetFields();
        notification.success({
          message: "Success",
          description: data.detail,
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorResponse = error?.response?.data;

          const message = getMessageFromErrorResponse(errorResponse);
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

  const { mutateAsync: updateUser, isLoading: updateUserLoading } = useMutation(
    onUpdateUser,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["fetchAllUsers"]);
        toggleUserModal();
        newUser.resetFields();
        notification.success({
          message: "Success",
          description: data.detail,
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorResponse = error?.response?.data;

          const message = getMessageFromErrorResponse(errorResponse);
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
  const { mutateAsync: deleteUser, isLoading: deleteUserLoading } = useMutation(
    onDeleteUser,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["fetchAllUsers"]);
        notification.success({
          message: "Success",
          description: "User Deleted SuccessFully",
        });
        toggleRemoveUser();
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorResponse = error?.response?.data;
          const message = getMessageFromErrorResponse(errorResponse);
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
  const {
    mutateAsync: toggleUserAccount,
    isLoading: toggleUserAccountLoading,
  } = useMutation(onToggleUserActive, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["fetchAllUsers"]);
      notification.success({
        message: "Success",
        description: data?.detail || "User Account Status Updated SuccessFully",
      });
      toggleUserStatus();
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorResponse = error?.response?.data;
        const message = getMessageFromErrorResponse(errorResponse);
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
  const toggleRemoveUser = () => setRemoveModal(!removeUserModal);
  const toggleUserStatus = () => setStatusModal(!statusModal);

  const openAddUserModal = () => {
    setModalMode("Add");
    newUser.resetFields();
    toggleUserModal();
  };

  const openUpdateUserModal = (user: User) => {
    setModalMode("Update");
    setUserId(user.id);
    const userToUpdate = user;
    if (userToUpdate) {
      newUser.setFieldsValue(userToUpdate);
    }
    toggleUserModal();
  };

  return (
    <div className="container">
      {status === "success" && (
        <>
          <div>
            <div className="flex justify-between">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                All Users
              </h2>
              <button
                type="button"
                onClick={openAddUserModal}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add New User
              </button>
            </div>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Manage all users in your ScaffoldGPT Application
            </p>

            <dl className="mt-6 space-y-6 divide-y divide-gray-100   text-sm leading-6 ">
              <div className="mt-5 relative overflow-x-auto">
                <table className="min-w-full border rounded-lg divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        First Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Last Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Joined Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data.users.map((user, idx) => (
                      <tr key={idx}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {++idx}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user?.firstName || "NA"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user?.lastName || "NA"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user?.email || "NA"}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {formatDate(user?.dateJoined, "DD/MM/YYYY HH:mm:ss")}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <Tag color={user?.role === "Administrator" ? "green" : "blue"}>
                            {user?.role === "Administrator" ? "Admin" : "User"}
                          </Tag>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <Tag color={user?.isActive ? "green" : "blue"}>
                            {user?.isActive ? "Active" : "Disabled"}
                          </Tag>
                        </td>
                        {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <Tag color={user.isStaff ? "green" : "blue"}>
                            {user.isStaff ? "Yes" : "No"}
                          </Tag>
                        </td> */}
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="flex justify-end space-x-2">
                            <Tooltip title="Delete User">
                              <button
                                type="button"
                                onClick={() => {
                                  toggleRemoveUser();
                                  setUserId(user?.id);
                                }}
                                className="text-red-400 hover:text-red-500"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </Tooltip>
                            <Tooltip title="Edit User">
                              <button
                                type="button"
                                onClick={() => {
                                  openUpdateUserModal(user);
                                }}
                                className="text-blue-400 hover:text-blue-500"
                              >
                                <PencilIcon className="h-5 w-5" />
                              </button>
                            </Tooltip>
                            <Tooltip title="Toggle Status">
                              <button
                                type="button"
                                onClick={() => {

                                  setUserId(user?.id);
                                  setStatusMsg(
                                    `Are you sure you want to ${user?.isActive ? "Disable" : "Enable"
                                    } this user account?`
                                  );
                                  toggleUserStatus();
                                }}
                                className="text-blue-400 hover:text-blue-500"
                              >
                                <ArrowPathIcon className="h-5 w-5" />
                              </button>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </dl>
          </div>

          <Modal
            title={`${modalMode === "Add" ? "Add New" : "Update"} User`}
            open={userModal}
            onCancel={toggleUserModal}
            footer={null}
          >
            <Form
              form={newUser}
              layout="vertical"
              onFinish={(values) => {
                modalMode === "Add" ? createUser(values) : updateUser(values);
              }}
            >
              <Form.Item label="First Name" name="firstName">
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </Form.Item>
              <Form.Item label="last Name" name="lastName">
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <input
                  type="email"
                  className="mt-1 block w-full border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </Form.Item>

              <Form.Item
                label="Role"
                name={"role"}
                rules={[
                  {
                    required: true,
                    message: "Please  select user role!",
                  },
                ]}
              >
                <Select
                  onChange={(value: string) => {
                    newUser.setFieldValue("role", value);
                  }}
                  defaultValue={""}
                  options={[
                    { value: "", label: "Choose Role" },
                    { value: "Administrator", label: "Administrator" },
                    { value: "Regular", label: "Regular" },
                  ]}
                />
              </Form.Item>

              <div className="flex justify-end">
                <button
                  disabled={createUserLoading}
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {createUserLoading || updateUserLoading
                    ? `${modalMode}...`
                    : modalMode}
                </button>
              </div>
            </Form>
          </Modal>
        </>
      )}
      {status === "loading" && <SkeletonLoading />}

      {status === "error" && (
        <div className="text-center">Something went wrong</div>
      )}
      <ConfirmationModal
        visible={removeUserModal}
        onConfirm={() => deleteUser()}
        onCancel={toggleRemoveUser}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        disable={deleteUserLoading}
      />
      <ConfirmationModal
        visible={statusModal}
        onConfirm={() => {
          const user = data?.users.find((user) => user.id === userId);

          toggleUserAccount(user);
        }}
        onCancel={toggleUserStatus}
        title="Change User Account Status"
        message={statusMsg}
        disable={toggleUserAccountLoading}
      />
    </div>
  );
}
