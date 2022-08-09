import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  textarea?: boolean;
}

const InputField = (props: InputFieldProps) => {
  const [field, { error }] = useField(props);

  return (
    <Box mt={4}>
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
        {props.textarea ? (
          <Textarea
            id={field.name}
            rows={10}
            placeholder={props.placeholder}
            size="lg"
          />
        ) : (
          <Input
            id={field.name}
            placeholder={props.placeholder}
            {...field}
            type={props.type}
          />
        )}

        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};

export default InputField;
