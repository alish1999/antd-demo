import React from "react";
import { Card, Typography, Divider, Descriptions } from "antd";

const { Title, Text } = Typography;

const Summary = ({ data }) => {
  const { personalInfo, location, paymentInfo } = data;

  // Helper to check if fields are empty or invalid
  const getFieldValue = (value) => (value ? value : "Not Provided");

  return (
    <Card style={{ margin: "20px auto", maxWidth: 600 }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
        Summary
      </Title>

      <Divider orientation="left">Personal Information</Divider>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="First Name">
          {getFieldValue(personalInfo.firstName)}
        </Descriptions.Item>
        <Descriptions.Item label="Last Name">
          {getFieldValue(personalInfo.lastName)}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {getFieldValue(personalInfo.email)}
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          {getFieldValue(personalInfo.phone)}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Location</Divider>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Country">
          {getFieldValue(location.country)}
        </Descriptions.Item>
        <Descriptions.Item label="City">
          {getFieldValue(location.city)}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Payment Information</Divider>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Card Number">
          {getFieldValue(paymentInfo?.cardNumber?.replace(/.(?=.{4})/g, "*"))}
        </Descriptions.Item>
        <Descriptions.Item label="Expiry Date">
          {getFieldValue(paymentInfo?.expiryDate)}
        </Descriptions.Item>
        <Descriptions.Item label="CVV">***</Descriptions.Item>
      </Descriptions>

      <Divider />
      <Text type="secondary" style={{ textAlign: "center", display: "block" }}>
        Please verify all your information before submitting.
      </Text>
    </Card>
  );
};

export default Summary;
