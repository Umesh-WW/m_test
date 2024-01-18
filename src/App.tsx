import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./Store/store";
import Step1Form from "./components/Step1Form";
import Step2Form from "./components/Step2Form";
import { Container } from "@mui/material";
import StartComponent from "./components/StartComponet";
import TableComponent from "./components/TableComponent";

const MultiStepForm: React.FC = () => {
  const step = useSelector((state: RootState) => state.form.step);
  return (
    <Container maxWidth="xl" sx={{ paddingTop: "24px", paddingBottom: "24px" }}>
      {step === 0 && <StartComponent />}
      {step === 1 && <Step1Form />}
      {step === 2 && <Step2Form />}
      <TableComponent />
    </Container>
  );
};

export default MultiStepForm;
