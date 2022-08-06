import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
}

const InputField = (props: InputFieldProps) => {
  const [field, { error }] = useField(props);

  return (
    <Box mt={4}>
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
        <Input
          id={field.name}
          placeholder={props.placeholder}
          {...field}
          type={props.type}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};

export default InputField;
