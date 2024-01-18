import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setFormData } from "../Store/formSlice";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Paper,
  Box,
  FormControl,
  InputLabel,
  Input,
  FormControlLabel,
  Button,
  FormHelperText,
  Radio,
  FormLabel,
  RadioGroup,
  Select,
  MenuItem,
} from "@mui/material";
import * as yup from "yup";
import "./muli-step-form.css";
import HorizontalLinearAlternativeLabelStepper from "./StepperComponent";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive integer"),
  sex: yup
    .string()
    .required("Gender is required")
    .oneOf(["Male", "Female"], "Invalid value for Gender"),
  mobile: yup
    .string()
    .transform((value) => {
      return isNaN(value) || value?.length == 0 ? null : value;
    })
    .matches(/^(\+91|91)?[6789]\d{9}$/, "Invalid Indian Mobile Number")
    .nullable(),
  govtIdType: yup
    .string()
    .oneOf(["Aadhar", "PAN", ""], "Invalid value for Govt Issued ID Type")
    .optional(),
  govtId: yup.string().when("govtIdType", ([govtIdType], sch) => {
    if (govtIdType?.length == 0) {
      return sch.notRequired();
    }
    return govtIdType === "Aadhar"
      ? sch.matches(/^[2-9]\d{11}$/, "Invalid Aadhar Number")
      : sch.matches(/^[A-Za-z0-9]{10}$/, "Invalid PAN Number");
  }),
});

interface PersonalDetailsFormField {
  mobile?: string | null;
  govtIdType?: "" | "Aadhar" | "PAN";
  govtId?: string | undefined;
  name: string;
  age: number;
  sex: string;
}

const Step1Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<PersonalDetailsFormField> = (data) => {
    console.log("data", data);
    dispatch(setFormData({ data: data, page: 1 }));
  };
  return (
    <Paper className="main-page first-form">
      <HorizontalLinearAlternativeLabelStepper />
      <Box component={"h2"}> Personal Details </Box>
      <Box
        component={"form"}
        className="form-login"
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        sx={{
          paddingTop: "2%",
          paddingLeft: "10%",
          paddingRight: "10%",
          gap: "40px",
          maxWidth: "700px",
          width: "100%",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl fullWidth error={!!errors.name?.message}>
          <InputLabel
            variant="standard"
            disableAnimation
            shrink
            size="normal"
            htmlFor="username"
          >
            Name
          </InputLabel>
          <Input {...register("name", { required: true })} />
          <FormHelperText margin={"dense"} variant="standard" error id="name">
            {errors.name?.message}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth error={!!errors.age?.message}>
          <InputLabel variant="standard" disableAnimation shrink htmlFor="age">
            Age
          </InputLabel>
          <Input id="age" {...register("age", { required: true })} />
          <FormHelperText margin={"dense"} variant="standard" error id="age">
            {errors.age?.message}
          </FormHelperText>
        </FormControl>

        <FormControl error={!!errors.sex?.message}>
          <FormLabel id="sex">Gender</FormLabel>
          <RadioGroup row id="sex">
            <FormControlLabel
              value="Female"
              control={<Radio {...register("sex")} />}
              label="Female"
            />
            <FormControlLabel
              value="Male"
              control={<Radio {...register("sex")} />}
              label="Male"
            />
          </RadioGroup>
          <FormHelperText margin={"dense"} variant="standard" error id="sex">
            {errors.sex?.message}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth error={!!errors.mobile?.message}>
          <InputLabel
            variant="standard"
            disableAnimation
            shrink
            htmlFor="mobile"
          >
            Mobile
          </InputLabel>
          <Input id="mobile" {...register("mobile")} />
          <FormHelperText margin={"dense"} variant="standard" error id="mobile">
            {errors.mobile?.message}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth error={!!errors.govtIdType?.message}>
          <InputLabel
            variant="standard"
            disableAnimation
            shrink
            id="govtIdType"
          >
            Government Id Type
          </InputLabel>
          <Select
            labelId="govtIdType"
            id="govtIdType"
            variant="standard"
            {...register("govtIdType")}
          >
            <MenuItem value={"Aadhar"}>Aadhar</MenuItem>
            <MenuItem value={"PAN"}>PAN</MenuItem>
          </Select>
          <FormHelperText
            margin={"dense"}
            variant="standard"
            error
            id="govtIdType"
          >
            {errors.govtIdType?.message}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.govtId?.message}>
          <InputLabel
            variant="standard"
            disableAnimation
            shrink
            htmlFor="govtId"
          >
            Government Id
          </InputLabel>
          <Input id="govtId" {...register("govtId", { required: true })} />
          <FormHelperText margin={"dense"} variant="standard" error id="govtId">
            {errors.govtId?.message}
          </FormHelperText>
        </FormControl>

        <Button fullWidth variant="outlined" type="submit">
          Next
        </Button>
      </Box>
    </Paper>
  );
};

export default Step1Form;
