import { Form, Input, Modal, Select } from "antd";
import React from "react";

const SmsModal = ({
  selectedTemplate,
  showSmsModal,
  setSmsModal,
  sendSmsToParent,
  classes,
}) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values, "values");
    const smsTemplateVariablesData = values;
    // sendSmsToParent(smsTemplateVariablesData, selectedTemplate.templateId);
  };
  console.log(showSmsModal, "showSmsModal");
  return (
    <Modal
      title={`${selectedTemplate?.title || ""} ( ${
        selectedTemplate?.templateId || ""
      } )`}
      width={700}
      centered
      open={showSmsModal}
      onOk={form.submit}
      onCancel={() => setSmsModal(false)}
    >
      <Form
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        autoComplete="off"
        wrapperCol={{ span: 14 }}
      >
        {Object.values(selectedTemplate.variables).map((item) => {
          console.log(item);
          if (item.type === "text") {
            return (
              <Form.Item name={item.value}>
                <Input
                  placeholder={`Enter ${item.value}`}
                  rules={[
                    {
                      required: true,
                      message: `Please enter ${item.value}!`,
                    },
                  ]}
                />
              </Form.Item>
            );
          }
          return null;
        })}
        <h3>Select Class</h3>
        <Form.Item label="Village" name="village">
          <Select
            style={{
              width: 120,
            }}
            // onChange={handleChange}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "disabled",
                disabled: true,
                label: "Disabled",
              },
              {
                value: "Yiminghe",
                label: "yiminghe",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SmsModal;
