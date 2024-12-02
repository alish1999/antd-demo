import React, { useState } from "react";
import {
  Card,
  Typography,
  Divider,
  Descriptions,
  Input,
  Select,
  Button,
  message,
} from "antd";

const { Title, Text } = Typography;

const Summary = ({ data, onUpdate }) => {
  const [editingKey, setEditingKey] = useState(null); // Track which field is being edited
  const [formData, setFormData] = useState(data); // Maintain a local copy of the data
  const { personalInfo, location, paymentInfo } = formData;

  // Helper function to update data
  const updateField = (key, section, value) => {
    // const updatedData = {
    //   ...formData,
    //   [section]: { ...formData[section], [key]: value },
    // };
    const updatedData = { ...formData };
    updatedData[section][key] = value;
    setFormData(updatedData);
    onUpdate(updatedData); // Update the parent component/state
    setEditingKey(null); // Exit editing mode
  };

  // Helper to toggle editing mode
  const isEditing = (key) => editingKey === key;

  // Editable component generator
  const EditableField = ({ value, section, fieldKey, options }) => {
    // If not editing, display the value
    if (!isEditing(fieldKey)) {
      return (
        <span onClick={() => setEditingKey(fieldKey)}>
          {value || "Not Provided"}
        </span>
      );
    }
  // If editing, display an input field
    return (
      <Input
        defaultValue={value}
        onBlur={(e) => updateField(fieldKey, section, e.target.value)}
        onPressEnter={(e) => updateField(fieldKey, section, e.target.value)}
      />
    );
  };

  return (
    <Card style={{ margin: "20px auto", maxWidth: 600 }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
        Summary
      </Title>

      <Divider orientation="left">Personal Information</Divider>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="First Name">
          <EditableField
            value={personalInfo.firstName}
            section="personalInfo"
            fieldKey="firstName"
          />
        </Descriptions.Item>
        <Descriptions.Item label="Last Name">
          <EditableField
            value={personalInfo.lastName}
            section="personalInfo"
            fieldKey="lastName"
          />
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          <EditableField
            value={personalInfo.email}
            section="personalInfo"
            fieldKey="email"
          />
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          <EditableField
            value={personalInfo.phone}
            section="personalInfo"
            fieldKey="phone"
          />
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Location</Divider>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Country">
          <EditableField
            value={location.country}
            section="location"
            fieldKey="country"
          />
        </Descriptions.Item>
        <Descriptions.Item label="City">
          <EditableField
            value={location.city}
            section="location"
            fieldKey="city"
          />
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Payment Information</Divider>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Card Number">
          <EditableField
            value={paymentInfo?.cardNumber}
            section="paymentInfo"
            fieldKey="cardNumber"
          />
        </Descriptions.Item>
        <Descriptions.Item label="Expiry Date">
          <EditableField
            value={paymentInfo?.expiryDate}
            section="paymentInfo"
            fieldKey="expiryDate"
          />
        </Descriptions.Item>
        <Descriptions.Item label="CVV">
          {" "}
          <EditableField
            value={paymentInfo?.cvv}
            section="paymentInfo"
            fieldKey="cvv"
          />
        </Descriptions.Item>
      </Descriptions>

      <Divider />
      {/* <Button type="primary" block onClick={() => {
        console.log(formData);
        message.success("Form submitted successfully!");
        }
        }>
        Submit
      </Button> */}
      <Text
        type="secondary"
        style={{ textAlign: "center", display: "block", marginTop: 10 }}
      >
        Please verify all your information before submitting.
      </Text>
    </Card>
  );
};

export default Summary;
