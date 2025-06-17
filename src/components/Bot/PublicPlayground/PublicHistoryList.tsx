import { PublicPlaygroundHistoryCard } from "./PublicHistoryCard";
import { useParams } from "react-router-dom";
import React from "react";
import { usePublicMessage } from "@hooks/usePublicMessage";
import { Empty, Skeleton } from "antd";
import { useState } from "react";
import ConfirmationModal from "@components/Modal/ConfirmationModal";
import {
  showNotification,
  getMessageFromErrorResponse,
} from "@utils/share";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Form, Modal } from "antd";
import { widgetChatsHistory, widgetDeleteChat, widgetUpdateChat } from "@services/chat";

export const PublicPlaygroundHistoryList = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const [id, setId] = useState<number | string>(0);
  const [chatTitle] = Form.useForm();
  const queryClient = useQueryClient();
  const params = useParams<{ id: string; history_id?: string }>();
  const { setIsLoading } = usePublicMessage();
  const { data, status } = useQuery(
    ["getPublicChatsHistory", params.id],
    widgetChatsHistory,
    {
      keepPreviousData: true,
    }
  );
  React.useEffect(() => {
    if (status === "success" && data) {
      setIsLoading(false);
    }
  }, [status, data]);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const toggleTitleModal = () => setTitleModal(!titleModal);
  const onDeleteHistory = async () => {
    return await widgetDeleteChat(id.toString());
  };
  const onUpdateChatTitle = async (values: any) => {
    return await widgetUpdateChat(id.toString(), values);
  };
  const { mutateAsync: deleteChat, isLoading: deleteChatLoading } = useMutation(
    onDeleteHistory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getPublicChatsHistory"]);
        showNotification("Chat Removed Successfully");
        toggleDeleteModal();
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorResponse = error?.response?.data;
          const message = getMessageFromErrorResponse(errorResponse);
          showNotification(message, "error");
          return;
        }
      },
    }
  );
  const { mutateAsync: updateChatTitle, isLoading: updateChatTitleLoading } =
    useMutation(onUpdateChatTitle, {
      onSuccess: () => {
        queryClient.invalidateQueries(["getPublicChatsHistory"]);
        toggleTitleModal();
        chatTitle.resetFields();
        showNotification("Chat Title Updated Successfully");
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorResponse = error?.response?.data;
          const message = getMessageFromErrorResponse(errorResponse);
          showNotification(message, "error");
          return;
        }
      },
    });
  const setTitle = (value: string) => {
    chatTitle.setFieldValue("title", value);
  };
  return (
    <>
      <div
        className={`flex-col flex-1 overflow-y-auto   border-b border-white/20 `}
      >
        <div>
          {status === "success" && (
            <div>
              {data.length === 0 && (
                <div className="flex justify-center items-center mt-20 overflow-hidden">
                  <Empty description="No history yet" />
                </div>
              )}
              <div className="flex flex-col gap-2 overflow-hidden text-gray-100 text-sm ">
                {data.map((item, index) => {
                  return (
                    <PublicPlaygroundHistoryCard
                      key={index}
                      item={item}
                      setId={setId}
                      toggle={toggleDeleteModal}
                      editToggle={toggleTitleModal}
                      setTitle={setTitle}
                      paramId={id || params?.id}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {status === "loading" && (
            <div className="flex justify-center items-center mt-5">
              <Skeleton active paragraph={{ rows: 8 }} />
            </div>
          )}
          {status === "error" && (
            <div className="flex justify-center items-center">
              <span className="text-red-500">Error loading history</span>
            </div>
          )}
        </div>
      </div>
      <Modal
        title={`Edit Chat`}
        open={titleModal}
        onCancel={toggleTitleModal}
        footer={null}
      >
        <Form
          form={chatTitle}
          layout="vertical"
          onFinish={(values) => {
            updateChatTitle(values);
          }}
        >
          <Form.Item label="Title" name="title">
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </Form.Item>

          <div className="flex justify-end">
            <button
              disabled={updateChatTitleLoading}
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white  hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-2"
              onClick={() => {
                setId("");
                setTitle("");
                toggleTitleModal();
              }}
            >
              Cancel
            </button>
            <button
              disabled={updateChatTitleLoading}
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {updateChatTitleLoading ? `Update...` : "Update"}
            </button>
          </div>
        </Form>
      </Modal>
      <ConfirmationModal
        visible={deleteModal}
        onCancel={toggleDeleteModal}
        onConfirm={() => deleteChat()}
        disable={deleteChatLoading}
        message="Are You sure you want to delete this chat?"
      />
    </>
  );
};
