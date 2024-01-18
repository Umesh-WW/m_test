import React, { useEffect, useState } from "react";
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
  Button,
  FormHelperText,
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import * as yup from "yup";
import "./muli-step-form.css";
import axios from "axios";
import HorizontalLinearAlternativeLabelStepper from "./StepperComponent";

//------------------
interface CountryOption {
  country: string;
  id: string;
}

interface AdressFormFields {
  address?: yup.Maybe<string>;
  state?: yup.Maybe<string>;
  city?: yup.Maybe<string>;
  country?: string | undefined;
  pincode?: string | null;
}

///
const schema = yup.object().shape({
  address: yup.string().notRequired(),
  state: yup.string().notRequired(),
  city: yup.string().notRequired(),
  country: yup.string().optional(),
  pincode: yup
    .string()
    .transform((value) => {
      return value?.length == 0 ? null : value;
    })
    .nullable()
    .matches(/^\d+$/, "Invalid Pincode"),
});

const Step2Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<AdressFormFields> = (data) => {
    dispatch(setFormData({ data: data, page: 2 }));
  };

  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoadingCountries(true);

        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(
          response.data.map(
            (country: { name: { common: string }; cca3: string }) => ({
              country: country.name.common,
              id: country.cca3,
            })
          )
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <Paper className="main-page first-form">
      <HorizontalLinearAlternativeLabelStepper />
      <Box component={"h2"}> Address Detail</Box>
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
        <FormControl fullWidth error={!!errors.address?.message}>
          <InputLabel
            variant="standard"
            disableAnimation
            shrink
            size="normal"
            htmlFor="username"
          >
            Address
          </InputLabel>
          <Input {...register("address", { required: true })} />
          <FormHelperText
            margin={"dense"}
            variant="standard"
            error
            id="address"
          >
            {errors.address?.message}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth error={!!errors.state?.message}>
          <InputLabel
            variant="standard"
            disableAnimation
            shrink
            htmlFor="state"
          >
            State
          </InputLabel>
          <Input id="state" {...register("state")} />
          <FormHelperText margin={"dense"} variant="standard" error id="state">
            {errors.state?.message}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth error={!!errors.city?.message}>
          <InputLabel variant="standard" disableAnimation shrink htmlFor="city">
            City
          </InputLabel>
          <Input id="city" {...register("city")} />
          <FormHelperText margin={"dense"} variant="standard" error id="city">
            {errors.city?.message}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth error={!!errors.pincode?.message}>
          <InputLabel
            variant="standard"
            disableAnimation
            shrink
            htmlFor="pincode"
          >
            Pincode
          </InputLabel>
          <Input id="pincode" {...register("pincode")} />
          <FormHelperText
            margin={"dense"}
            variant="standard"
            error
            id="pincode"
          >
            {errors.pincode?.message}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.country}>
          <Autocomplete
            id="country"
            options={countries}
            clearOnBlur
            getOptionLabel={(option) => option.country}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Country"
                {...register("country")}
              />
            )}
            onChange={(
              _e: React.SyntheticEvent,
              value: CountryOption | null
            ) => {
              setValue("country", value?.country);
            }}
            loading={loadingCountries}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
          />

          <FormHelperText>{errors.country?.message}</FormHelperText>

          {loadingCountries && <CircularProgress size={20} />}
        </FormControl>
        <Button fullWidth variant="outlined" type="submit">
          Complete
        </Button>
      </Box>
    </Paper>
  );
};

export default Step2Form;
