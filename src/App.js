import React, { useState } from "react";
import { Steps, Button, message } from "antd";
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

  const steps = [
    {
      title: "Personal Info",
      content: <Step1 data={personalInfo} onUpdate={setPersonalInfo} />,
    },
    {
      title: "Location",
      content: <Step2 data={location} onUpdate={setLocation} />,
    },
    {
      title: "Payment Info",
      content: <Step3 data={paymentInfo} onUpdate={setPaymentInfo} />,
    },
    {
      title: "Summary",
      content: <Summary data={{ personalInfo, location, paymentInfo }} />,
    },
  ];

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
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
