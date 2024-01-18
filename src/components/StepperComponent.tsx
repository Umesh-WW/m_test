import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepIcon, { StepIconProps } from "@mui/material/StepIcon";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { JSX } from "react/jsx-runtime";
import { LinearProgress } from "@mui/material";

const steps = [
  { label: "Personal Details", icon: "👤" },
  { label: "Address Detail", icon: "🏠" },
];
//   return (
//     <Box sx={{ display: "flex", alignItems: "start", justifyContent: "start" }}>
//       <Box sx={{ flexGrow: 1, mr: 2 }}>
//         <LinearProgress
//           color="primary"
//           variant="determinate"
//           value={50}
//           sx={{
//             position: "absolute",
//             top: "13px",
//             left: "-50%",
//             width: "100%",
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };
const CustomStepConnector = () => {
  const step = useSelector((state: RootState) => state.form.step);
console.log('step', step)
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ml: "-50%",
        mt: "10px",
        zIndex: -10,
        width: "calc(100% - 13px)",
        position: "absolute",
      }}
    >
      <Box sx={{ flexGrow: 1, mr: 1 }}>
        <LinearProgress color="primary" variant="determinate" value={(step)*100/2} />
      </Box>
    </Box>
  );
};

export default function HorizontalLinearAlternativeLabelStepper() {
  const step = useSelector((state: RootState) => state.form.step);

  return (
    <Box sx={{ width: "100%", padding: "24px" }}>
      <Stepper
        activeStep={step - 1}
        alternativeLabel
        connector={<CustomStepConnector />}
      >
        {steps.map((step, index) => (
          <Step key={index} sx={{ zIndex: 11 }}>
            <StepLabel
              sx={{ zIndex: 11 }}
              StepIconComponent={StepIconWithCustomIcon}
              icon={step.icon}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

const StepIconWithCustomIcon = (
  props: JSX.IntrinsicAttributes & StepIconProps
) => {
  const { active, completed } = props;

  return (
    <StepIcon {...props}>{active ? "🔵" : completed ? "✅" : "❌"}</StepIcon>
  );
};
