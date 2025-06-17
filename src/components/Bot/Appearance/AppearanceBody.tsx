import { Form } from "antd";
import { AppearanceType } from "@/types/config";
import React from "react";
import { AppearanceForm } from "./AppearanceForm";
import { AppearancePreview } from "./AppearancePreview";

type Props = AppearanceType;

export const AppearanceBody = (props: Props) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      ...props,
    });
  }, [props]);

  const botStyleBgColor = Form.useWatch("botStyleBgColor", form);
  const botStyleTextColor = Form.useWatch("botStyleTextColor", form);
  const humanStyleBgColor = Form.useWatch("humanStyleBgColor", form);
  const humanStyleTextColor =
    Form.useWatch("humanStyleTextColor", form) ||
    form.getFieldValue("humanStyleTextColor");

  return (
    <div className="container">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Appearance</h1>
          <p className="mt-2 text-sm text-gray-700">
            Customize the appearance of your bot.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-3xl mt-6 lg:max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <div className="overflow-hidden rounded-lg bg-white border">
                <div className="p-6">
                  <AppearanceForm
                    initialData={props}
                    form={form}
                    botStyleBg={botStyleBgColor}
                    botStyleTextColor={botStyleTextColor}
                    humanStyleBgColor={humanStyleBgColor}
                    humanStyleTextColor={humanStyleTextColor}
                  />
                </div>
              </div>
            </section>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <div className="overflow-hidden rounded-lg bg-white border">
                <AppearancePreview
                  form={form}
                  botStyleBg={botStyleBgColor}
                  botStyleTextColor={botStyleTextColor}
                  humanStyleBgColor={humanStyleBgColor}
                  humanStyleTextColor={humanStyleTextColor}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};