import React, { useEffect, useState } from "react";
import { Form, Select, Spin } from "antd";
import { fetchCountries, fetchCities } from "../utils/api";

const Step2 = ({ formData, onUpdate }) => {
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCountryData = async () => {
        const countryResult = await fetchCountries();
        setCountries(countryResult);
        };
    getCountryData();
  }, []);

  const onCountryChange = (country) => {
    console.log(country);
    setLoading(true);
    fetchCities(country)
      .then(setCities)
      .finally(() => setLoading(false));
  };

    const onValuesChange = () => {
        onUpdate(form.getFieldsValue());
    };
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={formData}
      onValuesChange={onValuesChange}
    >
      <Form.Item
        label="Country"
        name="country"
        rules={[{ required: true, message: "Country is required" }]}
      >
        <Select onChange={onCountryChange}>
          {countries.map((country) => (
            <Select.Option key={country.code} value={country.code}>
              {country.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        rules={[{ required: true, message: "City is required" }]}
      >
        <Select loading={loading}>
          {cities.map((city) => (
            <Select.Option key={city.name} value={city.name}>
              {city.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default Step2;
