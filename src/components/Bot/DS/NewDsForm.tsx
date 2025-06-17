import { useState } from "react";
import { Form, notification } from "antd";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BotForm } from "@components/Common/BotForm";
import axios from "axios";
import { sourceUpload, getSource } from "@services/bot";

// @ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const NewDsForm = ({ onClose }: { onClose: () => void }) => {
  const [selectedSource, setSelectedSource] = useState<any>({
    id: 1,
    value: "Website",
  });
  const params = useParams<{ id: string }>();
  const client = useQueryClient();
  const [form] = Form.useForm();
  const onSubmit = async (values: any) => {
    if (selectedSource.id == 2 || selectedSource.id == 5) {
      const formData = new FormData();
      values.file.forEach((file: any) => {
        formData.append("file", file.originFileObj);
      });
      const response = await sourceUpload(formData);
      return response;
    }
    const response = await getSource(`${params.id}`, {
      type: selectedSource.value.toLowerCase(),
      ...values,
    });
    return response;
  };

  const { mutateAsync: createBot, isLoading } = useMutation(onSubmit, {
    onSuccess: () => {
      client.invalidateQueries(["getBotDS", params.id]);
      onClose();
      notification.success({
        message: "Success",
        description: "New Source added successfully.",
      });
      form.resetFields();
      setSelectedSource({
        id: 1,
        value: "Website",
      });
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        const message =
          e.response?.data?.message ||
          e?.response?.data?.error ||
          "Something went wrong.";
        notification.error({
          message: "Error",
          description: message,
        });
        return;
      }
      notification.error({
        message: "Error",
        description: "Something went wrong.",
      });
    },
  });

  return (
    <>
      <BotForm
        showEmbeddingAndModels={false}
        form={form}
        createBot={createBot}
        isLoading={isLoading}
        setSelectedSource={setSelectedSource}
      />
    </>
  );
};
