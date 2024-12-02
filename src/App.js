import React, { useState } from "react";
import { Steps, Button, message, Form } from "antd";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Summary from "./components/Summary";

const { Step } = Steps;

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [personalInfo, setPersonalInfo] = useState({});
  const [location, setLocation] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();

  const steps = [
    {
      title: "Personal Info",
      content: (
        <Step1
          data={personalInfo}
          onUpdate={setPersonalInfo}
          form={form1} // Pass the form instance
        />
      ),
      form: form1,
    },
    {
      title: "Location",
      content: <Step2 data={location} onUpdate={setLocation} form={form2} />,
      form: form2,
    },
    {
      title: "Payment Info",
      content: <Step3 data={paymentInfo} onUpdate={setPaymentInfo} form={form3} />,
      form: form3,
    },
    {
      title: "Summary",
      content: <Summary data={{ personalInfo, location, paymentInfo }} />,
    },
  ];

  const next = () => {
    if (currentStep < steps.length - 1) {
      steps[currentStep].form.validateFields().then(() => {
        setCurrentStep(currentStep + 1);
      }).catch(() => {
        message.error("Please complete the current step first");
      });
    } else {
      message.success("Form submitted successfully!");
      console.log({ personalInfo, location, paymentInfo });
    }
  };

  const prev = () => setCurrentStep(currentStep - 1);

  return (
    <div style={{ width: "60%", margin: "0 auto", marginTop: 50 }}>
      <Steps current={currentStep} style={{ marginBottom: 40 }}>
        {steps.map((item, index) => (
          <Step key={index} title={item.title} />
        ))}
      </Steps>
      <div>{steps[currentStep].content}</div>
      <div
        style={{
          marginTop: 30,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {currentStep > 0 && (
          <Button onClick={prev} style={{ marginRight: 8 }}>
            Previous
          </Button>
        )}
        <Button
          type="primary"
          onClick={next}
          disabled={currentStep === steps.length - 1 && !paymentInfo}
        >
          {currentStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default App;
