import React from "react";
import { Form, Input } from "antd";

const Step1 = ({ formData, onUpdate }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onUpdate(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={formData}
      onFinish={onFinish}
      onValuesChange={() => form.submit()}
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "First Name is required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Last Name is required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Email is required" },
          { type: "email", message: "Enter a valid email" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Phone Number" name="phone">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default Step1;
