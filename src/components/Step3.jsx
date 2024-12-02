import React from "react";
import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const Step3 = ({ data, onUpdate, form }) => {
  const onValuesChange = () => {
    onUpdate({...form.getFieldsValue(),expiryDate:form?.getFieldValue('expiryDate')?.format('MM/YYYY')});
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={data}
      onValuesChange={onValuesChange}
    >
      {/* Credit Card Number */}
      <Form.Item
        label="Credit Card Number"
        name="cardNumber"
        rules={[
          { required: true, message: "Card number is required" },
          {
            pattern: /^\d{16}$/,
            message: "Card number must be 16 digits",
          },
        ]}
      >
        <Input maxLength={16} />
      </Form.Item>

      {/* Expiry Date */}
      <Form.Item
        label="Expiry Date"
        name="expiryDate"
        rules={[
          { required: true, message: "Expiry Date is required" },
          {
            validator: (_, value) =>
              value && value.isAfter(dayjs())
                ? Promise.resolve()
                : Promise.reject("Expiry date must be a future date"),
          },
        ]}
      >
        <DatePicker
          format="MM/YYYY"
          picker="month"
          disabledDate={(current) =>
            current && current.isBefore(dayjs(), "month")
          }
        //   onChange={(value) => form.setFieldsValue({ expiryDate: value })}
        />
      </Form.Item>

      {/* CVV */}
      <Form.Item
        label="CVV"
        name="cvv"
        rules={[
          { required: true, message: "CVV is required" },
          {
            pattern: /^\d{3}$/,
            message: "CVV must be 3 digits",
          },
        ]}
      >
        <Input maxLength={3} />
      </Form.Item>
    </Form>
  );
};

export default Step3;
