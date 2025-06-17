import { Divider, Form, FormInstance, notification } from "antd";
import { AppearanceType } from "@/types/config";
import { DbColorPicker } from "@components/Common/DbColorPicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  getMessageFromErrorResponse,
  showNotification,
} from "@utils/share";
import { updateConfig } from "@services/config";

export const AppearanceForm = ({
  initialData,
  form,
  botStyleBg,
  botStyleTextColor,
  humanStyleBgColor,
  humanStyleTextColor,
}: {
  initialData: AppearanceType;
  form: FormInstance;
  botStyleBg: any;
  botStyleTextColor: any;
  humanStyleBgColor: any;
  humanStyleTextColor: any;
}) => {
  const onFinish = async (values: any) => {
    let data = {
      ...values,

      botStyleBgColor:
        typeof values.botStyleBgColor === "string"
          ? values.botStyleBgColor
          : `#${values.botStyleBgColor.toHex()}`,
      botStyleTextColor:
        typeof values.botStyleTextColor === "string"
          ? values.botStyleTextColor
          : `#${values.botStyleTextColor.toHex()}`,

      humanStyleBgColor:
        typeof values.humanStyleBgColor === "string"
          ? values.humanStyleBgColor
          : `#${values.humanStyleBgColor.toHex()}`,
      humanStyleTextColor:
        typeof values.humanStyleTextColor === "string"
          ? values.humanStyleTextColor
          : `#${values.humanStyleTextColor.toHex()}`,
    };
    const response = await updateConfig(data);
    return response;
  };

  const client = useQueryClient();

  const { mutate: updateAppearance, isLoading: isUpdatingAppearance } =
    useMutation(onFinish, {
      onSuccess: () => {
        client.invalidateQueries(["getBotAppearance"]);
        showNotification(
          "Bot appearance updated successfully",
          "success"
        );
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

        showNotification("Something went wrong", "error");
      },
    });

  return (
    <Form
      requiredMark={false}
      initialValues={{
        ...initialData,
      }}
      layout="vertical"
      form={form}
      onFinish={updateAppearance}
    >
      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your Bot Name!",
          },
        ]}
        label="Bot Name"
        name="botName"
      >
        <input
          type="text"
          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        />
      </Form.Item>

      <Form.Item
        rules={[
          {
            required: true,
            message: "Please input your Greeting Message!",
          },
        ]}
        label="Greeting Message"
        name="greetingMessage"
      >
        <input
          type="text"
          className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        />
      </Form.Item>

      <Divider orientation="left">Style</Divider>

      <div className="flex flex-row justify-normal space-x-6">
        <Form.Item
          name={"botStyleBgColor"}
          label={<span className="text-xs">Bg color</span>}
          rules={[
            {
              required: true,
              message: "Please pick a color!",
            },
          ]}
        >
          <DbColorPicker
            format="hex"
            pickedColor={
              typeof botStyleBg === "string"
                ? botStyleBg
                : `#${botStyleBg?.toHex()}`
            }
          />
        </Form.Item>

        <Form.Item
          name={"botStyleTextColor"}
          label={<span className="text-xs">Text color</span>}
          rules={[
            {
              required: true,
              message: "Please pick a color!",
            },
          ]}
        >
          <DbColorPicker
            pickedColor={
              typeof botStyleTextColor === "string"
                ? botStyleTextColor
                : `#${botStyleTextColor?.toHex()}`
            }
          />
        </Form.Item>
      </div>

      <div className="flex flex-row justify-normal space-x-6">
        <Form.Item
          name={"humanStyleBgColor"}
          label={<span className="text-xs">Bg color</span>}
          rules={[
            {
              required: true,
              message: "Please pick a color!",
            },
          ]}
        >
          <DbColorPicker
            pickedColor={
              typeof humanStyleBgColor === "string"
                ? humanStyleBgColor
                : `#${humanStyleBgColor?.toHex()}`
            }
          />
        </Form.Item>

        <Form.Item
          name={"humanStyleTextColor"}
          label={<span className="text-xs">Text color</span>}
          rules={[
            {
              required: true,
              message: "Please pick a color!",
            },
          ]}
        >
          <DbColorPicker
            pickedColor={
              typeof humanStyleTextColor === "string"
                ? humanStyleTextColor
                : `#${humanStyleTextColor?.toHex()}`
            }
          />
        </Form.Item>
      </div>

      <div className="mt-3 text-right">
        <button
          type="submit"
          disabled={isUpdatingAppearance}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
        >
          {isUpdatingAppearance ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </Form>
  );
};