import React from "react";
import { Form, Input } from "antd";

const Step3 = ({ data, onUpdate, form }) => {
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
        label="Credit Card Number"
        name="cardNumber"
        rules={[
          { required: true, message: "Card number is required" },
        //   { len: 16, message: "Card number must be 16 digits" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Expiry Date"
        name="expiryDate"
        rules={[{ required: true, message: "Expiry Date is required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="CVV"
        name="cvv"
        rules={[
          { required: true, message: "CVV is required" },
          { len: 3, message: "CVV must be 3 digits" },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default Step3;
