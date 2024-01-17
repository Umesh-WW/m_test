// StartComponent.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { setStep } from "../Store/formSlice";

import { Paper, Button } from "@mui/material";
import "./muli-step-form.css";

///

const StartComponent: React.FC = () => {
  const dispatch = useDispatch();

  const onStart = () => {
    dispatch(setStep(1));
  };
  return (
    <Paper className="main-page start-form">
      <Button onClick={onStart}>Start</Button>
    </Paper>
  );
};

export default StartComponent;
