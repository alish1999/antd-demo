import React from "react";
import { Form, Input } from "antd";

const Step1 = ({ data, onUpdate, form }) => {

  const onValuesChange = () => {
    onUpdate(form.getFieldsValue());
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={data}
      onValuesChange={onValuesChange}
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
