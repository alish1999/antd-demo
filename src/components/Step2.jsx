import React, { useEffect, useState } from "react";
import { Form, Select, Spin } from "antd";
import { fetchCountries, fetchCities } from "../utils/api";

const Step2 = ({ data, onUpdate,form }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const onCountryChange = async (country) => {
    console.log(country);
    setLoading(true);
    const cities = await fetchCities(country);
    if(cities){
      setCities(cities);
    }
    setLoading(false);
  };
  useEffect(() => {
    const getCountryData = async () => {
        const countryResult = await fetchCountries();
        setCountries(countryResult);
        };

    if(form.getFieldValue("country") !== undefined){
        onCountryChange(form.getFieldValue("country"));
    }  
    getCountryData();
  }, []);



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
        label="Country"
        name="country"
        rules={[{ required: true, message: "Country is required" }]}
      >
        <Select
          onChange={(data)=>{
            onCountryChange(data);
            form.setFieldsValue({ city: undefined });
          }}
          showSearch
          filterOption={(input, option) =>
            (option?.key || "").toLowerCase().includes(input.toLowerCase())
          }
        >
          {countries.map((country) => (
            <Select.Option key={country.name} value={country.code}>
              {country.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        showSearch
        rules={[{ required: true, message: "City is required" }]}
      >
        <Select
          loading={loading}
          showSearch
          disabled ={cities.length === 0 && form.getFieldValue("country") === undefined}
          filterOption={(input, option) =>
            (option?.key || "").toLowerCase().includes(input.toLowerCase())
          }
        >
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
